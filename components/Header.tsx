import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 px-4 flex flex-col items-center justify-center text-center mb-8">
      <div className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 mb-2">
         <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 animate-pulse"></div>
              <Zap className="w-12 h-12 text-red-500 relative z-10" />
            </div>
         </div>
         <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">Método Viral <br/><span className="text-4xl md:text-6xl">do Zero</span></h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mt-4 font-medium transition-colors duration-300">
        Transforme qualquer ideia em um vídeo viral usando a psicologia dos <span className="text-red-600 dark:text-red-500 font-bold">Ganchos Proibidos</span>.
      </p>
    </header>
  );
};

export default Header;