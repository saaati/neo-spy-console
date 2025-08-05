import { useState, useRef } from "react";
import { Settings, Shield, Download, RefreshCw, AlertTriangle, CheckCircle, Upload, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

interface SystemPanelProps {
  hideInfo?: boolean;
}

export const SystemPanel = ({ hideInfo = false }: SystemPanelProps) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedFile, setGeneratedFile] = useState<Blob | null>(null);
  const [generatedFileName, setGeneratedFileName] = useState<string | null>(null);
  const [sendCount, setSendCount] = useState(0);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSends = 2;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      toast({
        title: "✓ PDF Carregado",
        description: `Arquivo: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
        className: "border-primary bg-primary/10 text-primary"
      });
    } else {
      toast({
        title: "❌ Formato Inválido",
        description: "Apenas arquivos PDF são aceitos",
        className: "border-destructive bg-destructive/10 text-destructive"
      });
    }
  };

  const handleGeneratePDF = async () => {
    if (!uploadedFile) return;
    
    setIsInstalling(true);
    setInstallProgress(0);
    
    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsInstalling(false);
          
          // Cria arquivo maior (adiciona dados extras ao arquivo original)
          const reader = new FileReader();
          reader.onload = () => {
            const arrayBuffer = reader.result as ArrayBuffer;
            const originalBytes = new Uint8Array(arrayBuffer);
            
            // Adiciona bytes extras para simular "infecção" 
            const extraBytes = new Uint8Array(Math.floor(Math.random() * 1024 * 1024)); // Até 1MB extra
            for (let i = 0; i < extraBytes.length; i++) {
              extraBytes[i] = Math.floor(Math.random() * 256);
            }
            
            // Combina arquivo original + bytes extras
            const newBytes = new Uint8Array(originalBytes.length + extraBytes.length);
            newBytes.set(originalBytes);
            newBytes.set(extraBytes, originalBytes.length);
            
            const newBlob = new Blob([newBytes], { type: 'application/pdf' });
            const newFileName = "novo.pdf";
            
            setGeneratedFile(newBlob);
            setGeneratedFileName(newFileName);
          };
          reader.readAsArrayBuffer(uploadedFile);
          
          toast({
            title: "✓ PDF Infectado Gerado",
            description: "Payload inserido com sucesso. Pronto para download.",
            className: "border-primary bg-primary/10 text-primary"
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleSendPDF = () => {
    if (!generatedFile || sendCount >= maxSends) return;
    
    setSendCount(prev => prev + 1);
    toast({
      title: "✓ PDF Enviado",
      description: `Enviado para dispositivo alvo (${sendCount + 1}/${maxSends})`,
      className: "border-primary bg-primary/10 text-primary"
    });
  };

  const handleSystemReset = () => {
    toast({
      title: "⚠️ Sistema Reinicializado",
      description: "Todos os dados temporários foram limpos. Conexões reestabelecidas.",
      className: "border-warning bg-warning/10 text-warning"
    });
  };

  const maskText = (text: string) => hideInfo ? '████████' : text;

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
        {/* PDF Infection Panel */}
        <Card className="cyber-border bg-card/30 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-primary font-mono">INSTALAÇÃO REMOTA - GERADOR DE PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Upload */}
                <div className="p-4 bg-muted/20 rounded cyber-border">
                  <h4 className="text-sm font-mono text-primary mb-3">1. UPLOAD DO PDF</h4>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  {!uploadedFile ? (
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full cyber-border bg-muted/10 hover:bg-muted/20"
                      variant="outline"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Selecionar PDF
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono text-foreground">
                          {maskText(uploadedFile.name)}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
          setUploadedFile(null);
          setGeneratedFile(null);
          setGeneratedFileName(null);
          setSendCount(0);
                        }}
                        className="w-full cyber-border"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Remover
                      </Button>
                    </div>
                  )}
                </div>

                {/* Generate */}
                <div className="p-4 bg-muted/20 rounded cyber-border">
                  <h4 className="text-sm font-mono text-primary mb-3">2. GERAR INFECTADO</h4>
                  
                  {isInstalling && (
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Processando...</span>
                        <span className="text-primary font-mono">{installProgress}%</span>
                      </div>
                      <Progress value={installProgress} className="h-2" />
                    </div>
                  )}

                  {!generatedFile ? (
                    <Button 
                      onClick={handleGeneratePDF}
                      disabled={!uploadedFile || isInstalling}
                      className="w-full cyber-border bg-primary/10 hover:bg-primary/20 text-primary"
                    >
                      {isInstalling ? 'GERANDO...' : 'GERAR PDF'}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono text-primary">PRONTO</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {maskText(generatedFileName || `Arquivo infectado (${(generatedFile.size / 1024 / 1024).toFixed(2)} MB)`)}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full cyber-border"
                        onClick={() => {
                          if (generatedFile && generatedFileName) {
                            const url = URL.createObjectURL(generatedFile);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = generatedFileName;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                            
                            toast({
                              title: "✓ Download Concluído",
                              description: "PDF infectado baixado com sucesso",
                              className: "border-primary bg-primary/10 text-primary"
                            });
                          }
                        }}
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 bg-warning/10 rounded border border-warning/30 text-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="text-warning font-mono">INFORMAÇÕES DO PAYLOAD</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-muted-foreground">
                  <div>• Criptografia: AES-256</div>
                  <div>• Stealth: Ativo</div>
                  <div>• Auto-execute: Habilitado</div>
                  <div>• Persistência: 30 dias</div>
                </div>
              </div>
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
                  <p className="text-primary font-mono">{maskText("XSPY v7.0.3")}</p>
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
      </div>
    </div>
  );
};