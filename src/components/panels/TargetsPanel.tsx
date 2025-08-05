import { Users, Eye, MapPin, Clock, Phone, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const targets = [
  {
    id: 1,
    name: "Maria Silva",
    codename: "ALPHA-001",
    status: "online",
    lastSeen: "2 min atrás",
    location: "Av. Paulista, São Paulo",
    risk: "baixo",
    activities: {
      messages: 12,
      calls: 3,
      photos: 5
    }
  },
  {
    id: 2,
    name: "João Santos",
    codename: "BETA-002",
    status: "offline",
    lastSeen: "1h 23min atrás",
    location: "Shopping Ibirapuera",
    risk: "médio",
    activities: {
      messages: 8,
      calls: 1,
      photos: 2
    }
  },
  {
    id: 3,
    name: "Ana Costa",
    codename: "GAMMA-003",
    status: "online",
    lastSeen: "Agora",
    location: "Parque Villa-Lobos",
    risk: "alto",
    activities: {
      messages: 25,
      calls: 7,
      photos: 12
    }
  },
  {
    id: 4,
    name: "Carlos Mendes",
    codename: "DELTA-004",
    status: "away",
    lastSeen: "45 min atrás",
    location: "Aeroporto Congonhas",
    risk: "baixo",
    activities: {
      messages: 4,
      calls: 2,
      photos: 1
    }
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "text-primary";
    case "offline":
      return "text-muted-foreground";
    case "away":
      return "text-warning";
    default:
      return "text-muted-foreground";
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "alto":
      return "text-neon-red border-neon-red/50 bg-neon-red/10";
    case "médio":
      return "text-warning border-warning/50 bg-warning/10";
    case "baixo":
      return "text-primary border-primary/50 bg-primary/10";
    default:
      return "text-muted-foreground border-border bg-muted/10";
  }
};

interface TargetsPanelProps {
  hideInfo?: boolean;
}

export const TargetsPanel = ({ hideInfo = false }: TargetsPanelProps) => {
  const onlineTargets = targets.filter(t => t.status === "online").length;
  const highRiskTargets = targets.filter(t => t.risk === "alto").length;

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <Users className="w-6 h-6" />
          <span>ALVOS MONITORADOS</span>
        </h2>
        <div className="flex space-x-2">
          <Badge variant="outline" className="cyber-border text-primary">
            {onlineTargets} ONLINE
          </Badge>
          <Badge variant="outline" className="cyber-border text-neon-red">
            {highRiskTargets} ALTO RISCO
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {targets.map((target) => (
          <Card key={target.id} className="cyber-border bg-card/30 hover:bg-card/40 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground font-mono">{target.name}</CardTitle>
                  <p className="text-sm text-terminal-dim font-mono">{target.codename}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-mono ${getStatusColor(target.status)}`}>
                    {target.status.toUpperCase()}
                  </div>
                  <Badge variant="outline" className={`text-xs ${getRiskColor(target.risk)}`}>
                    RISCO {target.risk.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">{target.location}</span>
                </div>

                {/* Last Seen */}
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Última atividade: {target.lastSeen}</span>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
                  <div className="text-center">
                    <MessageSquare className="w-4 h-4 text-accent mx-auto mb-1" />
                    <div className="text-sm font-mono text-primary">{target.activities.messages}</div>
                    <div className="text-xs text-muted-foreground">Mensagens</div>
                  </div>
                  <div className="text-center">
                    <Phone className="w-4 h-4 text-warning mx-auto mb-1" />
                    <div className="text-sm font-mono text-primary">{target.activities.calls}</div>
                    <div className="text-xs text-muted-foreground">Chamadas</div>
                  </div>
                  <div className="text-center">
                    <Eye className="w-4 h-4 text-neon-red mx-auto mb-1" />
                    <div className="text-sm font-mono text-primary">{target.activities.photos}</div>
                    <div className="text-xs text-muted-foreground">Fotos</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="cyber-border text-primary hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Monitorar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="cyber-border text-accent hover:bg-accent/10"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Localizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="cyber-border bg-card/30 mt-6">
        <CardHeader>
          <CardTitle className="text-primary font-mono">RESUMO GERAL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-mono text-primary mb-1">{targets.length}</div>
              <div className="text-sm text-muted-foreground">Total de Alvos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-primary mb-1">{onlineTargets}</div>
              <div className="text-sm text-muted-foreground">Online Agora</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-primary mb-1">
                {targets.reduce((sum, t) => sum + t.activities.messages, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Mensagens Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono text-primary mb-1">
                {targets.reduce((sum, t) => sum + t.activities.photos, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Fotos Capturadas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};