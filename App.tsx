import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { supabase } from './services/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { Tone, InstagramContentOption } from './types';
import { generateInstagramContent } from './services/geminiService';
import Header from './components/Header';
import ResultCard from './components/ResultCard';
import Auth from './components/Auth';
import TutorialModal from './components/TutorialModal';
import { Loader2, Upload, X, Send, Target, Lightbulb, Mic2, Download, PenTool, AlertCircle, Video, LogOut, User, Hash, Sparkles, Trash2, Moon, Sun, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Tutorial State
  const [showTutorial, setShowTutorial] = useState(false);

  // Theme Management - Robust Persistence Logic
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      // 1. Tenta recuperar do localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      // 2. Se não houver salvo, verifica preferência do sistema
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    // 3. Padrão (Dark)
    return 'dark';
  });

  // Apply theme to document and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Initialize state from localStorage if available
  const [niche, setNiche] = useState(() => localStorage.getItem('viral_niche') || '');
  const [videoIdea, setVideoIdea] = useState('');
  const [keywords, setKeywords] = useState('');
  const [customHook, setCustomHook] = useState('');
  
  const [tone, setTone] = useState<Tone>(() => {
    return (localStorage.getItem('viral_tone') as Tone) || Tone.CASUAL;
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [results, setResults] = useState<InstagramContentOption[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Session Management
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Check for Tutorial on mount (only if logged in)
  useEffect(() => {
    if (session) {
      const tutorialSeen = localStorage.getItem('viral_tutorial_seen');
      if (!tutorialSeen) {
        setShowTutorial(true);
      }
    }
  }, [session]);

  const closeTutorial = useCallback(() => {
    localStorage.setItem('viral_tutorial_seen', 'true');
    setShowTutorial(false);
  }, []);

  const openTutorial = useCallback(() => {
    setShowTutorial(true);
  }, []);

  // Persist preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('viral_niche', niche);
  }, [niche]);

  useEffect(() => {
    localStorage.setItem('viral_tone', tone);
  }, [tone]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  }, []);

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    setImagePreview(null);
  }, []);

  const clearForm = useCallback(() => {
    setVideoIdea('');
    setKeywords('');
    setCustomHook('');
    setResults(null);
    setSelectedFile(null);
    setImagePreview(null);
    setError(null);
  }, []);

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut();
    setResults(null);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação Robusta
    const cleanNiche = niche.trim();
    const cleanIdea = videoIdea.trim();

    if (!cleanNiche || cleanNiche.length < 3) {
      setError("O Nicho precisa ter pelo menos 3 caracteres (ex: 'Marketing', 'Saúde').");
      return;
    }

    if (!cleanIdea || cleanIdea.length < 5) {
      setError("Por favor, descreva a ideia do vídeo com um pouco mais de detalhes.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    // Scroll to results area on mobile/desktop
    setTimeout(() => {
       window.scrollTo({ top: 400, behavior: 'smooth' });
    }, 100);

    try {
      const generatedOptions = await generateInstagramContent(cleanNiche, cleanIdea, tone, selectedFile, customHook, keywords);
      setResults(generatedOptions);
    } catch (err: any) {
      setError("Ocorreu um erro ao gerar o conteúdo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [niche, videoIdea, tone, selectedFile, customHook, keywords]);

  const handleExport = useCallback(() => {
    if (!results) return;

    const date = new Date().toLocaleDateString('pt-BR');
    let content = `🚀 ESTRATÉGIA VIRAL - ${niche.toUpperCase()}\n`;
    content += `📅 Data: ${date}\n`;
    content += `💡 Ideia: ${videoIdea}\n`;
    if (keywords) content += `🔑 Palavras-chave: ${keywords}\n`;
    content += `🎙️ Tom: ${tone}\n\n`;
    content += `===================================\n\n`;

    results.forEach((option, index) => {
      content += `OPTION ${index + 1}\n`;
      content += `-----------------------------------\n`;
      content += `📺 TEXTO NA TELA (HOOK):\n${option.hook}\n\n`;
      content += `📝 LEGENDA (PROMPT):\n${option.caption}\n\n`;
      content += `🏷️ HASHTAGS:\n${option.hashtags.join(' ')}\n\n`;
      content += `🧠 ESTRATÉGIA:\n${option.explanation}\n\n`;
      content += `===================================\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Estrategia_Viral_${niche.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [results, niche, videoIdea, keywords, tone]);

  // Live Dynamic Title Preview Logic with enhanced typography
  // Optimized with useMemo to prevent recalculation on every render
  const dynamicTitle = useMemo(() => {
    if (!niche) return "Aguardando nicho...";
    const mainKeyword = keywords.split(',')[0].trim() || "Resultados";
    return `O segredo do ${niche} para ter ${mainKeyword}`;
  }, [niche, keywords]);

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <Loader2 className="w-10 h-10 animate-spin text-red-600" />
      </div>
    );
  }

  if (!session) {
    return <Auth toggleTheme={toggleTheme} theme={theme} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 text-gray-900 dark:text-gray-200 selection:bg-red-500 selection:text-white transition-colors duration-300">
      
      {showTutorial && <TutorialModal onClose={closeTutorial} />}

      {/* Top Bar with User Info */}
      <div className="bg-white/80 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-3 px-4 md:px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm dark:shadow-lg transition-colors duration-300">
        <div className="flex items-center gap-3 text-xs md:text-sm font-medium">
          <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gradient-to-tr dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
             <User size={16} className="text-gray-500 dark:text-gray-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 dark:text-gray-500">Logado como</span>
            <span className="text-gray-900 dark:text-white font-bold">{session.user.email?.split('@')[0]}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           {/* Help/Tutorial Button */}
           <button
            onClick={openTutorial}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Ver Tutorial"
          >
            <HelpCircle size={18} />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={theme === 'dark' ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 px-4 py-2 rounded-lg border border-red-200 dark:border-red-900/30"
          >
            <LogOut size={14} />
            Sair
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <Header />

        {/* Viral Checklist Banner */}
        <div className="bg-gradient-to-r from-gray-100 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 rounded-xl p-1 mb-10 shadow-lg dark:shadow-2xl border border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="bg-white/50 dark:bg-black/80 rounded-lg p-4 flex flex-wrap gap-6 items-center justify-center text-sm md:text-base backdrop-blur-sm">
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 dark:from-yellow-400 dark:to-orange-500 uppercase tracking-widest text-xs md:text-sm">⚡ Fórmula Viral:</span>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
              <span className="w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-500 flex items-center justify-center text-xs font-bold border border-pink-200 dark:border-pink-500/30">1</span> 
              Vídeo Autêntico
            </div>
            <span className="hidden md:inline text-gray-300 dark:text-gray-800">|</span>
            <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
              <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-500 flex items-center justify-center text-xs font-bold border border-red-200 dark:border-red-500/50 animate-pulse">2</span>
              Gancho Proibido (Aqui)
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-2xl p-6 md:p-8 sticky top-24 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Target className="text-red-600" strokeWidth={3} /> Dados do Reels
                </h2>
                <button onClick={clearForm} className="text-xs text-gray-400 hover:text-red-500 dark:hover:text-white flex items-center gap-1 transition-colors" title="Limpar formulário">
                   <Trash2 size={14} /> Limpar
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Niche Input */}
                <div className="group">
                  <label htmlFor="niche" className="block text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 transition-colors">
                    Seu Nicho
                  </label>
                  <div className="relative">
                    <Target size={18} className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-600 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 transition-colors"/>
                    <input
                      id="niche"
                      type="text"
                      minLength={3}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 outline-none transition-all font-medium placeholder-gray-400 dark:placeholder-gray-700 shadow-inner"
                      placeholder="Ex: Marketing Digital"
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                    />
                  </div>
                </div>

                {/* Description/Idea Input */}
                <div className="group">
                  <label htmlFor="videoIdea" className="block text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors">
                     Ideia Central
                  </label>
                  <div className="relative">
                    <Lightbulb size={18} className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-600 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-500 transition-colors"/>
                    <textarea
                      id="videoIdea"
                      rows={3}
                      minLength={5}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-100 dark:focus:ring-yellow-900 focus:border-yellow-500 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-700 shadow-inner leading-relaxed"
                      placeholder="Ex: Ensinar 3 formas de fazer renda extra com IA..."
                      value={videoIdea}
                      onChange={(e) => setVideoIdea(e.target.value)}
                    />
                  </div>
                </div>

                {/* Keywords Input */}
                <div className="group">
                  <label htmlFor="keywords" className="block text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-green-600 dark:group-focus-within:text-green-500 transition-colors">
                    Palavras-chave (Contexto)
                  </label>
                  <div className="relative">
                    <Hash size={18} className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-600 group-focus-within:text-green-600 dark:group-focus-within:text-green-500 transition-colors"/>
                    <input
                      id="keywords"
                      type="text"
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 focus:border-green-500 outline-none transition-all text-sm placeholder-gray-400 dark:placeholder-gray-700 shadow-inner"
                      placeholder="Ex: dinheiro, liberdade, online"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                    />
                  </div>
                </div>

                {/* DYNAMIC TITLE PREVIEW */}
                {(niche || keywords) && (
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-black rounded-xl p-4 border border-gray-200 dark:border-gray-700 animate-fade-in group hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-default">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                      <Sparkles size={48} className="text-gray-500 dark:text-white" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Simulação em Tempo Real</span>
                    </div>
                    <p className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 italic leading-tight">
                      "{dynamicTitle}"
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-800 my-4 pt-4">
                  <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => { /* Toggle advanced? */ }}>
                     <span className="text-xs font-bold text-gray-500 uppercase">Configurações Avançadas</span>
                  </div>

                  {/* Tone Selector */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
                      <Mic2 size={14} className="text-purple-600 dark:text-purple-500"/> Tom de Voz
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.values(Tone).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTone(t)}
                          className={`px-3 py-2 text-[10px] uppercase font-bold rounded-lg border transition-all ${
                            tone === t
                              ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white shadow-md'
                              : 'bg-gray-100 dark:bg-black text-gray-600 dark:text-gray-500 border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                   {/* Custom Hook */}
                   <div>
                    <input
                      id="customHook"
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-300 focus:border-indigo-500 outline-none transition-all text-xs placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder="Gancho Manual (Opcional)..."
                      value={customHook}
                      onChange={(e) => setCustomHook(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-xl hover:shadow-red-500/30 dark:hover:shadow-red-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      PROCESSANDO...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} className="group-hover:animate-pulse" />
                      GERAR VIRAL
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
             {error && (
              <div className="p-4 mb-6 rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-200 animate-in fade-in slide-in-from-top-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="shrink-0 mt-1 text-red-500" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg mb-1">Atenção Necessária</h4>
                    <p className="font-medium text-sm opacity-90">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {!results && !loading && !error && (
              <div className="flex-grow flex flex-col items-center justify-center h-full min-h-[500px] text-gray-500 dark:text-gray-600 bg-white dark:bg-gray-900/30 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-8 text-center backdrop-blur-sm shadow-sm dark:shadow-none transition-colors duration-300">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-6 animate-pulse transition-colors">
                  <Target className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Seu vídeo vai viralizar?</h3>
                <p className="max-w-md text-gray-500 dark:text-gray-500 text-lg">Preencha os dados ao lado para desbloquear a <span className="text-red-600 dark:text-red-500 font-bold">caixa preta</span> dos ganchos virais.</p>
              </div>
            )}
            
            {loading && !results && (
               <div className="flex-grow flex flex-col items-center justify-center h-full min-h-[500px]">
                 <div className="relative">
                   <div className="w-24 h-24 border-t-4 border-b-4 border-red-600 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-16 h-16 bg-red-600 rounded-full animate-ping opacity-20"></div>
                   </div>
                 </div>
                 <p className="text-gray-900 dark:text-white font-black text-2xl mt-8 tracking-wider animate-pulse">HACKEANDO ALGORITMO...</p>
                 <div className="flex flex-col items-center mt-4 text-gray-500 dark:text-gray-500 gap-1 text-sm font-mono">
                    <span>• Analisando Nicho: {niche}...</span>
                    <span>• Selecionando Palavras Proibidas...</span>
                    <span>• Otimizando Retenção...</span>
                 </div>
               </div>
            )}

            {results && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <div>
                     <h3 className="text-3xl font-black text-gray-900 dark:text-white italic tracking-tighter">RESULTADO <span className="text-red-600">DESBLOQUEADO</span></h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Estas são as 3 variações com maior chance de explodir seu perfil.</p>
                  </div>
                  <button 
                    onClick={handleExport}
                    className="bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-xl text-sm font-black flex items-center gap-2 transition-transform hover:scale-105 shadow-lg"
                  >
                    <Download size={18} />
                    BAIXAR ESTRATÉGIA
                  </button>
                </div>

                <div className="grid gap-10">
                  {results?.map((option, idx) => (
                    <ResultCard key={idx} option={option} index={idx} />
                  ))}
                </div>
                
                <div className="mt-12 text-center text-gray-400 dark:text-gray-600 text-xs">
                    <p>IA Treinada com base em 10.000+ vídeos virais do TikTok e Reels.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;