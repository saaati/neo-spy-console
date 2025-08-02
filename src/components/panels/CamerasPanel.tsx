import { useState } from "react";
import { Camera, Play, Square, Maximize2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fakeCameras = [
  { id: 1, name: "Câmera Frontal", status: "online", quality: "1080p" },
  { id: 2, name: "Câmera Traseira", status: "online", quality: "720p" },
  { id: 3, name: "Webcam Principal", status: "offline", quality: "480p" },
  { id: 4, name: "Câmera Externa", status: "online", quality: "4K" },
];

export const CamerasPanel = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(1);

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <Camera className="w-6 h-6" />
          <span>SISTEMA DE CÂMERAS</span>
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-neon-red animate-pulse' : 'bg-muted'}`}></div>
          <span className="text-sm font-mono">
            {isRecording ? 'GRAVANDO' : 'STANDBY'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Main Camera View */}
        <div className="lg:col-span-2">
          <Card className="cyber-border bg-card/30 h-full">
            <CardHeader>
              <CardTitle className="text-primary font-mono flex items-center justify-between">
                <span>VISUALIZAÇÃO PRINCIPAL</span>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="cyber-border text-primary hover:bg-primary/10"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    {isRecording ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isRecording ? 'PARAR' : 'GRAVAR'}
                  </Button>
                  <Button size="sm" variant="outline" className="cyber-border text-primary hover:bg-primary/10">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 h-80 rounded cyber-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent scanlines"></div>
                <div className="text-center z-10">
                  <Eye className="w-16 h-16 text-primary mx-auto mb-4 cyber-glow" />
                  <p className="text-lg font-mono text-primary terminal-glow">SIMULAÇÃO DE FEED</p>
                  <p className="text-sm text-terminal-dim mt-2">Câmera Frontal - 1080p</p>
                  <div className="mt-4 text-xs text-neon-red font-mono animate-pulse">
                    ● REC {new Date().toLocaleTimeString()}
                  </div>
                </div>
                {/* Fake scan lines effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50"></div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Resolução:</span>
                  <p className="text-primary font-mono">1920x1080</p>
                </div>
                <div>
                  <span className="text-muted-foreground">FPS:</span>
                  <p className="text-primary font-mono">30</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Codec:</span>
                  <p className="text-primary font-mono">H.264</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Camera List */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">CÂMERAS DISPONÍVEIS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fakeCameras.map((camera) => (
                <div 
                  key={camera.id}
                  className={`p-3 rounded border cursor-pointer transition-all ${
                    selectedCamera === camera.id
                      ? 'border-primary/50 bg-primary/5 cyber-glow'
                      : 'border-border bg-muted/10 hover:border-primary/30'
                  }`}
                  onClick={() => setSelectedCamera(camera.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-foreground">{camera.name}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      camera.status === 'online' ? 'bg-primary animate-pulse' : 'bg-muted'
                    }`}></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Qualidade:</span>
                    <span className="text-primary font-mono">{camera.quality}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`font-mono ${
                      camera.status === 'online' ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {camera.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <Button 
                className="w-full cyber-border bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <Camera className="w-4 h-4 mr-2" />
                ATIVAR CÂMERA FRONTAL
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full cyber-border text-secondary hover:bg-secondary/10"
              >
                CAPTURAR SCREENSHOT
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};