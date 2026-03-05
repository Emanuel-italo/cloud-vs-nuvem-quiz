import { questions } from "@/data/quizData";
import { ChevronRight } from "lucide-react";

interface NextQuestionsProps {
  currentIndex: number;
}

const NextQuestions = ({ currentIndex }: NextQuestionsProps) => {
  const upcoming = questions.filter((_, i) => i > currentIndex);

  return (
    <div className="border-glow rounded-xl p-4 bg-card/40 backdrop-blur-sm">
      <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-3">PRÓXIMAS PERGUNTAS</h3>
      {upcoming.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma pergunta restante</p>
      ) : (
        <div className="flex flex-col gap-2">
          {upcoming.map((q) => (
            <div key={q.id} className="flex items-center gap-2 rounded-md px-3 py-2 bg-secondary/30 border border-border/50">
              <ChevronRight className="w-4 h-4 text-primary shrink-0" />
              <span className="font-display text-[11px] tracking-wider text-muted-foreground">PERGUNTA {q.id}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NextQuestions;
