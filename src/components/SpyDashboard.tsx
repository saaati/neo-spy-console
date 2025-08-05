import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SpySidebar } from "./SpySidebar";
import { SpyHeader } from "./SpyHeader";
import { LocationPanel } from "./panels/LocationPanel";
import { CamerasPanel } from "./panels/CamerasPanel";
import { MessagesPanel } from "./panels/MessagesPanel";
import { MicrophonePanel } from "./panels/MicrophonePanel";
import { LogsPanel } from "./panels/LogsPanel";
import { TargetsPanel } from "./panels/TargetsPanel";
import { SystemPanel } from "./panels/SystemPanel";
import { GalleryPanel } from "./panels/GalleryPanel";
import { PinAuth } from "./PinAuth";
import { PrivacyToggle } from "./PrivacyToggle";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type ActivePanel = 'location' | 'cameras' | 'messages' | 'microphone' | 'logs' | 'targets' | 'system' | 'gallery';

export const SpyDashboard = () => {
  const [activePanel, setActivePanel] = useState<ActivePanel>('location');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hideInfo, setHideInfo] = useState(false);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Timer inicial de 30 segundos
    const initialTimer = setTimeout(() => {
      setShowPurchaseDialog(true);
    }, 30000);

    return () => clearTimeout(initialTimer);
  }, [isAuthenticated]);

  const handlePurchaseResponse = (response: boolean) => {
    setShowPurchaseDialog(false);

    if (response) {
      // Redirecionar para a URL de compra
      window.open('https://codefence.duckdns.org/xspy', '_blank');
    } else {
      // Aguardar 1 minuto e mostrar novamente
      setTimeout(() => {
        setShowPurchaseDialog(true);
      }, 60000);
    }
  };

  if (!isAuthenticated) {
    return <PinAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'location':
        return <LocationPanel hideInfo={hideInfo} />;
      case 'cameras':
        return <CamerasPanel hideInfo={hideInfo} />;
      case 'messages':
        return <MessagesPanel hideInfo={hideInfo} />;
      case 'microphone':
        return <MicrophonePanel hideInfo={hideInfo} />;
      case 'logs':
        return <LogsPanel hideInfo={hideInfo} />;
      case 'targets':
        return <TargetsPanel hideInfo={hideInfo} />;
      case 'system':
        return <SystemPanel hideInfo={hideInfo} />;
      case 'gallery':
        return <GalleryPanel hideInfo={hideInfo} />;
      default:
        return <LocationPanel hideInfo={hideInfo} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background scanlines">
        <SpyHeader>
          <PrivacyToggle hideInfo={hideInfo} onToggle={() => setHideInfo(!hideInfo)} />
        </SpyHeader>
        
        <div className="flex w-full">
          <SpySidebar activePanel={activePanel} setActivePanel={setActivePanel} />
          
          <main className="flex-1 p-3 md:p-8 lg:p-10">
            <div className="glass-card cyber-border rounded-xl h-full min-h-[calc(100vh-7rem)] overflow-hidden">
              <div className="p-4 md:p-6 lg:p-8 h-full">
                {renderActivePanel()}
              </div>
            </div>
          </main>
        </div>

        {/* Purchase Dialog */}
        <Dialog open={showPurchaseDialog} onOpenChange={() => handlePurchaseResponse(false)}>
          <DialogContent className="cyber-border bg-card/95 backdrop-blur-md max-w-md border-primary/50">
            <DialogHeader className="text-center">
              <DialogTitle className="text-2xl text-primary terminal-glow font-mono mb-4">
                🛒 OFERTA ESPECIAL
              </DialogTitle>
            </DialogHeader>
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <p className="text-lg text-foreground font-mono">
                  Você gostaria de comprar agora?
                </p>
                <p className="text-sm text-muted-foreground">
                  Acesse a versão completa do XSPY com recursos avançados
                </p>
              </div>
              
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => handlePurchaseResponse(true)}
                  className="cyber-border bg-primary/20 hover:bg-primary/30 text-primary border-primary px-8 py-3 font-mono tracking-wide"
                >
                  ✓ SIM, COMPRAR
                </Button>
                <Button
                  onClick={() => handlePurchaseResponse(false)}
                  variant="outline"
                  className="cyber-border border-muted hover:bg-muted/10 px-8 py-3 font-mono tracking-wide"
                >
                  ✗ NÃO AGORA
                </Button>
              </div>

              <div className="text-xs text-terminal-dim border-t border-border pt-4 mt-4">
                💡 Esta oferta reaparecerá em breve
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarProvider>
  );
};