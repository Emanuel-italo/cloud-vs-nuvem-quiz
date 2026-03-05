import { Cloud } from "lucide-react";
import idealizadorAzul from "@/assets/idealizador-azul.jpg";
import idealizadorBranco from "@/assets/idealizador-branco.jpg";

const ProfileCard = ({ image, label }: { image: string; label: string }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary/50 glow-blue">
      <img src={image} alt={label} className="w-full h-full object-cover" />
    </div>
    <span className="font-display text-xs tracking-wider text-primary">{label}</span>
  </div>
);

const Header = () => (
  <header className="w-full py-6 px-4">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <ProfileCard image={idealizadorBranco} label="IDEALIZADOR: CAMISA BRANCA" />

      <div className="flex flex-col items-center gap-2">
        <Cloud className="w-10 h-10 text-accent animate-pulse-glow" />
        <h1 className="font-display text-xl md:text-2xl font-bold tracking-wider text-center text-glow">
          PROJETO GAMIFICAÇÃO
        </h1>
        <p className="font-display text-sm text-accent text-glow-cyan tracking-widest">
          CLOUD VS. NUVEM
        </p>
      </div>

      <ProfileCard image={idealizadorAzul} label="IDEALIZADOR: CAMISA AZUL" />
    </div>
  </header>
);

export default Header;
