import React, { useState } from 'react';
import { InstagramContentOption } from '../types';
import { Copy, Check, TrendingUp, Hash, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface ResultCardProps {
  option: InstagramContentOption;
  index: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ option, index }) => {
  const [copiedHook, setCopiedHook] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const handleCopy = (text: string, type: 'hook' | 'caption') => {
    navigator.clipboard.writeText(text);
    if (type === 'hook') {
      setCopiedHook(true);
      setTimeout(() => setCopiedHook(false), 2000);
    } else {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    }
  };

  const fullCaption = `${option.caption}\n\n${option.hashtags.join(' ')}`;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700 duration-500 group">
      
      {/* Header of the Card */}
      <div className="bg-gray-50 dark:bg-black/50 p-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-800 backdrop-blur-sm transition-colors">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="bg-gradient-to-r from-red-600 to-purple-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">Opção {index + 1}</span>
        </h3>
        <div className="flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded border border-green-200 dark:border-green-900/50">
          <TrendingUp size={14} />
          <span>Alta Viralização</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-0">
        
        {/* Left Side: The "Screen" (Hook) - REALISTIC INSTAGRAM PREVIEW */}
        <div className="bg-gray-100 dark:bg-gray-800/30 p-6 flex flex-col justify-center relative border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 transition-colors">
          <div className="flex justify-between items-end mb-3">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500">Preview do Vídeo</label>
            <button 
              onClick={() => handleCopy(option.hook, 'hook')}
              className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-full transition-all font-bold ${copiedHook ? 'bg-green-500 text-white' : 'bg-white dark:bg-white text-black hover:bg-gray-200 shadow-sm border border-gray-200 dark:border-transparent'}`}
            >
              {copiedHook ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar Hook</>}
            </button>
          </div>
          
          {/* Mobile Screen Simulator */}
          <div className="aspect-[9/16] md:aspect-auto md:h-72 bg-black rounded-2xl relative overflow-hidden shadow-2xl flex items-center justify-center text-center cursor-default border border-gray-300 dark:border-gray-800">
            {/* Background Image Placeholder */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 animate-pulse-slow"></div>
            <img 
              src={`https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" 
              alt="Background" 
            />
            
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Instagram UI Overlay Elements */}
            <div className="absolute right-3 bottom-16 flex flex-col gap-4 text-white items-center opacity-90 pointer-events-none">
                <div className="flex flex-col items-center gap-1"><Heart size={20} fill="white" /><span className="text-[10px] font-bold">12.5K</span></div>
                <div className="flex flex-col items-center gap-1"><MessageCircle size={20} /><span className="text-[10px] font-bold">342</span></div>
                <div className="flex flex-col items-center gap-1"><Send size={20} /><span className="text-[10px] font-bold">Share</span></div>
                <div className="flex flex-col items-center gap-1"><Bookmark size={20} /><span className="text-[10px] font-bold">Save</span></div>
            </div>

            <div className="absolute bottom-4 left-3 right-12 text-left pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-400 to-red-600 border border-white"></div>
                    <span className="text-white text-xs font-bold shadow-black drop-shadow-md">seu_perfil</span>
                </div>
                <div className="h-2 w-3/4 bg-white/50 rounded-full mb-1"></div>
                <div className="h-2 w-1/2 bg-white/50 rounded-full"></div>
            </div>

            {/* The Viral Hook Text - CLICKABLE */}
            <div 
              onClick={() => handleCopy(option.hook, 'hook')}
              className="relative z-20 px-6 w-full cursor-pointer group/text transition-transform active:scale-95 hover:scale-[1.02]"
              title="Clique para copiar o título"
            >
              <h4 className="text-white font-black text-2xl md:text-3xl leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] select-none font-sans uppercase italic tracking-tighter group-hover/text:text-gray-100 transition-colors">
                {option.hook}
              </h4>
              <div className="opacity-0 group-hover/text:opacity-100 transition-opacity absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-black bg-white/90 px-3 py-1 rounded-full shadow-lg backdrop-blur-sm pointer-events-none whitespace-nowrap flex items-center gap-1">
                 {copiedHook ? <Check size={10} className="text-green-600"/> : <Copy size={10} />} 
                 {copiedHook ? "Copiado!" : "Clique para copiar"}
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-3 rounded-lg transition-colors">
             <p className="text-xs text-blue-700 dark:text-blue-200 italic text-center">
              💡 <strong>Psicologia:</strong> {option.explanation}
            </p>
          </div>
        </div>

        {/* Right Side: Caption & Value */}
        <div className="p-6 flex flex-col h-full bg-white dark:bg-gray-900 transition-colors">
          <div className="flex justify-between items-end mb-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-gray-500">Legenda de Valor</label>
            <button 
               onClick={() => handleCopy(fullCaption, 'caption')}
               className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-full transition-all font-bold ${copiedCaption ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
            >
              {copiedCaption ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar Prompt</>}
            </button>
          </div>
          
          <div className="flex-grow bg-gray-50 dark:bg-black rounded-xl p-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line border border-gray-200 dark:border-gray-800 overflow-y-auto max-h-[280px] shadow-inner font-mono leading-relaxed transition-colors">
            {option.caption}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <label className="text-xs font-bold uppercase text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1">
              <Hash size={12} /> Hashtags Geradas
            </label>
            <div className="flex flex-wrap gap-1.5">
              {option.hashtags.map((tag, i) => (
                <span key={i} className="text-[10px] font-bold text-blue-600 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-900/40 cursor-pointer transition-colors border border-blue-200 dark:border-blue-900/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;