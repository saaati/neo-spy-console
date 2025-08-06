import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface PinAuthProps {
  onAuthenticated: () => void;
}

export const PinAuth = ({ onAuthenticated }: PinAuthProps) => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { toast } = useToast();

  const handleAuth = () => {
    if (pin === "1234") {
      setIsAuthenticating(true);
      setTimeout(() => {
        onAuthenticated();
      }, 1500);
    } else {
      toast({
        title: "❌ PIN Incorreto",
        description: "Tente novamente",
        className: "border-destructive bg-destructive/10 text-destructive"
      });
      setPin("");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 scanlines">
      <Card className="cyber-border bg-card/30 backdrop-blur-sm w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary terminal-glow" />
          </div>
          <CardTitle className="text-2xl font-mono terminal-glow text-primary">
            XSPY
          </CardTitle>
          <p className="text-muted-foreground">
            Digite o PIN para acessar o painel
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input
              type={showPin ? "text" : "password"}
              placeholder="Digite o PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="cyber-border bg-card/20 text-center text-lg font-mono"
              maxLength={4}
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPin(!showPin)}
            >
              {showPin ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          
          <Button 
            onClick={handleAuth}
            className="w-full cyber-border bg-primary/20 hover:bg-primary/30 text-primary border-primary h-12"
            disabled={pin.length !== 4 || isAuthenticating}
          >
            {isAuthenticating ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>VALIDANDO...</span>
              </div>
            ) : (
              'ACESSAR SISTEMA'
            )}
          </Button>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground font-mono">
              PIN: 1234
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};