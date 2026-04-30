import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Waves, 
  Anchor, 
  RotateCcw, 
  ChevronRight, 
  Play, 
  Trophy,
  CheckCircle2,
  XCircle,
  Gem,
  Navigation,
  Compass,
  Map,
  Info,
  Ship,
  Wind
} from 'lucide-react';
import { 
  DIRECTION_QUESTIONS, 
  VOYAGE_ASSETS,
  SeaQuestion
} from './constants';

type GameState = 'start' | 'playing' | 'end';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const shuffledQuestions = useMemo(() => {
    return [...DIRECTION_QUESTIONS].sort(() => Math.random() - 0.5);
  }, [gameState === 'playing' && currentIndex === 0]);

  const currentQuestion = shuffledQuestions[currentIndex];

  const handleAnswer = (idx: number) => {
    if (feedback) return;

    if (idx === currentQuestion.correctIndex) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setShowExplanation(false);
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setGameState('end');
    }
  };

  const restart = () => {
    setGameState('start');
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-sky-950 text-white font-sans selection:bg-orange-500/30 overflow-hidden relative">
      {/* Nautical Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={VOYAGE_ASSETS.bg} 
          className="w-full h-full object-cover opacity-20 contrast-125 grayscale-[0.5]" 
          alt="Ocean" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/40 via-sky-950/80 to-sky-950" />
        
        {/* Animated Waves Decor */}
        <div className="absolute bottom-0 inset-x-0 h-40 opacity-10 pointer-events-none">
           <motion.div 
             animate={{ x: [-20, 20, -20] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-0 w-[120%] h-full bg-[url('https://www.transparenttextures.com/patterns/waves.png')] repeat-x"
           />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* --- START SCREEN --- */}
        {gameState === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
             <motion.div 
               animate={{ rotate: [0, 2, -2, 0], y: [0, -10, 0] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="mb-10 relative"
             >
                <div className="w-36 h-36 md:w-56 md:h-56 bg-orange-500/10 rounded-full border-4 border-orange-400/30 flex items-center justify-center shadow-[0_0_100px_rgba(249,115,22,0.15)]">
                   <img src={VOYAGE_ASSETS.ship} className="w-24 h-24 md:w-40 md:h-40 drop-shadow-2xl" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-6 -right-6 bg-sky-900 text-orange-400 p-4 rounded-full shadow-xl border-2 border-orange-400/20"
                >
                  <Compass size={32} />
                </motion.div>
             </motion.div>

             <h1 className="text-5xl md:text-9xl font-black mb-6 tracking-tighter uppercase italic leading-none">
                ԾՈՎԱՅԻՆ <br/> <span className="text-orange-400 drop-shadow-[0_0_40px_rgba(249,115,22,0.4)] tracking-normal">ՈՒՂԵՎՈՐՈՒԹՅՈՒՆ</span>
             </h1>

             <p className="max-w-xl text-lg md:text-xl text-sky-100/60 mb-12 font-medium tracking-wide">
                Բացահայտիր <span className="text-orange-400 font-black">¿Dónde?</span>, <span className="text-orange-400 font-black">¿Adónde?</span> և <span className="text-orange-400 font-black">¿De dónde?</span> բառերի գաղտնիքները հեռավոր ծովերում:
             </p>

             <button 
               onClick={() => setGameState('playing')}
               className="group relative px-20 py-8 bg-orange-500 text-sky-950 rounded-[2rem] font-black text-2xl hover:bg-orange-400 transition-all shadow-[0_0_50px_rgba(249,115,22,0.3)] flex items-center gap-6 uppercase transform active:scale-95"
             >
               ԲԱՐՁՐԱՆԱԼ ՆԱՎ <Ship className="w-8 h-8 group-hover:rotate-12 transition-transform" />
             </button>

             <div className="mt-12 flex gap-8 opacity-40">
                <div className="flex items-center gap-2 text-xs font-bold uppercase"><Anchor size={14}/> Խարիսխ</div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase"><Navigation size={14}/> Կողմնացույց</div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase"><Map size={14}/> Քարտեզ</div>
             </div>
          </motion.div>
        )}

        {/* --- GAMEPLAY --- */}
        {gameState === 'playing' && (
          <motion.div 
             key="playing"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="relative z-10 min-h-screen flex flex-col p-4 md:p-8"
          >
             {/* Voyage Header HUD */}
             <div className="max-w-6xl w-full mx-auto flex items-center justify-between mb-8 md:mb-12 bg-sky-900/40 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-orange-400/20 shadow-2xl">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-orange-400/10 rounded-2xl border-2 border-orange-400/30 flex items-center justify-center">
                      <img src={VOYAGE_ASSETS.ship} className="w-10 h-10" />
                   </div>
                   <div>
                      <div className="text-[10px] font-black uppercase text-orange-400 tracking-[0.2em] leading-none mb-1">Նավի Հրամանատար</div>
                      <div className="font-black text-xl italic text-white uppercase">Ուղևորություն</div>
                   </div>
                </div>

                <div className="flex flex-col items-center">
                   <div className="bg-white/5 border border-white/10 px-8 py-3 rounded-full font-black text-xl flex items-center gap-4">
                      <Navigation className="w-5 h-5 text-orange-400 animate-pulse" />
                      {currentIndex + 1} <span className="opacity-20">/</span> {shuffledQuestions.length}
                   </div>
                </div>

                <div className="flex items-center gap-6">
                   <div className="text-right hidden md:block">
                      <div className="text-[10px] font-black uppercase text-sky-400 tracking-widest leading-none mb-1">Գտած գանձեր</div>
                      <div className="font-black text-2xl italic tracking-tighter text-white uppercase">{score} Միավոր</div>
                   </div>
                   <div className="w-16 h-16 bg-yellow-400/10 rounded-2xl border-2 border-yellow-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.1)]">
                      <Trophy className="w-8 h-8 text-yellow-400" />
                   </div>
                </div>
             </div>

             {/* Question Area */}
             <div className="flex-1 flex flex-col items-center justify-center max-w-5xl w-full mx-auto relative px-4">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="w-full"
                >
                   <div className="bg-sky-900/60 backdrop-blur-3xl p-8 md:p-20 rounded-[4rem] border-2 border-orange-400/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] text-center relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                         <div className="bg-sky-800 p-4 rounded-full border-4 border-orange-500 shadow-2xl">
                           <Map size={32} className="text-orange-400" />
                         </div>
                      </div>

                      <div className="inline-flex items-center gap-2 mb-10 bg-orange-400/10 px-6 py-2 rounded-full border border-orange-400/20 text-orange-400">
                         <Anchor className="w-4 h-4" />
                         <span className="font-black uppercase text-[10px] tracking-[0.3em]">Ուղղորդեք նավը</span>
                      </div>

                      <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight mb-10 text-white italic">
                         "{currentQuestion.sentence}"
                      </h2>
                      
                      <p className="text-orange-100/60 font-bold text-lg md:text-2xl mb-16 uppercase tracking-wide">
                         {currentQuestion.translation}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                         {currentQuestion.options.map((option, idx) => (
                           <button
                             key={idx}
                             disabled={!!feedback}
                             onClick={() => handleAnswer(idx)}
                             className={`group relative py-8 px-4 rounded-[2rem] font-black text-xl md:text-3xl transition-all border-b-8 transform active:scale-95 ${
                                feedback === null 
                                ? 'bg-sky-950 border-b-sky-800 hover:border-orange-500 hover:bg-sky-900 text-sky-200'
                                : idx === currentQuestion.correctIndex 
                                   ? 'bg-orange-500 border-b-orange-700 text-sky-950 scale-105 shadow-[0_0_40px_rgba(249,115,22,0.4)]'
                                   : 'bg-red-500/10 border-red-500/30 text-red-500 opacity-40'
                             }`}
                           >
                              {option}
                              {feedback === null && (
                                <Wind className="absolute top-2 right-2 w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />
                              )}
                           </button>
                         ))}
                      </div>

                      {/* Feedback Region */}
                      <AnimatePresence>
                         {showExplanation && (
                           <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             className="overflow-hidden"
                           >
                              <div className={`mt-10 p-8 rounded-[3rem] border-2 flex flex-col items-center ${feedback === 'correct' ? 'bg-orange-400/10 border-orange-400/20' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                 <div className="flex items-center gap-4 mb-4">
                                    {feedback === 'correct' ? (
                                      <CheckCircle2 className="w-10 h-10 text-orange-400" />
                                    ) : (
                                      <XCircle className="w-10 h-10 text-red-500" />
                                    )}
                                    <h3 className="font-black uppercase text-2xl tracking-tighter italic">
                                       {feedback === 'correct' ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է!'}
                                    </h3>
                                 </div>
                                 <p className="text-sky-100/70 max-w-xl mb-10 leading-relaxed text-lg font-medium">
                                    <Info className="inline-block mr-2 w-5 h-5 text-orange-400" />
                                    {currentQuestion.explanation}
                                 </p>
                                 
                                 <button 
                                   onClick={nextQuestion}
                                   className="group px-16 py-6 bg-white text-sky-950 rounded-2xl font-black text-xl hover:bg-orange-400 transition-all flex items-center justify-center gap-4 shadow-2xl"
                                 >
                                    ՀԱՋՈՐԴ ԿԱՅԱՆ <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                 </button>
                              </div>
                           </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                </motion.div>
             </div>
          </motion.div>
        )}

        {/* --- END SCREEN --- */}
        {gameState === 'end' && (
          <motion.div 
            key="end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center"
          >
             <div className="max-w-4xl w-full bg-sky-900/80 backdrop-blur-3xl border-4 border-orange-400/20 rounded-[5rem] p-12 md:p-24 shadow-2xl relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="mb-12"
                >
                  <img src={VOYAGE_ASSETS.island} className="w-48 h-48 md:w-72 md:h-72 mx-auto drop-shadow-[0_0_60px_rgba(249,115,22,0.3)]" />
                </motion.div>
                
                <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                   ՃԱՆԱՊԱՐՀԻ <br/> <span className="text-orange-400">ՎԵՐՋԸ</span>
                </h2>

                <div className="mb-16">
                   <div className="text-orange-400 font-black uppercase tracking-[0.4em] mb-4 text-sm opacity-40">Քո նավարկության արդյունքը</div>
                   <div className="text-[10rem] md:text-[14rem] font-black text-white italic leading-none tracking-tighter flex items-center justify-center gap-8">
                      {score} <span className="text-5xl md:text-7xl text-orange-400/20 not-italic">/</span> {shuffledQuestions.length}
                   </div>
                </div>

                <div className="mb-16 p-10 bg-orange-400/10 rounded-[4rem] border border-orange-400/20">
                   <p className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tight">
                      {score === 10 ? "ԴՈՒ ԾՈՎԱՅԻՆ ԼԵԶՎԱՊԱՆ ԵՍ!" : score >= 7 ? "ԳԵՐԱԶԱՆՑ ՆԱՎԱՐԿՈՒԹՅՈՒՆ!" : "ԼԱՎ ՓՈՐՁ ԷՐ, ԲԱՅՑ ՔԱՐՏԵԶԸ ՆՈՐԻՑ ՈՒՍՈՒՄՆԱՍԻՐԵՔ:"}
                   </p>
                </div>

                <button 
                  onClick={restart}
                  className="w-full py-8 bg-orange-500 text-sky-950 rounded-[3rem] font-black text-3xl hover:bg-orange-400 hover:scale-105 transition-all shadow-[0_0_70px_rgba(249,115,22,0.2)] flex items-center justify-center gap-8 uppercase group"
                >
                  <RotateCcw className="w-12 h-12 group-hover:rotate-180 transition-transform duration-700" />
                  ՍԿՍԵԼ ՆՈՐ ՃԱՄՓՈՐԴՈՒԹՅՈՒՆ
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
