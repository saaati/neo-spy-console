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

interface MicrophonePanelProps {
  hideInfo?: boolean;
}

export const MicrophonePanel = ({ hideInfo = false }: MicrophonePanelProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listeningLogs, setListeningLogs] = useState<{id: string, action: string, timestamp: string, device: string}[]>([]);
  const [recordings, setRecordings] = useState(fakeRecordings);
  const [audioLevel] = useState(65);

  const maskText = (text: string) => hideInfo ? '████████' : text;

  const toggleListening = () => {
    const newState = !isListening;
    setIsListening(newState);
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { hour12: false });
    const action = newState ? 'INICIADA' : 'PARADA';
    
    setListeningLogs(prev => [{
      id: Date.now().toString(),
      action: `ESCUTA ${action}`,
      timestamp: timeString,
      device: 'Microfone Principal'
    }, ...prev].slice(0, 10)); // Keep only last 10 logs
    
    // When stopping listening, add a new recording
    if (!newState) {
      const newRecording = {
        id: recordings.length + 1,
        name: `audio_capture_${String(recordings.length + 1).padStart(3, '0')}.wav`,
        duration: `${Math.floor(Math.random() * 3)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
        timestamp: timeString
      };
      setRecordings(prev => [newRecording, ...prev]);
    }
  };

  return (
    <div className="p-3 md:p-6 h-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <Mic className="w-5 h-5 md:w-6 md:h-6" />
          <span>ESCUTA REMOTA</span>
        </h2>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-neon-red animate-pulse' : 'bg-muted'}`}></div>
          <span className="text-xs md:text-sm font-mono">
            {isListening ? 'ESCUTANDO' : 'STANDBY'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 h-full">
        {/* Main Control Panel */}
        <Card className="cyber-border bg-card/30 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-primary font-mono text-lg">CONTROLE DE ÁUDIO</CardTitle>
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
                  className={`cyber-border h-10 md:h-12 text-xs md:text-sm ${
                    isListening 
                      ? 'bg-secondary/20 hover:bg-secondary/30 text-secondary' 
                      : 'bg-primary/10 hover:bg-primary/20 text-primary'
                  }`}
                  onClick={toggleListening}
                >
                  {isListening ? <Square className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" /> : <Mic className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />}
                  {isListening ? 'PARAR ESCUTA' : 'INICIAR ESCUTA'}
                </Button>

                <Button 
                  variant="outline" 
                  className="cyber-border h-10 md:h-12 text-xs md:text-sm text-accent hover:bg-accent/10"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Square className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" /> : <Play className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />}
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
          <CardHeader className="pb-3">
            <CardTitle className="text-primary font-mono text-lg">GRAVAÇÕES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
              {recordings.slice(0, 5).map((recording) => (
                <div 
                  key={recording.id}
                  className="p-2 rounded border border-border bg-muted/10 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-3 h-3 text-primary" />
                      <span className="font-mono text-xs text-foreground">{maskText(recording.name)}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-5 w-5 p-0 cyber-border">
                      <Download className="w-2 h-2" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div>
                      <span className="text-muted-foreground">Duração:</span>
                      <p className="text-primary font-mono text-xs">{recording.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capturado:</span>
                      <p className="text-primary font-mono text-xs">{recording.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="cyber-border bg-card/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-primary font-mono text-lg">LOG DE ATIVIDADES</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
              {listeningLogs.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Nenhuma atividade registrada</p>
              ) : (
                listeningLogs.map((log) => (
                  <div key={log.id} className="p-2 rounded border border-border/50 bg-muted/5">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono text-primary">{log.action}</span>
                      <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{maskText(log.device)}</div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};