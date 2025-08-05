import { FileText, CheckCircle, AlertCircle, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const systemLogs = [
  {
    id: 1,
    type: "success",
    action: "Foto capturada via câmera frontal",
    timestamp: "14:25:32",
    details: "Resolução: 1920x1080, Tamanho: 2.4MB"
  },
  {
    id: 2,
    type: "success",
    action: "Microfone ativado por 5 min",
    timestamp: "14:23:15",
    details: "Qualidade: 48kHz, Formato: WAV"
  },
  {
    id: 3,
    type: "info",
    action: "Alvo entrou em zona segura",
    timestamp: "14:20:08",
    details: "Localização: Av. Paulista, 1578 - São Paulo"
  },
  {
    id: 4,
    type: "success",
    action: "Nova mensagem interceptada",
    timestamp: "14:18:45",
    details: "WhatsApp - Maria Silva: 'Chegando em 10 minutos...'"
  },
  {
    id: 5,
    type: "warning",
    action: "Tentativa de conexão suspeita",
    timestamp: "14:15:23",
    details: "IP: 192.168.1.105, Protocolo: TCP"
  },
  {
    id: 6,
    type: "success",
    action: "Backup de dados realizado",
    timestamp: "14:10:12",
    details: "Tamanho: 156.7MB, Destino: Servidor Seguro"
  },
  {
    id: 7,
    type: "error",
    action: "Falha na conexão com câmera traseira",
    timestamp: "14:05:34",
    details: "Erro: Dispositivo não encontrado"
  },
  {
    id: 8,
    type: "info",
    action: "Sistema de rastreamento ativado",
    timestamp: "14:00:00",
    details: "Precisão GPS: ±2m, Modo: Alto desempenho"
  }
];

const getLogIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-primary" />;
    case "warning":
      return <AlertCircle className="w-4 h-4 text-warning" />;
    case "error":
      return <XCircle className="w-4 h-4 text-neon-red" />;
    default:
      return <Clock className="w-4 h-4 text-accent" />;
  }
};

const getLogColor = (type: string) => {
  switch (type) {
    case "success":
      return "border-primary/50 bg-primary/5";
    case "warning":
      return "border-warning/50 bg-warning/5";
    case "error":
      return "border-neon-red/50 bg-neon-red/5";
    default:
      return "border-accent/50 bg-accent/5";
  }
};

interface LogsPanelProps {
  hideInfo?: boolean;
}

export const LogsPanel = ({ hideInfo = false }: LogsPanelProps) => {
  const successCount = systemLogs.filter(log => log.type === "success").length;
  const warningCount = systemLogs.filter(log => log.type === "warning").length;
  const errorCount = systemLogs.filter(log => log.type === "error").length;

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <FileText className="w-6 h-6" />
          <span>LOGS DO SISTEMA</span>
        </h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="cyber-border text-primary">
            {successCount} SUCESSOS
          </Badge>
          <Badge variant="outline" className="cyber-border text-warning">
            {warningCount} AVISOS
          </Badge>
          <Badge variant="outline" className="cyber-border text-neon-red">
            {errorCount} ERROS
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Statistics */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono text-sm">ESTATÍSTICAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">Sucessos</span>
                  <span className="text-sm font-mono text-primary">{successCount}</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${(successCount / systemLogs.length) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">Avisos</span>
                  <span className="text-sm font-mono text-warning">{warningCount}</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full" style={{ width: `${(warningCount / systemLogs.length) * 100}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">Erros</span>
                  <span className="text-sm font-mono text-neon-red">{errorCount}</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-neon-red h-2 rounded-full" style={{ width: `${(errorCount / systemLogs.length) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground mb-2">Sistema</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="text-primary font-mono">2h 45m</span>
                </div>
                <div className="flex justify-between">
                  <span>CPU:</span>
                  <span className="text-primary font-mono">23%</span>
                </div>
                <div className="flex justify-between">
                  <span>RAM:</span>
                  <span className="text-primary font-mono">1.2GB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs List */}
        <div className="lg:col-span-3">
          <Card className="cyber-border bg-card/30 h-full">
            <CardHeader>
              <CardTitle className="text-primary font-mono">ATIVIDADE RECENTE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {systemLogs.map((log) => (
                  <div 
                    key={log.id}
                    className={`p-3 rounded border transition-all ${getLogColor(log.type)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getLogIcon(log.type)}
                        <span className="font-mono text-sm text-foreground">{log.action}</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-terminal-dim pl-6">{log.details}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-primary/5 rounded border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-primary">Auto-refresh ativo</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-xs text-terminal-dim">Atualizando a cada 5s</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};