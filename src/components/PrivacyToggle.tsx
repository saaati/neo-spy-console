import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrivacyToggleProps {
  hideInfo: boolean;
  onToggle: () => void;
}

export const PrivacyToggle = ({ hideInfo, onToggle }: PrivacyToggleProps) => {
  return (
    <Button
      variant="cyber"
      size="sm"
      onClick={onToggle}
      className={`transition-all duration-300 font-mono tracking-wide ${
        hideInfo 
          ? "text-stealth-green bg-stealth-green/20 border-stealth-green hover:bg-stealth-green/30 shadow-lg hover:shadow-stealth-green/25" 
          : "text-primary hover:bg-primary/10 hover:shadow-primary/20"
      }`}
    >
      {hideInfo ? (
        <>
          <EyeOff className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">Modo Stealth</span>
          <span className="md:hidden">Stealth</span>
        </>
      ) : (
        <>
          <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">Ocultar Info</span>
          <span className="md:hidden">Ocultar</span>
        </>
      )}
    </Button>
  );
};