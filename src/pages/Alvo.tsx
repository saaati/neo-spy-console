import { useState, useEffect } from "react";
import { Camera, MapPin, MessageSquare, Mic, Shield, Smartphone, Wifi, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Alvo = () => {
  const [stage, setStage] = useState<'landing' | 'permissions' | 'installing' | 'complete'>('landing');
  const [progress, setProgress] = useState(0);
  const [permissionsGranted, setPermissionsGranted] = useState<string[]>([]);
  const { toast } = useToast();

  const permissions = [
    { id: 'camera', name: 'Câmera', icon: Camera, description: 'Para verificar identidade' },
    { id: 'location', name: 'Localização', icon: MapPin, description: 'Para melhor experiência' },
    { id: 'messages', name: 'Mensagens', icon: MessageSquare, description: 'Para notificações' },
    { id: 'microphone', name: 'Microfone', icon: Mic, description: 'Para comandos de voz' },
    { id: 'contacts', name: 'Contatos', icon: Smartphone, description: 'Para sincronização' },
    { id: 'storage', name: 'Armazenamento', icon: Shield, description: 'Para backup de dados' }
  ];

  const handlePermissionRequest = (permissionId: string) => {
    // Simula requisição de permissão
    setTimeout(() => {
      setPermissionsGranted(prev => [...prev, permissionId]);
      toast({
        title: "Permissão Concedida",
        description: `Acesso ao ${permissions.find(p => p.id === permissionId)?.name} autorizado`,
        className: "cyber-border bg-card/90"
      });
    }, 1000);
  };

  const handleInstall = () => {
    setStage('installing');
    // Simula processo de instalação
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('complete');
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  useEffect(() => {
    // Simula dados sendo enviados para o painel principal
    if (stage === 'complete') {
      toast({
        title: "Sistema Ativo",
        description: "Dados sendo transmitidos para central de monitoramento",
        className: "cyber-border bg-neon-red/20 text-neon-red border-neon-red"
      });
    }
  }, [stage, toast]);

  return (
    <div className="min-h-screen bg-black text-white p-6 scanlines">
      <div className="max-w-2xl mx-auto">
        {stage === 'landing' && (
          <Card className="cyber-border bg-card/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary terminal-glow" />
              </div>
              <CardTitle className="text-2xl font-mono terminal-glow text-primary">
                SecureVault Pro
              </CardTitle>
              <p className="text-muted-foreground">
                Sistema de Segurança Avançado para seu Dispositivo
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <p className="text-foreground">
                  Proteja seus dados com nossa tecnologia de criptografia militar.
                  100% seguro e confiável.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Criptografia AES-256</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wifi className="w-4 h-4" />
                    <span>Conexão Segura</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => setStage('permissions')}
                className="w-full cyber-border bg-primary/20 hover:bg-primary/30 text-primary border-primary"
                size="lg"
              >
                Instalar Proteção
              </Button>
            </CardContent>
          </Card>
        )}

        {stage === 'permissions' && (
          <Card className="cyber-border bg-card/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-mono text-primary terminal-glow">
                Configurar Permissões de Segurança
              </CardTitle>
              <p className="text-muted-foreground">
                Autorize o acesso necessário para máxima proteção
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {permissions.map((permission) => {
                const isGranted = permissionsGranted.includes(permission.id);
                const IconComponent = permission.icon;
                
                return (
                  <div key={permission.id} className="flex items-center justify-between p-4 cyber-border rounded bg-card/20">
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-5 h-5 ${isGranted ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div>
                        <div className="font-medium text-foreground">{permission.name}</div>
                        <div className="text-sm text-muted-foreground">{permission.description}</div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={isGranted ? "default" : "outline"}
                      onClick={() => handlePermissionRequest(permission.id)}
                      disabled={isGranted}
                      className="cyber-border"
                    >
                      {isGranted ? "Autorizado" : "Autorizar"}
                    </Button>
                  </div>
                );
              })}
              
              {permissionsGranted.length === permissions.length && (
                <Button 
                  onClick={handleInstall}
                  className="w-full mt-6 cyber-border bg-primary/20 hover:bg-primary/30 text-primary border-primary"
                  size="lg"
                >
                  Finalizar Instalação
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {stage === 'installing' && (
          <Card className="cyber-border bg-card/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-mono text-primary terminal-glow">
                Instalando Proteção...
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl font-mono text-primary terminal-glow mb-4">
                  {Math.round(progress)}%
                </div>
                <Progress value={progress} className="cyber-border" />
              </div>
              
              <div className="space-y-2 text-sm font-mono text-muted-foreground">
                <div>Configurando módulos de segurança...</div>
                <div>Ativando criptografia...</div>
                <div>Estabelecendo conexão segura...</div>
                <div>Sincronizando dados...</div>
              </div>
            </CardContent>
          </Card>
        )}

        {stage === 'complete' && (
          <Card className="cyber-border bg-card/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary terminal-glow animate-pulse" />
              </div>
              <CardTitle className="text-2xl font-mono terminal-glow text-primary">
                Instalação Concluída!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <p className="text-foreground">
                Seu dispositivo agora está protegido com a mais avançada tecnologia de segurança.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="cyber-border p-3 rounded bg-primary/10">
                  <div className="text-primary font-mono">Status</div>
                  <div className="text-primary">ATIVO</div>
                </div>
                <div className="cyber-border p-3 rounded bg-primary/10">
                  <div className="text-primary font-mono">Proteção</div>
                  <div className="text-primary">100%</div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground font-mono">
                Sistema monitorando em tempo real...
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Alvo;