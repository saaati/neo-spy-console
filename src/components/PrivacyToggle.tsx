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
      className="cyber-border text-primary hover:bg-primary/10"
    >
      {hideInfo ? (
        <>
          <EyeOff className="w-4 h-4 mr-2" />
          Exibir Info
        </>
      ) : (
        <>
          <Eye className="w-4 h-4 mr-2" />
          Ocultar Info
        </>
      )}
    </Button>
  );
};