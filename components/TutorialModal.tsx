import React, { useState } from 'react';
import { X, ArrowRight, Zap, Target, Mic2, Download, CheckCircle } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
}

const steps = [
  {
    icon: <Zap size={40} className="text-yellow-500" />,
    title: "Bem-vindo ao Método Viral",
    description: "Você acaba de acessar a ferramenta secreta dos maiores influenciadores. Vamos te ensinar a transformar qualquer ideia em um vídeo viral em 3 passos.",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: <Target size={40} className="text-red-500" />,
    title: "1. Defina o Alvo",
    description: "Preencha o seu **Nicho** (ex: Marketing) e a **Ideia Central** do vídeo. Quanto mais específico, mais poderosa será a inteligência artificial.",
    color: "from-red-500 to-pink-600"
  },
  {
    icon: <Mic2 size={40} className="text-purple-500" />,
    title: "2. Ajuste a Sintonia",
    description: "Use palavras-chave para dar contexto e escolha o **Tom de Voz** (Polêmico, Engraçado, Profissional) para alinhar o conteúdo com sua marca.",
    color: "from-purple-500 to-indigo-600"
  },
  {
    icon: <Download size={40} className="text-green-500" />,
    title: "3. Copie e Viralize",
    description: "A IA vai gerar 3 opções validadas. Clique no título para copiar, use o prompt da legenda no ChatGPT e veja seu engajamento explodir!",
    color: "from-green-400 to-emerald-600"
  }
];

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col relative animate-in zoom-in-95 duration-300">
        
        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 w-full">
          <div 
            className={`h-full bg-gradient-to-r ${steps[currentStep].color} transition-all duration-500 ease-out`}
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
        >
          <X size={20} />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          {/* Icon Circle */}
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${steps[currentStep].color} bg-opacity-10 flex items-center justify-center mb-6 shadow-lg transform transition-all duration-500`}>
            <div className="bg-white dark:bg-gray-900 w-[76px] h-[76px] rounded-full flex items-center justify-center">
              {steps[currentStep].icon}
            </div>
          </div>

          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3 transition-all">
            {steps[currentStep].title}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8 min-h-[80px]">
            {steps[currentStep].description}
          </p>

          {/* Dots Navigation */}
          <div className="flex gap-2 mb-8">
            {steps.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'bg-gray-800 dark:bg-white w-6' : 'bg-gray-300 dark:bg-gray-700'}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`w-full py-3.5 rounded-xl text-white font-bold text-sm tracking-wide uppercase shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r ${steps[currentStep].color}`}
          >
            {isLastStep ? (
              <>Começar Agora <CheckCircle size={18} /></>
            ) : (
              <>Próximo <ArrowRight size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;