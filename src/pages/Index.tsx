import { useState, useCallback, useEffect, useRef } from "react";
import Header from "@/components/Header";
import ProgressRing from "@/components/ProgressRing";
import Achievements from "@/components/Achievements";
import QuestionCard from "@/components/QuestionCard";
import NextQuestions from "@/components/NextQuestions";
import { questions, initialAchievements, Achievement } from "@/data/quizData";
import { Zap, RotateCcw, PartyPopper, Cloud, Volume2, VolumeX, Music } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Começa mutado propositalmente para exigir interação
  
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
    // 1. Instanciação dos áudios
    loadingAudioRef.current = new Audio('/loading-theme.mp3');
    gameAudioRef.current = new Audio('/game-theme.mp3');

    // 2. Configurações de volume e loop
    loadingAudioRef.current.volume = 0.4;
    gameAudioRef.current.volume = 0.3;
    gameAudioRef.current.loop = true;

    // 3. Garante que comecem mutados para não quebrar política do navegador
    loadingAudioRef.current.muted = true;
    gameAudioRef.current.muted = true;

    // Tenta tocar o loading (mutado, o navegador costuma aceitar)
    loadingAudioRef.current.play().catch(e => console.log("Autoplay de loading bloqueado na inicialização:", e));

    // 4. Temporizador de 15 segundos
    const timer = setTimeout(() => {
      setIsLoading(false); // Remove a tela de carregamento
      
      // Código de interrupção da música removido.
      // Agora a música continuará tocando suavemente na transição para a tela de gamificação.
      
    }, 15000); // 15 segundos

    // Limpeza ao sair do componente
    return () => {
      clearTimeout(timer);
      loadingAudioRef.current?.pause();
      gameAudioRef.current?.pause();
    };
  }, []);

  // 5. Função de controle de Som COM DIAGNÓSTICO (Console.log)
  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuteState = !prev;
      console.log("Botão de som clicado! O mudo agora é:", newMuteState);
      
      if (loadingAudioRef.current) loadingAudioRef.current.muted = newMuteState;
      if (gameAudioRef.current) gameAudioRef.current.muted = newMuteState;

      if (!newMuteState) { // Se o usuário tirou do mudo (quer ouvir som)
        if (isLoading) {
          console.log("Tentando tocar música de loading porque estamos na tela de espera...");
          loadingAudioRef.current?.play()
            .then(() => console.log("SUCESSO: Música de loading tocando!"))
            .catch((e) => console.error("ERRO ao tocar loading:", e));
        } else {
          console.log("Tentando tocar música do jogo porque o quiz já começou...");
          gameAudioRef.current?.play()
            .then(() => console.log("SUCESSO: Música do jogo tocando!"))
            .catch((e) => console.error("ERRO ao tocar jogo:", e));
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
    <div className="min-h-screen flex flex-col relative">
      
      {/* BALÃO INDICATIVO "CLIQUE AQUI" */}
      {isMuted && (
        <div className="fixed top-[70px] right-6 z-50 animate-bounce flex flex-col items-end pointer-events-none">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-transparent border-b-primary mr-[22px]"></div>
          <div className="bg-primary text-primary-foreground font-display text-xs font-bold tracking-widest py-2 px-4 rounded-xl shadow-[0_0_20px_rgba(0,168,255,0.6)]">
            CLIQUE AQUI PRA OUVIR O SOM
          </div>
        </div>
      )}

      {/* BOTÃO DE MÚSICA SOFISTICADO */}
      <button 
        onClick={toggleMute}
        className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-md border transition-all duration-500 hover:scale-105 ${
          isMuted 
            ? "bg-slate-900/80 border-slate-700 text-slate-500 shadow-none" 
            : "bg-card/90 border-primary/40 text-primary shadow-[0_0_20px_rgba(0,168,255,0.4)]"
        }`}
        title={isMuted ? "Ligar som" : "Desligar som"}
      >
        <div className="flex items-center gap-[3px] h-4">
          <div className={`w-1 bg-current rounded-full transition-all duration-300 ${isMuted ? 'h-1 opacity-50' : 'h-2 animate-pulse'}`}></div>
          <div className={`w-1 bg-current rounded-full transition-all duration-300 delay-75 ${isMuted ? 'h-1 opacity-50' : 'h-4 animate-pulse'}`}></div>
          <div className={`w-1 bg-current rounded-full transition-all duration-300 delay-150 ${isMuted ? 'h-1 opacity-50' : 'h-3 animate-pulse'}`}></div>
        </div>

        <span className="font-display text-xs tracking-widest font-bold mt-0.5 whitespace-nowrap">
          {isMuted ? "SOM OFF" : "TRILHA ON"}
        </span>

        {isMuted ? <VolumeX className="w-4 h-4" /> : <Music className="w-4 h-4 text-glow-cyan" />}
      </button>

      {/* Tela de Carregamento */}
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-background relative overflow-hidden">
          
          {/* ANIMAÇÃO DE NUVENS PASSANDO NO FUNDO */}
          <style>{`
            @keyframes drift {
              0% { transform: translateX(-20vw); }
              100% { transform: translateX(120vw); }
            }
            .animate-drift-1 { animation: drift 20s linear infinite; }
            .animate-drift-2 { animation: drift 30s linear infinite; animation-delay: -10s; }
            .animate-drift-3 { animation: drift 25s linear infinite; animation-delay: -5s; }
          `}</style>
          
          <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
            <Cloud className="absolute top-[10%] -left-[20%] w-80 h-80 text-primary animate-drift-1" />
            <Cloud className="absolute top-[45%] -left-[20%] w-[500px] h-[500px] text-glow-cyan animate-drift-2" />
            <Cloud className="absolute bottom-[5%] -left-[20%] w-96 h-96 text-primary animate-drift-3" />
          </div>

          {/* SECÇÃO DAS FOTOGRAFIAS E TURMA */}
          <div className="flex flex-col items-center mb-10 z-10 relative">
            
            {/* FOTOS GIGANTES */}
            <div className="flex gap-12 lg:gap-20">
              <div className="flex flex-col items-center gap-4">
                <img 
                  src="/image_6dd643.jpg" 
                  alt="Emanuel italo" 
                  className="w-48 h-48 lg:w-56 lg:h-56 rounded-full border-[6px] border-primary object-cover shadow-[0_0_50px_rgba(0,168,255,0.8)] animate-pulse"
                />
                <span className="font-display text-base lg:text-lg font-bold text-primary tracking-widest uppercase bg-background/60 px-5 py-1.5 rounded-full backdrop-blur-md">
                  Emanuel italo
                </span>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <img 
                  src="/image_6dd340.jpg" 
                  alt="Paulo Estalise" 
                  className="w-48 h-48 lg:w-56 lg:h-56 rounded-full border-[6px] border-primary object-cover shadow-[0_0_50px_rgba(0,168,255,0.8)] animate-pulse"
                />
                <span className="font-display text-base lg:text-lg font-bold text-primary tracking-widest uppercase bg-background/60 px-5 py-1.5 rounded-full backdrop-blur-md">
                  Paulo Estalise
                </span>
              </div>
            </div>

            {/* TURMA 2TDSPO */}
            <div className="mt-8 bg-primary/20 border-2 border-primary/50 px-8 py-2.5 rounded-full shadow-[0_0_25px_rgba(0,168,255,0.4)] backdrop-blur-md">
              <span className="font-display text-sm lg:text-base font-bold text-glow-cyan tracking-widest uppercase">
                Turma: 2TDSPO
              </span>
            </div>

          </div>

          {/* SPINNER E TEXTO */}
          <div className="relative flex flex-col items-center justify-center mt-4 z-10">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-24 h-24 border-[5px] border-primary border-t-transparent rounded-full animate-spin glow-blue"></div>
              <Cloud className="w-10 h-10 text-glow-cyan absolute animate-pulse" />
            </div>
            
            <h2 className="font-display text-3xl font-bold text-glow-cyan animate-pulse uppercase tracking-widest text-center bg-background/40 px-6 py-2 rounded-xl backdrop-blur-sm">
              Iniciando Migração...
            </h2>
            <p className="mt-4 font-display text-base tracking-wider text-muted-foreground uppercase bg-background/60 px-6 py-1.5 rounded-full backdrop-blur-sm">
              Preparando o ambiente Cloud
            </p>
          </div>
        </div>
      ) : (
        <>
          <Header />

          <main className="flex-1 max-w-6xl mx-auto w-full px-4 pb-10 mt-8">
            <div className="flex items-center justify-center gap-3 mb-8 py-3 px-6 rounded-xl border-glow bg-card/40 backdrop-blur-sm w-fit mx-auto">
              <Zap className="w-5 h-5 text-glow-gold" />
              <span className="font-display text-sm tracking-widest">
                SEU SCORE ATUAL: <span className="text-accent text-glow-cyan font-bold">{score} PTS</span>
              </span>
            </div>

            {/* TELA DE GAMIFICAÇÃO FINAL */}
            {finished ? (
              <div className="flex flex-col items-center gap-6 py-16">
                <PartyPopper className="w-16 h-16 text-glow-gold animate-float" />
                <h2 className="font-display text-2xl text-glow tracking-wider">QUIZ FINALIZADO!</h2>
                <p className="font-display text-lg text-accent text-glow-cyan">{score} / {questions.length * 20} PTS</p>
                <Achievements achievements={achievements} />
                <button onClick={handleRestart} className="mt-4 font-display text-sm tracking-wider py-3 px-8 rounded-lg bg-primary text-primary-foreground glow-blue flex items-center gap-2 hover:bg-primary/90 transition-all">
                  <RotateCcw className="w-4 h-4" /> JOGAR NOVAMENTE
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] gap-6">
                <div className="flex flex-col items-center gap-6">
                  <ProgressRing current={answered + 1} total={questions.length} />
                  <Achievements achievements={achievements} />
                </div>

                <QuestionCard
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  onSelect={setSelectedAnswer}
                  onSubmit={handleSubmit}
                  feedback={feedback}
                />

                <div>
                  <NextQuestions currentIndex={currentIndex} />
                </div>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default Index;