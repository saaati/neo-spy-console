import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrivacyToggleProps {
  hideInfo: boolean;
  onToggle: () => void;
}

export const PrivacyToggle = ({ hideInfo, onToggle }: PrivacyToggleProps) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onToggle}
      className={`cyber-border transition-colors ${
        hideInfo 
          ? "text-primary bg-primary/20 border-primary hover:bg-primary/30" 
          : "text-primary hover:bg-primary/10"
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