import { useState } from "react";
import { Users, Eye, MapPin, Clock, Phone, MessageSquare, Edit2, Monitor, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [editingTarget, setEditingTarget] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [monitoringTarget, setMonitoringTarget] = useState<typeof targets[0] | null>(null);
  const [targetsData, setTargetsData] = useState(targets);
  
  const onlineTargets = targetsData.filter(t => t.status === "online").length;
  const highRiskTargets = targetsData.filter(t => t.risk === "alto").length;

  const handleEditName = (target: typeof targets[0]) => {
    setEditingTarget(target.id);
    setEditName(target.name);
  };

  const handleSaveName = () => {
    if (editingTarget) {
      setTargetsData(prev => prev.map(target => 
        target.id === editingTarget ? { ...target, name: editName } : target
      ));
      setEditingTarget(null);
    }
  };

  const handleMonitor = (target: typeof targets[0]) => {
    setMonitoringTarget(target);
  };

  const handleLocalize = (target: typeof targets[0]) => {
    // Open location in map - you can integrate with Leaflet here
    console.log("Localizing target:", target.name, "at", target.location);
    // For now, just show an alert
    alert(`Localizando ${target.name} em ${target.location}`);
  };

  const maskText = (text: string) => hideInfo ? '████████' : text;

  return (
    <div className="p-3 md:p-6 h-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <Users className="w-5 h-5 md:w-6 md:h-6" />
          <span>ALVOS MONITORADOS</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cyber-border text-primary text-xs">
            {onlineTargets} ONLINE
          </Badge>
          <Badge variant="outline" className="cyber-border text-neon-red text-xs">
            {highRiskTargets} ALTO RISCO
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {targetsData.map((target) => (
          <Card key={target.id} className="cyber-border bg-card/30 hover:bg-card/40 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-cover bg-center" 
                       style={{backgroundImage: 'url(https://i.pinimg.com/736x/fa/25/b5/fa25b56f831a5d8cdd2040179fc6b4f3.jpg)'}}></div>
                  <div>
                    <div className="flex items-center gap-2">
                      {editingTarget === target.id ? (
                        <Input 
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onBlur={handleSaveName}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                          className="h-6 text-sm bg-transparent border-primary text-foreground"
                          autoFocus
                        />
                      ) : (
                        <CardTitle className="text-base md:text-lg text-foreground font-mono">{maskText(target.name)}</CardTitle>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditName(target)}
                        className="p-1 h-6 w-6"
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-xs md:text-sm text-terminal-dim font-mono">{target.codename}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs md:text-sm font-mono ${getStatusColor(target.status)}`}>
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
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                  <span className="text-xs md:text-sm text-foreground">{maskText(target.location)}</span>
                </div>

                {/* Last Seen */}
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
                  <span className="text-xs md:text-sm text-muted-foreground">Última atividade: {target.lastSeen}</span>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-3 gap-2 md:gap-3 pt-2 border-t border-border">
                  <div className="text-center">
                    <MessageSquare className="w-3 h-3 md:w-4 md:h-4 text-accent mx-auto mb-1" />
                    <div className="text-xs md:text-sm font-mono text-primary">{target.activities.messages}</div>
                    <div className="text-xs text-muted-foreground">Mensagens</div>
                  </div>
                  <div className="text-center">
                    <Phone className="w-3 h-3 md:w-4 md:h-4 text-warning mx-auto mb-1" />
                    <div className="text-xs md:text-sm font-mono text-primary">{target.activities.calls}</div>
                    <div className="text-xs text-muted-foreground">Chamadas</div>
                  </div>
                  <div className="text-center">
                    <Eye className="w-3 h-3 md:w-4 md:h-4 text-neon-red mx-auto mb-1" />
                    <div className="text-xs md:text-sm font-mono text-primary">{target.activities.photos}</div>
                    <div className="text-xs text-muted-foreground">Fotos</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="cyber-border text-primary hover:bg-primary/10 text-xs"
                        onClick={() => handleMonitor(target)}
                      >
                        <Monitor className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        Monitorar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="cyber-border bg-card">
                      <DialogHeader>
                        <DialogTitle className="text-primary font-mono">
                          MONITORAMENTO - {target.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-cover bg-center" 
                               style={{backgroundImage: 'url(https://i.pinimg.com/736x/fa/25/b5/fa25b56f831a5d8cdd2040179fc6b4f3.jpg)'}}></div>
                          <div>
                            <h3 className="font-mono text-foreground">{target.name}</h3>
                            <p className="text-sm text-terminal-dim">{target.codename}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-primary">Status</Label>
                            <p className={`font-mono ${getStatusColor(target.status)}`}>{target.status.toUpperCase()}</p>
                          </div>
                          <div>
                            <Label className="text-primary">Risco</Label>
                            <p className={`font-mono ${getRiskColor(target.risk).split(' ')[0]}`}>{target.risk.toUpperCase()}</p>
                          </div>
                          <div>
                            <Label className="text-primary">Localização</Label>
                            <p className="text-sm text-foreground">{target.location}</p>
                          </div>
                          <div>
                            <Label className="text-primary">Última Atividade</Label>
                            <p className="text-sm text-foreground">{target.lastSeen}</p>
                          </div>
                        </div>
                        <div className="border-t border-border pt-4">
                          <Label className="text-primary">Atividades Recentes</Label>
                          <div className="grid grid-cols-3 gap-4 mt-2">
                            <div className="text-center p-2 border border-border rounded">
                              <MessageSquare className="w-4 h-4 text-accent mx-auto mb-1" />
                              <div className="text-sm font-mono text-primary">{target.activities.messages}</div>
                              <div className="text-xs text-muted-foreground">Mensagens</div>
                            </div>
                            <div className="text-center p-2 border border-border rounded">
                              <Phone className="w-4 h-4 text-warning mx-auto mb-1" />
                              <div className="text-sm font-mono text-primary">{target.activities.calls}</div>
                              <div className="text-xs text-muted-foreground">Chamadas</div>
                            </div>
                            <div className="text-center p-2 border border-border rounded">
                              <Eye className="w-4 h-4 text-neon-red mx-auto mb-1" />
                              <div className="text-sm font-mono text-primary">{target.activities.photos}</div>
                              <div className="text-xs text-muted-foreground">Fotos</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="cyber-border text-accent hover:bg-accent/10 text-xs"
                    onClick={() => handleLocalize(target)}
                  >
                    <Navigation className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    Localizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="cyber-border bg-card/30 mt-4 md:mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary font-mono text-lg">RESUMO GERAL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-mono text-primary mb-1">{targetsData.length}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Total de Alvos</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-mono text-primary mb-1">{onlineTargets}</div>
              <div className="text-xs md:text-sm text-muted-foreground">Online Agora</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-mono text-primary mb-1">
                {targetsData.reduce((sum, t) => sum + t.activities.messages, 0)}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">Mensagens Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-mono text-primary mb-1">
                {targetsData.reduce((sum, t) => sum + t.activities.photos, 0)}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">Fotos Capturadas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};