import { useState } from "react";
import { MapPin, Navigation, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fakeLocations = [
  { time: "14:23:15", location: "Av. Paulista, 1578 - São Paulo, SP", coordinates: "-23.5614, -46.6558" },
  { time: "13:45:32", location: "Shopping Ibirapuera - São Paulo, SP", coordinates: "-23.5975, -46.6522" },
  { time: "12:30:18", location: "Parque Villa-Lobos - São Paulo, SP", coordinates: "-23.5453, -46.7208" },
  { time: "11:15:44", location: "Aeroporto de Congonhas - São Paulo, SP", coordinates: "-23.6267, -46.6563" },
];

interface LocationPanelProps {
  hideInfo?: boolean;
}

export const LocationPanel = ({ hideInfo = false }: LocationPanelProps) => {
  const [isTracking, setIsTracking] = useState(true);
  const [currentLocation] = useState(fakeLocations[0]);

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <MapPin className="w-6 h-6" />
          <span>RASTREAMENTO DE LOCALIZAÇÃO</span>
        </h2>
        <div className="flex items-center space-x-2">
          <Target className={`w-5 h-5 ${isTracking ? 'text-primary pulse-green' : 'text-muted-foreground'}`} />
          <span className="text-sm font-mono">
            {isTracking ? 'TRACKING ACTIVE' : 'TRACKING OFFLINE'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Map Area */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">MAPA ATUAL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/20 h-64 rounded cyber-border flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              <div className="text-center z-10">
                <MapPin className="w-12 h-12 text-neon-red mx-auto mb-2 pulse-green" />
                <p className="text-sm font-mono text-terminal">ALVO DETECTADO</p>
                <p className="text-xs text-terminal-dim mt-1">{currentLocation.coordinates}</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="w-3 h-3 bg-neon-red rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Precisão:</span>
                <span className="text-sm text-primary font-mono">GPS HIGH (±2m)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Velocidade:</span>
                <span className="text-sm text-primary font-mono">15 km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Direção:</span>
                <span className="text-sm text-primary font-mono">NE (045°)</span>
              </div>
            </div>

            <Button 
              className="w-full mt-4 cyber-border bg-primary/10 hover:bg-primary/20 text-primary"
              onClick={() => setIsTracking(!isTracking)}
            >
              <Navigation className="w-4 h-4 mr-2" />
              {isTracking ? 'PAUSAR RASTREAMENTO' : 'INICIAR RASTREAMENTO'}
            </Button>
          </CardContent>
        </Card>

        {/* Location History */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">HISTÓRICO DE LOCALIZAÇÕES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {fakeLocations.map((loc, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded border transition-all ${
                    index === 0 
                      ? 'border-primary/50 bg-primary/5 cyber-glow' 
                      : 'border-border bg-muted/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-mono text-sm text-primary">{loc.time}</span>
                    </div>
                    {index === 0 && (
                      <span className="text-xs text-neon-red font-mono animate-pulse">ATUAL</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground mb-1">{loc.location}</p>
                  <p className="text-xs text-terminal-dim font-mono">{loc.coordinates}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};