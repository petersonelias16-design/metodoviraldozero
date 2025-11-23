import React, { useState, useCallback, useEffect } from 'react';
import { supabase } from './services/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { Tone, InstagramContentOption } from './types';
import { generateInstagramContent } from './services/geminiService';
import Header from './components/Header';
import ResultCard from './components/ResultCard';
import Auth from './components/Auth';
import { Loader2, Upload, X, Send, Target, Lightbulb, Mic2, Download, PenTool, AlertCircle, Video, LogOut, User, Hash } from 'lucide-react';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

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

  // Persist preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem('viral_niche', niche);
  }, [niche]);

  useEffect(() => {
    localStorage.setItem('viral_tone', tone);
  }, [tone]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setResults(null);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!niche || !videoIdea) {
      setError("Por favor, defina seu Nicho e a Ideia do vídeo.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Agora chama o serviço local passando keywords
      const generatedOptions = await generateInstagramContent(niche, videoIdea, tone, selectedFile, customHook, keywords);
      setResults(generatedOptions);
    } catch (err: any) {
      setError("Ocorreu um erro ao gerar o conteúdo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, [niche, videoIdea, tone, selectedFile, customHook, keywords]);

  const handleExport = () => {
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
      content += `📝 LEGENDA:\n${option.caption}\n\n`;
      content += `🏷️ HASHTAGS:\n${option.hashtags.join(' ')}\n\n`;
      content += `🧠 POR QUE FUNCIONA:\n${option.explanation}\n\n`;
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
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Top Bar with User Info */}
      <div className="bg-white border-b border-gray-200 py-2 px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium">
          <User size={14} />
          <span className="hidden md:inline">Logado como:</span>
          <span className="text-gray-900">{session.user.email}</span>
        </div>
        <button 
          onClick={handleSignOut}
          className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
        >
          <LogOut size={14} />
          Sair
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
        <Header />

        {/* Viral Checklist Banner */}
        <div className="bg-black text-white rounded-xl p-4 mb-8 shadow-xl border border-gray-800 flex flex-wrap gap-4 items-center justify-center text-sm md:text-base">
          <span className="font-bold text-yellow-400 uppercase tracking-widest text-xs md:text-sm mr-2">Fórmula Viral:</span>
          <div className="flex items-center gap-2 text-gray-300">
            <Video size={18} className="text-pink-500" /> 1. Vídeo da Galeria
          </div>
          <span className="hidden md:inline text-gray-700">|</span>
          <div className="flex items-center gap-2 text-white font-bold">
            <Target size={18} className="text-red-500" /> 2. Gancho Proibido (Aqui)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border-t-4 border-red-500">
              <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Target className="text-red-500" /> Dados do Reels
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Niche Input */}
                <div>
                  <label htmlFor="niche" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Target size={16} className="text-blue-500"/> Seu Nicho
                  </label>
                  <input
                    id="niche"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-gray-800 font-medium placeholder-gray-400"
                    placeholder="Ex: Emagrecimento, Marketing Digital, Finanças..."
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>

                {/* Description/Idea Input */}
                <div>
                  <label htmlFor="videoIdea" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Lightbulb size={16} className="text-yellow-500"/> Ideia do Vídeo
                  </label>
                  <textarea
                    id="videoIdea"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none text-gray-800 bg-gray-50 focus:bg-white placeholder-gray-400"
                    placeholder="Ex: Vou mostrar como fazer um café gelado rápido. Quero focar na facilidade."
                    value={videoIdea}
                    onChange={(e) => setVideoIdea(e.target.value)}
                  />
                </div>

                {/* Keywords Input */}
                <div>
                  <label htmlFor="keywords" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Hash size={16} className="text-green-500"/> Palavras-chave (Opcional)
                  </label>
                  <input
                    id="keywords"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-gray-800 text-sm placeholder-gray-400"
                    placeholder="Ex: viral, dinheiro, dicas, tutorial"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-1 ml-1">Usado para hashtags e foco da legenda.</p>
                </div>

                {/* Custom Hook Input (Optional) */}
                <div>
                  <label htmlFor="customHook" className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <PenTool size={16} className="text-indigo-500"/> Gancho Personalizado (Opcional)
                  </label>
                  <input
                    id="customHook"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-800 text-sm placeholder-gray-400"
                    placeholder="Ex: 3 coisas que eu não faria se..."
                    value={customHook}
                    onChange={(e) => setCustomHook(e.target.value)}
                  />
                </div>

                 {/* Image Upload */}
                 <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Referência Visual (Opcional)
                  </label>
                  {!imagePreview ? (
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-red-300 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-2 pb-3">
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <p className="text-xs text-gray-500">Enviar print ou foto</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200 group">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
                      <button type="button" onClick={clearFile} className="absolute top-2 right-2 bg-white/90 p-1 rounded-full text-red-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Tone Selector */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                     <Mic2 size={16} className="text-purple-500"/> Tom de Voz
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(Tone).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone(t)}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                          tone === t
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-purple-700 text-white font-black uppercase tracking-wider py-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Construindo Viral...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Gerar Ganchos
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 xl:col-span-8">
             {error && (
              <div className="p-4 mb-6 rounded-r-lg border-l-4 shadow-sm bg-red-50 border-red-500 text-red-700">
                <div className="flex items-start gap-3">
                  <AlertCircle className="shrink-0 mt-1" />
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg mb-1">Ops! Algo deu errado</h4>
                    <p className="font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {!results && !loading && !error && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400 bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
                <Target className="w-20 h-20 mb-4 text-gray-200" />
                <h3 className="text-2xl font-bold text-gray-300 mb-2">Seu vídeo vai viralizar?</h3>
                <p className="max-w-md text-gray-400">Preencha o nicho e a ideia para desbloquear os ganchos secretos.</p>
              </div>
            )}
            
            {loading && !results && (
               <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                 <div className="w-20 h-20 border-8 border-gray-100 border-t-red-600 rounded-full animate-spin mb-6"></div>
                 <p className="text-gray-900 font-bold text-xl animate-pulse">Consultando a base de dados viral...</p>
                 <p className="text-gray-500 mt-2">Selecionando as melhores palavras proibidas.</p>
               </div>
            )}

            {results && (
              <div className="mb-6 flex justify-between items-end">
                <div>
                   <h3 className="text-2xl font-black text-gray-900">Opções Geradas</h3>
                   <p className="text-sm text-gray-500">Escolha a que melhor se adapta à sua gravação.</p>
                </div>
                <button 
                  onClick={handleExport}
                  className="bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-md"
                >
                  <Download size={16} />
                  Salvar Estratégia
                </button>
              </div>
            )}

            <div className="grid gap-8">
              {results?.map((option, idx) => (
                <ResultCard key={idx} option={option} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;