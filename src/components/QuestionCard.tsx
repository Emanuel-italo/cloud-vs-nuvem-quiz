import { Question } from "@/data/quizData";
import { Send, CheckCircle, XCircle } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  onSelect: (label: string) => void;
  onSubmit: () => void;
  feedback: "correct" | "wrong" | null;
}

const QuestionCard = ({ question, selectedAnswer, onSelect, onSubmit, feedback }: QuestionCardProps) => (
  <div className="border-glow rounded-xl p-6 bg-card/40 backdrop-blur-sm">
    <h2 className="font-display text-sm tracking-wider text-accent mb-1">PERGUNTA {question.id}</h2>
    <p className="font-body text-base font-semibold text-foreground mb-6 leading-relaxed">{question.text}</p>

    <div className="flex flex-col gap-3 mb-6">
      {question.options.map((opt) => {
        const isSelected = selectedAnswer === opt.label;
        const isCorrect = feedback && opt.label === question.correctAnswer;
        const isWrong = feedback === "wrong" && isSelected && opt.label !== question.correctAnswer;

        return (
          <button
            key={opt.label}
            onClick={() => !feedback && onSelect(opt.label)}
            disabled={!!feedback}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 border text-left transition-all duration-300 font-body text-sm
              ${isCorrect ? "border-glow-success/60 bg-glow-success/10 glow-green" : ""}
              ${isWrong ? "border-destructive/60 bg-destructive/10" : ""}
              ${isSelected && !feedback ? "border-primary/60 bg-primary/10 glow-blue" : ""}
              ${!isSelected && !feedback && !isCorrect && !isWrong ? "border-border bg-card/30 hover:border-primary/40 hover:bg-primary/5" : ""}
            `}
          >
            <span className={`font-display text-xs w-7 h-7 rounded-md flex items-center justify-center shrink-0 
              ${isSelected && !feedback ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {opt.label}
            </span>
            <span className="flex-1">{opt.text}</span>
            {isCorrect && <CheckCircle className="w-5 h-5 text-glow-success shrink-0" />}
            {isWrong && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
          </button>
        );
      })}
    </div>

    {!feedback && (
      <button
        onClick={onSubmit}
        disabled={!selectedAnswer}
        className="w-full font-display text-sm tracking-wider py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all glow-blue flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        ENVIAR RESPOSTA
      </button>
    )}

    {feedback && (
      <div className={`text-center font-display text-sm tracking-wider py-3 rounded-lg ${feedback === "correct" ? "text-glow-success bg-glow-success/10" : "text-destructive bg-destructive/10"}`}>
        {feedback === "correct" ? "✓ RESPOSTA CORRETA! +20 PTS" : "✗ RESPOSTA INCORRETA"}
      </div>
    )}
  </div>
);

export default QuestionCard;
