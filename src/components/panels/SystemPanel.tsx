import { useState } from "react";
import { Settings, Shield, Download, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export const SystemPanel = () => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const { toast } = useToast();

  const handleInstallPDF = () => {
    setIsInstalling(true);
    setInstallProgress(0);
    
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsInstalling(false);
          toast({
            title: "✓ PDF Enviado com Sucesso",
            description: "Instruções de instalação foram enviadas para o dispositivo alvo.",
            className: "border-primary bg-primary/10 text-primary"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSystemReset = () => {
    toast({
      title: "⚠️ Sistema Reinicializado",
      description: "Todos os dados temporários foram limpos. Conexões reestabelecidas.",
      className: "border-warning bg-warning/10 text-warning"
    });
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <Settings className="w-6 h-6" />
          <span>CONFIGURAÇÕES DO SISTEMA</span>
        </h2>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-primary cyber-glow" />
          <span className="text-sm font-mono text-primary">SECURE MODE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Installation Panel */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">INSTALAÇÃO REMOTA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/20 rounded cyber-border">
                <h4 className="text-sm font-mono text-primary mb-2">PACOTE DE INSTALAÇÃO</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Envie instruções de instalação do sistema de monitoramento para dispositivos alvo.
                </p>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-terminal">Payload: XSPY_Mobile_v7.0.pdf</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-terminal">Tamanho: 2.4 MB</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-terminal">Criptografia: AES-256</span>
                </div>
              </div>

              {isInstalling && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Enviando...</span>
                    <span className="text-primary font-mono">{installProgress}%</span>
                  </div>
                  <Progress value={installProgress} className="h-2" />
                </div>
              )}

              <Button 
                className="w-full cyber-border bg-primary/10 hover:bg-primary/20 text-primary h-12"
                onClick={handleInstallPDF}
                disabled={isInstalling}
              >
                <Download className="w-5 h-5 mr-2" />
                {isInstalling ? 'ENVIANDO PDF...' : 'ENVIAR PDF DE INSTALAÇÃO'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">STATUS DO SISTEMA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Versão:</span>
                  <p className="text-primary font-mono">XSPY v7.0.3</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Build:</span>
                  <p className="text-primary font-mono">2024.02.15</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Uptime:</span>
                  <p className="text-primary font-mono">72h 45m</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">CPU:</span>
                  <p className="text-primary font-mono">23%</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Memória RAM:</span>
                  <span className="text-primary font-mono">1.2GB / 8GB</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Armazenamento:</span>
                  <span className="text-primary font-mono">156GB / 500GB</span>
                </div>
                <Progress value={31} className="h-2" />
              </div>

              <Button 
                variant="outline" 
                className="w-full cyber-border text-warning hover:bg-warning/10"
                onClick={handleSystemReset}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                REINICIAR SISTEMA
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">CONFIGURAÇÕES DE SEGURANÇA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                <div>
                  <p className="text-sm font-mono text-foreground">Criptografia de Dados</p>
                  <p className="text-xs text-muted-foreground">AES-256 Ativo</p>
                </div>
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                <div>
                  <p className="text-sm font-mono text-foreground">Tunnel VPN</p>
                  <p className="text-xs text-muted-foreground">Conexão Segura</p>
                </div>
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/20 rounded">
                <div>
                  <p className="text-sm font-mono text-foreground">Auto-Destruct</p>
                  <p className="text-xs text-muted-foreground">24h de Inatividade</p>
                </div>
                <div className="w-3 h-3 bg-warning rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center justify-between p-3 bg-neon-red/10 rounded border border-neon-red/20">
                <div>
                  <p className="text-sm font-mono text-neon-red">Modo Stealth</p>
                  <p className="text-xs text-muted-foreground">Invisível para Antivírus</p>
                </div>
                <div className="w-3 h-3 bg-neon-red rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">ALERTAS DO SISTEMA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded border border-primary/20">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-mono text-primary">Sistema Operacional</p>
                  <p className="text-xs text-muted-foreground">Todos os módulos funcionando normalmente</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-warning/5 rounded border border-warning/20">
                <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-mono text-warning">Espaço em Disco</p>
                  <p className="text-xs text-muted-foreground">31% usado - Considere limpeza em breve</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded border border-primary/20">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-mono text-primary">Conexões Ativas</p>
                  <p className="text-xs text-muted-foreground">4 dispositivos conectados</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};