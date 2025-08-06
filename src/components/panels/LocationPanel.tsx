import { useState } from "react";
import { MapPin, Navigation, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "@/components/Map";

const fakeLocations = [
  { time: "14:23:15", location: "Av. Paulista, 1578 - São Paulo, SP", coordinates: "-23.5614, -46.6558", lat: -23.5614, lng: -46.6558 },
  { time: "13:45:32", location: "Shopping Ibirapuera - São Paulo, SP", coordinates: "-23.5975, -46.6522", lat: -23.5975, lng: -46.6522 },
  { time: "12:30:18", location: "Parque Villa-Lobos - São Paulo, SP", coordinates: "-23.5453, -46.7208", lat: -23.5453, lng: -46.7208 },
  { time: "11:15:44", location: "Aeroporto de Congonhas - São Paulo, SP", coordinates: "-23.6267, -46.6563", lat: -23.6267, lng: -46.6563 },
];

interface LocationPanelProps {
  hideInfo?: boolean;
}

export const LocationPanel = ({ hideInfo = false }: LocationPanelProps) => {
  const [isTracking, setIsTracking] = useState(true);
  const [currentLocation] = useState(fakeLocations[0]);

  // Prepare markers for the map
  const mapMarkers = fakeLocations.map((loc, index) => ({
    position: [loc.lat, loc.lng] as [number, number],
    popup: `<div class="text-center">
              <div class="font-bold text-primary">${loc.time}</div>
              <div class="text-sm">${loc.location}</div>
              <div class="text-xs text-terminal-dim">${loc.coordinates}</div>
            </div>`,
    isTarget: index === 0 // First location is the target
  }));

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <MapPin className="w-6 h-6" />
          <span>RASTREAMENTO DE LOCALIZAÇÃO</span>
        </h2>
        <div className="flex items-center space-x-2">
          <Target className={`w-5 h-5 ${isTracking ? 'text-primary pulse-green' : 'text-muted-foreground'}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Map Area */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">MAPA ATUAL</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-80 w-full">
              <Map 
                center={[currentLocation.lat, currentLocation.lng]}
                zoom={12}
                markers={mapMarkers}
                className="border-2 border-primary/30"
              />
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-card/30 p-3 rounded-lg border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">Precisão GPS</div>
                <div className="text-sm text-primary font-mono font-bold">HIGH (±2m)</div>
              </div>
              <div className="bg-card/30 p-3 rounded-lg border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">Velocidade</div>
                <div className="text-sm text-primary font-mono font-bold">15 km/h</div>
              </div>
              <div className="bg-card/30 p-3 rounded-lg border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">Direção</div>
                <div className="text-sm text-primary font-mono font-bold">NE (045°)</div>
              </div>
              <div className="bg-card/30 p-3 rounded-lg border border-primary/20">
                <div className="text-xs text-muted-foreground mb-1">Satélites</div>
                <div className="text-sm text-primary font-mono font-bold">12/12</div>
              </div>
            </div>

            <Button 
              variant="cyber"
              className="w-full mt-4 font-mono tracking-wide"
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