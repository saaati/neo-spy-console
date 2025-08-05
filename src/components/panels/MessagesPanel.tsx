import { useState } from "react";
import { MessageSquare, Phone, Mail, Clock, Camera, Download, Eye, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Message {
  id: number;
  type: "whatsapp" | "sms" | "email" | "telegram";
  contact: string;
  number: string;
  time: string;
  message: string;
  unread: boolean;
  device: string;
  hasMedia?: boolean;
  mediaType?: "photo" | "video" | "document";
}

interface Conversation {
  contact: string;
  device: string;
  messages: Array<{
    id: number;
    sender: "user" | "contact";
    message: string;
    time: string;
    hasMedia?: boolean;
    mediaType?: "photo" | "video" | "document";
  }>;
}

interface MessagesPanelProps {
  hideInfo?: boolean;
}

export const MessagesPanel = ({ hideInfo = false }: MessagesPanelProps) => {
  const [selectedDevice, setSelectedDevice] = useState<string>('all');

  const devices = ['all', 'iPhone 15 Pro', 'Samsung S24', 'Xiaomi 14', 'OnePlus 12'];

  const fakeMessages: Message[] = [
    {
      id: 1,
      type: "whatsapp",
      contact: "Maria Silva",
      number: "+55 11 99999-8888",
      time: "14:25",
      message: "Chegando em 10 minutos. Estou no trânsito.",
      unread: true,
      device: "iPhone 15 Pro"
    },
    {
      id: 2,
      type: "sms",
      contact: "João Santos",
      number: "+55 11 98888-7777",
      time: "13:45",
      message: "Reunião cancelada. Reagendaremos para amanhã.",
      unread: false,
      device: "Samsung S24"
    },
    {
      id: 3,
      type: "whatsapp",
      contact: "Ana Costa",
      number: "+55 11 97777-6666",
      time: "12:30",
      message: "📸 Foto",
      unread: true,
      device: "Xiaomi 14",
      hasMedia: true,
      mediaType: "photo"
    },
    {
      id: 4,
      type: "telegram",
      contact: "Carlos Mendes",
      number: "@carlosm",
      time: "11:50",
      message: "Vamos nos encontrar hoje?",
      unread: true,
      device: "OnePlus 12"
    },
    {
      id: 5,
      type: "whatsapp",
      contact: "Patricia Lima",
      number: "+55 11 94444-3333",
      time: "11:15",
      message: "🎥 Vídeo",
      unread: false,
      device: "iPhone 15 Pro",
      hasMedia: true,
      mediaType: "video"
    },
    {
      id: 6,
      type: "email",
      contact: "banco@secure.com",
      number: "no-reply@banco.com",
      time: "10:30",
      message: "Seu extrato mensal está disponível. Acesse sua conta para visualizar.",
      unread: false,
      device: "Samsung S24"
    }
  ];

  const conversations: Conversation[] = [
    {
      contact: "Maria Silva",
      device: "iPhone 15 Pro",
      messages: [
        { id: 1, sender: "contact", message: "Oi! Como você está?", time: "14:20" },
        { id: 2, sender: "user", message: "Tudo bem! E você?", time: "14:21" },
        { id: 3, sender: "contact", message: "Bem também! Vou aí hoje", time: "14:22" },
        { id: 4, sender: "contact", message: "Chegando em 10 minutos. Estou no trânsito.", time: "14:25" }
      ]
    },
    {
      contact: "Ana Costa",
      device: "Xiaomi 14",
      messages: [
        { id: 1, sender: "contact", message: "Você viu as notícias?", time: "12:25" },
        { id: 2, sender: "contact", message: "📸 Foto", time: "12:28", hasMedia: true, mediaType: "photo" },
        { id: 3, sender: "contact", message: "Preciso conversar com você urgente!", time: "12:30" }
      ]
    }
  ];

  const recentCalls = [
    { contact: "Carlos Mendes", number: "+55 11 96666-5555", time: "14:10", duration: "3:24", type: "incoming", device: "OnePlus 12" },
    { contact: "Desconhecido", number: "+55 11 95555-4444", time: "13:22", duration: "0:12", type: "missed", device: "Samsung S24" },
    { contact: "Patricia Lima", number: "+55 11 94444-3333", time: "12:45", duration: "8:45", type: "outgoing", device: "iPhone 15 Pro" },
    { contact: "Maria Silva", number: "+55 11 99999-8888", time: "11:30", duration: "5:12", type: "incoming", device: "iPhone 15 Pro" }
  ];

  const filteredMessages = selectedDevice === 'all' 
    ? fakeMessages 
    : fakeMessages.filter(msg => msg.device === selectedDevice);

  const filteredCalls = selectedDevice === 'all' 
    ? recentCalls 
    : recentCalls.filter(call => call.device === selectedDevice);

  const maskText = (text: string) => hideInfo ? '████████' : text;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return <MessageSquare className="w-4 h-4 text-green-400" />;
      case 'telegram': return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case 'sms': return <Phone className="w-4 h-4 text-accent" />;
      case 'email': return <Mail className="w-4 h-4 text-warning" />;
      default: return <MessageSquare className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <MessageSquare className="w-6 h-6" />
          <span>INTERCEPTAÇÃO DE MENSAGENS</span>
        </h2>
        <div className="flex items-center space-x-4">
          <Badge className="bg-primary/20 text-primary border-primary cyber-glow">
            {filteredMessages.filter(m => m.unread).length} NÃO LIDAS
          </Badge>
          <Badge className="bg-accent/20 text-accent border-accent">
            <Users className="w-3 h-3 mr-1" />
            {devices.length - 1} DISPOSITIVOS
          </Badge>
        </div>
      </div>

      {/* Device Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {devices.map((device) => (
            <Button
              key={device}
              variant={selectedDevice === device ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDevice(device)}
              className="cyber-border"
            >
              {device === 'all' ? 'TODOS' : maskText(device)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Messages */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">MENSAGENS INTERCEPTADAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`p-3 rounded border transition-all ${
                    msg.unread 
                      ? 'border-primary/50 bg-primary/5 cyber-glow' 
                      : 'border-border bg-muted/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(msg.type)}
                      <span className="font-mono text-sm text-foreground">
                        {maskText(msg.contact)}
                      </span>
                      {msg.hasMedia && (
                        <Badge className="text-xs bg-orange-500/20 text-orange-400 border-orange-500/30">
                          <Camera className="w-3 h-3 mr-1" />
                          MÍDIA
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">{msg.time}</span>
                      {msg.unread && <div className="w-2 h-2 bg-neon-red rounded-full animate-pulse"></div>}
                    </div>
                  </div>
                  <p className="text-xs text-terminal-dim font-mono mb-1">
                    {maskText(msg.number)} • {maskText(msg.device)}
                  </p>
                  <p className="text-sm text-foreground">{msg.message}</p>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <div className="flex text-xs space-x-4">
                      <div>
                        <span className="text-muted-foreground">Tipo:</span>
                        <span className="text-primary font-mono uppercase ml-1">{msg.type}</span>
                      </div>
                    </div>
                    
                    {conversations.find(c => c.contact === msg.contact) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="cyber-border">
                            <Eye className="w-3 h-3 mr-1" />
                            Conversa
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="cyber-border bg-card/90 backdrop-blur-sm max-w-md">
                          <DialogHeader>
                            <DialogTitle className="text-primary font-mono">
                              {maskText(msg.contact)} • {maskText(msg.device)}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {conversations.find(c => c.contact === msg.contact)?.messages.map((chatMsg) => (
                              <div
                                key={chatMsg.id}
                                className={`p-2 rounded text-sm ${
                                  chatMsg.sender === 'user'
                                    ? 'bg-primary/20 text-primary ml-8'
                                    : 'bg-muted/20 text-foreground mr-8'
                                }`}
                              >
                                <div className="font-mono text-xs text-muted-foreground mb-1">
                                  {chatMsg.sender === 'user' ? 'Você' : maskText(msg.contact)} • {chatMsg.time}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {chatMsg.hasMedia && <Camera className="w-3 h-3" />}
                                  <span>{chatMsg.message}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Calls */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">REGISTRO DE CHAMADAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCalls.map((call, index) => (
                <div 
                  key={index}
                  className="p-3 rounded border border-border bg-muted/10 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-foreground">
                      {maskText(call.contact)}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${
                      call.type === 'incoming' ? 'bg-primary' : 
                      call.type === 'outgoing' ? 'bg-accent' : 'bg-neon-red'
                    }`}></div>
                  </div>
                  <p className="text-xs text-terminal-dim font-mono mb-1">
                    {maskText(call.number)} • {maskText(call.device)}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Horário:</span>
                      <span className="text-primary font-mono ml-1">{call.time}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duração:</span>
                      <span className="text-primary font-mono ml-1">{call.duration}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className={`font-mono uppercase ${
                      call.type === 'incoming' ? 'text-primary' : 
                      call.type === 'outgoing' ? 'text-accent' : 'text-neon-red'
                    }`}>
                      {call.type === 'incoming' ? 'RECEBIDA' : 
                       call.type === 'outgoing' ? 'REALIZADA' : 'PERDIDA'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-3 bg-primary/5 rounded border border-primary/20">
              <h4 className="text-sm font-mono text-primary mb-2">ESTATÍSTICAS</h4>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Total hoje:</span>
                  <p className="text-primary font-mono">{filteredCalls.length} chamadas</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Dispositivos ativos:</span>
                  <p className="text-primary font-mono">{selectedDevice === 'all' ? devices.length - 1 : 1}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};