import { useState, useCallback, useEffect, useRef } from "react";
import Header from "@/components/Header";
import ProgressRing from "@/components/ProgressRing";
import Achievements from "@/components/Achievements";
import QuestionCard from "@/components/QuestionCard";
import NextQuestions from "@/components/NextQuestions";
import { questions, initialAchievements, Achievement } from "@/data/quizData";
import { Zap, RotateCcw, PartyPopper, Cloud, VolumeX, Music, Trophy } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true); 
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements.map(a => ({ ...a })));
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const loadingAudioRef = useRef<HTMLAudioElement | null>(null);
  const gameAudioRef = useRef<HTMLAudioElement | null>(null);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    loadingAudioRef.current = new Audio('/loading-theme.mp3');
    gameAudioRef.current = new Audio('/game-theme.mp3');

    loadingAudioRef.current.volume = 0.4;
    gameAudioRef.current.volume = 0.3;
    gameAudioRef.current.loop = true;

    loadingAudioRef.current.muted = true;
    gameAudioRef.current.muted = true;

    loadingAudioRef.current.play().catch(e => console.log("Autoplay bloqueado:", e));

    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 15000);

    return () => {
      clearTimeout(timer);
      loadingAudioRef.current?.pause();
      gameAudioRef.current?.pause();
    };
  }, []);

  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuteState = !prev;
      if (loadingAudioRef.current) loadingAudioRef.current.muted = newMuteState;
      if (gameAudioRef.current) gameAudioRef.current.muted = newMuteState;

      if (!newMuteState) {
        if (isLoading) {
          loadingAudioRef.current?.play().catch((e) => console.error(e));
        } else {
          gameAudioRef.current?.play().catch((e) => console.error(e));
        }
      }
      return newMuteState;
    });
  };

  const checkAchievements = useCallback((newScore: number) => {
    setAchievements(prev => prev.map(a => ({
      ...a,
      unlocked: a.unlocked || newScore >= a.requiredScore,
    })));
  }, []);

  const handleSubmit = () => {
    if (!selectedAnswer || feedback) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setFeedback(isCorrect ? "correct" : "wrong");
    const newScore = isCorrect ? score + currentQuestion.points : score;
    if (isCorrect) setScore(newScore);
    setAnswered(prev => prev + 1);
    checkAchievements(newScore);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setFeedback(null);
      } else {
        setFinished(true); 
      }
    }, 1800);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
    setAchievements(initialAchievements.map(a => ({ ...a })));
    setAnswered(0);
    setFinished(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-background overflow-hidden">
      
      {/* ESTILO DAS NUVENS (GLOBAL PARA A TELA) */}
      <style>{`
        @keyframes drift {
          0% { transform: translateX(-20vw); }
          100% { transform: translateX(120vw); }
        }
        .animate-drift-1 { animation: drift 25s linear infinite; }
        .animate-drift-2 { animation: drift 40s linear infinite; animation-delay: -10s; }
        .animate-drift-3 { animation: drift 35s linear infinite; animation-delay: -5s; }
      `}</style>

      {/* BALÃO INDICATIVO */}
      {isMuted && (
        <div className="fixed top-[70px] right-6 z-50 animate-bounce flex flex-col items-end pointer-events-none">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-primary mr-[22px]"></div>
          <div className="bg-primary text-primary-foreground font-display text-xs font-bold tracking-widest py-2 px-4 rounded-xl shadow-[0_0_20px_rgba(0,168,255,0.6)]">
            CLIQUE AQUI PRA OUVIR O SOM
          </div>
        </div>
      )}

      {/* BOTÃO DE SOM */}
      <button 
        onClick={toggleMute}
        className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-md border transition-all duration-500 hover:scale-105 ${
          isMuted 
            ? "bg-slate-900/80 border-slate-700 text-slate-500 shadow-none" 
            : "bg-card/90 border-primary/40 text-primary shadow-[0_0_20px_rgba(0,168,255,0.4)]"
        }`}
      >
        <div className="flex items-center gap-[3px] h-4">
          <div className={`w-1 bg-current rounded-full ${isMuted ? 'h-1 opacity-50' : 'h-2 animate-pulse'}`}></div>
          <div className={`w-1 bg-current rounded-full ${isMuted ? 'h-1 opacity-50' : 'h-4 animate-pulse'}`}></div>
          <div className={`w-1 bg-current rounded-full ${isMuted ? 'h-1 opacity-50' : 'h-3 animate-pulse'}`}></div>
        </div>
        <span className="font-display text-xs tracking-widest font-bold">{isMuted ? "SOM OFF" : "TRILHA ON"}</span>
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Music className="w-4 h-4 text-glow-cyan" />}
      </button>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center relative z-10">
          {/* NUVENS NO LOADING */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
            <Cloud className="absolute top-[10%] w-80 h-80 text-primary animate-drift-1" />
            <Cloud className="absolute top-[45%] w-[500px] h-[500px] text-glow-cyan animate-drift-2" />
            <Cloud className="absolute bottom-[5%] w-96 h-96 text-primary animate-drift-3" />
          </div>

          <div className="flex flex-col items-center mb-10 z-10 relative">
            <div className="flex gap-12 lg:gap-20">
              <div className="flex flex-col items-center gap-4">
                <img src="/image_6dd643.jpg" className="w-48 h-48 lg:w-56 lg:h-56 rounded-full border-[6px] border-primary object-cover shadow-[0_0_50px_rgba(0,168,255,0.8)] animate-pulse" />
                <span className="font-display text-base font-bold text-primary tracking-widest uppercase bg-background/60 px-5 py-1.5 rounded-full backdrop-blur-md">Emanuel italo</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <img src="/image_6dd340.jpg" className="w-48 h-48 lg:w-56 lg:h-56 rounded-full border-[6px] border-primary object-cover shadow-[0_0_50px_rgba(0,168,255,0.8)] animate-pulse" />
                <span className="font-display text-base font-bold text-primary tracking-widest uppercase bg-background/60 px-5 py-1.5 rounded-full backdrop-blur-md">Paulo Estalise</span>
              </div>
            </div>
            <div className="mt-8 bg-primary/20 border-2 border-primary/50 px-8 py-2.5 rounded-full backdrop-blur-md">
              <span className="font-display text-sm font-bold text-glow-cyan tracking-widest uppercase">Turma: 2TDSPO</span>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center z-10">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-24 h-24 border-[5px] border-primary border-t-transparent rounded-full animate-spin glow-blue"></div>
              <Cloud className="w-10 h-10 text-glow-cyan absolute animate-pulse" />
            </div>
            <h2 className="font-display text-3xl font-bold text-glow-cyan animate-pulse uppercase tracking-widest">Iniciando Migração...</h2>
          </div>
        </div>
      ) : (
        <div className="relative flex-1 flex flex-col z-10">
          {/* NUVENS NO JOGO (PASSANDO LÁ ATRÁS) */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]"></div>
            <Cloud className="absolute top-[15%] w-72 h-72 text-primary animate-drift-2" />
            <Cloud className="absolute top-[60%] w-[450px] h-[450px] text-glow-cyan animate-drift-1" />
            <Cloud className="absolute bottom-[10%] w-80 h-80 text-primary animate-drift-3" />
          </div>

          <div className="relative z-10 flex flex-col flex-1">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 pb-12 mt-8">
              
              <div className="relative group flex items-center justify-center gap-4 mb-10 py-4 px-10 rounded-3xl border border-primary/30 bg-slate-900/60 backdrop-blur-xl w-fit mx-auto shadow-[0_0_40px_rgba(0,168,255,0.15)] hover:shadow-[0_0_60px_rgba(0,168,255,0.4)] transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
                <Zap className="w-8 h-8 text-glow-gold animate-bounce" />
                <span className="font-display text-sm tracking-widest text-slate-300">SCORE ATUAL <span className="block text-2xl text-primary text-glow-cyan font-black mt-1">{score} PTS</span></span>
              </div>

              {finished ? (
                <div className="relative flex flex-col items-center gap-8 py-20 px-6 max-w-3xl mx-auto rounded-[3rem] bg-slate-900/40 border border-primary/20 backdrop-blur-md shadow-[0_0_80px_rgba(0,168,255,0.15)]">
                  <Trophy className="w-28 h-28 text-glow-gold animate-bounce drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]" />
                  <h2 className="font-display text-4xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-primary tracking-widest">MISSÃO CONCLUÍDA</h2>
                  <div className="bg-slate-950/80 px-16 py-8 rounded-3xl border-2 border-primary/40 shadow-[0_0_40px_rgba(0,168,255,0.3)]">
                    <p className="font-display text-6xl font-black text-accent text-glow-cyan">{score} <span className="text-3xl text-slate-600">/ {questions.length * 20}</span></p>
                  </div>
                  <Achievements achievements={achievements} />
                  <button onClick={handleRestart} className="mt-8 font-display font-bold tracking-widest py-5 px-12 rounded-2xl bg-primary text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,168,255,0.6)]">INICIAR NOVA MIGRAÇÃO</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-[260px_1fr_260px] gap-8 relative z-10">
                  <div className="flex flex-col items-center gap-8">
                    <ProgressRing current={answered + 1} total={questions.length} />
                    <Achievements achievements={achievements} />
                  </div>
                  <QuestionCard question={currentQuestion} selectedAnswer={selectedAnswer} onSelect={setSelectedAnswer} onSubmit={handleSubmit} feedback={feedback} />
                  <NextQuestions currentIndex={currentIndex} />
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;