import React, { useState } from 'react';
import { InstagramContentOption } from '../types';
import { Copy, Check, TrendingUp, Hash } from 'lucide-react';

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
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all hover:shadow-2xl duration-500">
      <div className="bg-gray-900 p-4 flex justify-between items-center">
        <h3 className="font-bold text-white flex items-center gap-2">
          <span className="bg-red-600 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">Opção {index + 1}</span>
        </h3>
        <div className="flex items-center gap-1 text-xs font-medium text-green-400">
          <TrendingUp size={14} />
          <span>Alta Retenção</span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-0">
        
        {/* Left Side: The "Screen" (Hook) */}
        <div className="bg-gray-100 p-6 flex flex-col justify-center relative border-b md:border-b-0 md:border-r border-gray-200">
          <div className="flex justify-between items-end mb-3">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500">Texto na Tela (Título)</label>
            <button 
              onClick={() => handleCopy(option.hook, 'hook')}
              className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${copiedHook ? 'bg-green-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-200 border border-gray-300'}`}
            >
              {copiedHook ? <Check size={12} /> : <Copy size={12} />}
            </button>
          </div>
          
          {/* Mobile Screen Simulator */}
          <div className="aspect-[9/16] md:aspect-auto md:h-64 bg-black rounded-2xl relative overflow-hidden shadow-2xl flex items-center justify-center p-6 text-center group cursor-default">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10"></div>
            <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" alt="bg" />
            
            {/* The Hook Text */}
            <h4 className="relative z-20 text-white font-black text-2xl md:text-3xl leading-tight drop-shadow-lg select-none">
              {option.hook}
            </h4>
          </div>
          
          <p className="mt-3 text-xs text-gray-500 italic text-center border-t border-gray-200 pt-2">
            "{option.explanation}"
          </p>
        </div>

        {/* Right Side: Caption & Value */}
        <div className="p-6 flex flex-col h-full bg-white">
          <div className="flex justify-between items-end mb-2">
            <label className="text-xs font-black uppercase tracking-wider text-gray-500">Legenda de Valor</label>
            <button 
               onClick={() => handleCopy(fullCaption, 'caption')}
               className={`text-xs flex items-center gap-1 px-2 py-1 rounded transition-colors ${copiedCaption ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {copiedCaption ? <><Check size={12} /> Copiado</> : <><Copy size={12} /> Copiar</>}
            </button>
          </div>
          
          <div className="flex-grow bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-line border border-gray-100 overflow-y-auto max-h-[220px] shadow-inner">
            {option.caption}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <label className="text-xs font-bold uppercase text-blue-600 mb-2 flex items-center gap-1">
              <Hash size={12} /> Hashtags Estratégicas
            </label>
            <div className="flex flex-wrap gap-1">
              {option.hashtags.map((tag, i) => (
                <span key={i} className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
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