import { Achievement } from "@/data/quizData";
import { Lock, Trophy, Star, Crown } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "🏆": <Trophy className="w-5 h-5" />,
  "⭐": <Star className="w-5 h-5" />,
  "👑": <Crown className="w-5 h-5" />,
};

const AchievementCard = ({ achievement }: { achievement: Achievement }) => (
  <div
    className={`flex items-center gap-3 rounded-lg px-4 py-3 border transition-all duration-500 ${
      achievement.unlocked
        ? "border-glow-gold/40 bg-glow-gold/10 glow-gold"
        : "border-border bg-card/50 opacity-50"
    }`}
  >
    <div className={`${achievement.unlocked ? "text-glow-gold" : "text-muted-foreground"}`}>
      {achievement.unlocked ? iconMap[achievement.icon] : <Lock className="w-5 h-5" />}
    </div>
    <div>
      <p className={`font-display text-xs tracking-wider ${achievement.unlocked ? "text-glow-gold" : "text-muted-foreground"}`}>
        {achievement.title}
      </p>
      <p className="text-[11px] text-muted-foreground">{achievement.description}</p>
    </div>
  </div>
);

const Achievements = ({ achievements }: { achievements: Achievement[] }) => (
  <div className="border-glow rounded-xl p-4 bg-card/40 backdrop-blur-sm">
    <h3 className="font-display text-xs tracking-widest text-muted-foreground mb-3">CONQUISTAS</h3>
    <div className="flex flex-col gap-2">
      {achievements.map((a) => (
        <AchievementCard key={a.id} achievement={a} />
      ))}
    </div>
  </div>
);

export default Achievements;
