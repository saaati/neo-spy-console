import { useState } from "react";
import { Mic, Play, Square, Volume2, Download, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const fakeRecordings = [
  { id: 1, name: "audio_capture_001.wav", duration: "0:45", size: "2.1 MB", timestamp: "14:23:15" },
  { id: 2, name: "audio_capture_002.wav", duration: "1:32", size: "3.8 MB", timestamp: "13:45:32" },
  { id: 3, name: "audio_capture_003.wav", duration: "0:28", size: "1.5 MB", timestamp: "12:30:18" },
  { id: 4, name: "audio_capture_004.wav", duration: "2:15", size: "5.2 MB", timestamp: "11:15:44" },
];

export const MicrophonePanel = () => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLevel] = useState(65);

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <Mic className="w-6 h-6" />
          <span>ESCUTA REMOTA</span>
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-neon-red animate-pulse' : 'bg-muted'}`}></div>
          <span className="text-sm font-mono">
            {isListening ? 'ESCUTANDO' : 'STANDBY'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Main Control Panel */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">CONTROLE DE ÁUDIO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Audio Visualizer */}
              <div className="bg-muted/20 h-32 rounded cyber-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                <div className="flex items-end space-x-1 z-10">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 bg-primary transition-all duration-200 ${
                        isListening ? 'animate-pulse' : ''
                      }`}
                      style={{
                        height: `${Math.random() * (isListening ? 60 : 10) + 10}px`,
                        opacity: isListening ? Math.random() * 0.8 + 0.2 : 0.3
                      }}
                    />
                  ))}
                </div>
                {!isListening && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Activity className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Audio Level */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Nível de Áudio:</span>
                  <span className="text-primary font-mono">{audioLevel}%</span>
                </div>
                <Progress value={audioLevel} className="h-2" />
              </div>

              {/* Controls */}
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  className={`cyber-border h-12 ${
                    isListening 
                      ? 'bg-secondary/20 hover:bg-secondary/30 text-secondary' 
                      : 'bg-primary/10 hover:bg-primary/20 text-primary'
                  }`}
                  onClick={() => setIsListening(!isListening)}
                >
                  {isListening ? <Square className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
                  {isListening ? 'PARAR ESCUTA' : 'INICIAR ESCUTA'}
                </Button>

                <Button 
                  variant="outline" 
                  className="cyber-border h-12 text-accent hover:bg-accent/10"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Square className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {isPlaying ? 'PARAR' : 'REPRODUZIR'}
                </Button>
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Qualidade:</span>
                  <p className="text-primary font-mono">48kHz/16bit</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Codec:</span>
                  <p className="text-primary font-mono">WAV</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Sensibilidade:</span>
                  <p className="text-primary font-mono">Alta</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Filtro Ruído:</span>
                  <p className="text-primary font-mono">Ativo</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recordings List */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">GRAVAÇÕES CAPTURADAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {fakeRecordings.map((recording) => (
                <div 
                  key={recording.id}
                  className="p-3 rounded border border-border bg-muted/10 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-primary" />
                      <span className="font-mono text-sm text-foreground">{recording.name}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-6 w-6 p-0 cyber-border">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Duração:</span>
                      <p className="text-primary font-mono">{recording.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Tamanho:</span>
                      <p className="text-primary font-mono">{recording.size}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capturado:</span>
                      <p className="text-primary font-mono">{recording.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-primary/5 rounded border border-primary/20">
              <h4 className="text-sm font-mono text-primary mb-2">ESTATÍSTICAS DE CAPTURA</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Total hoje:</span>
                  <p className="text-primary font-mono">12 gravações</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tempo total:</span>
                  <p className="text-primary font-mono">45m 23s</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Espaço usado:</span>
                  <p className="text-primary font-mono">156.7 MB</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Última atividade:</span>
                  <p className="text-primary font-mono">2 min atrás</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};