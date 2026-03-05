import { useState, useCallback } from "react";
import Header from "@/components/Header";
import ProgressRing from "@/components/ProgressRing";
import Achievements from "@/components/Achievements";
import QuestionCard from "@/components/QuestionCard";
import NextQuestions from "@/components/NextQuestions";
import { questions, initialAchievements, Achievement } from "@/data/quizData";
import { Zap, RotateCcw, PartyPopper } from "lucide-react";

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements.map(a => ({ ...a })));
  const [answered, setAnswered] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pb-10">
        {/* Score bar */}
        <div className="flex items-center justify-center gap-3 mb-8 py-3 px-6 rounded-xl border-glow bg-card/40 backdrop-blur-sm w-fit mx-auto">
          <Zap className="w-5 h-5 text-glow-gold" />
          <span className="font-display text-sm tracking-widest">
            SEU SCORE ATUAL: <span className="text-accent text-glow-cyan font-bold">{score} PTS</span>
          </span>
        </div>

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
            {/* Left sidebar */}
            <div className="flex flex-col items-center gap-6">
              <ProgressRing current={answered + 1} total={questions.length} />
              <Achievements achievements={achievements} />
            </div>

            {/* Center */}
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onSelect={setSelectedAnswer}
              onSubmit={handleSubmit}
              feedback={feedback}
            />

            {/* Right sidebar */}
            <div>
              <NextQuestions currentIndex={currentIndex} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
