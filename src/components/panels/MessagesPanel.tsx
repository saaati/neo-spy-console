import { useState } from "react";
import { MessageSquare, Phone, Mail, Clock, Camera, Download, Eye, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

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
      type: "telegram",
      contact: "Roberto Carlos",
      number: "@roberto_c",
      time: "10:30",
      message: "Documentos importantes enviados",
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
      contact: "João Santos",
      device: "Samsung S24",
      messages: [
        { id: 1, sender: "contact", message: "A reunião de hoje foi cancelada", time: "13:40" },
        { id: 2, sender: "user", message: "Por que foi cancelada?", time: "13:42" },
        { id: 3, sender: "contact", message: "Reunião cancelada. Reagendaremos para amanhã.", time: "13:45" }
      ]
    },
    {
      contact: "Carlos Mendes",
      device: "OnePlus 12",
      messages: [
        { id: 1, sender: "contact", message: "E aí, como foi o final de semana?", time: "11:45" },
        { id: 2, sender: "user", message: "Foi ótimo! E o seu?", time: "11:48" },
        { id: 3, sender: "contact", message: "Vamos nos encontrar hoje?", time: "11:50" }
      ]
    },
    {
      contact: "Ana Costa",
      device: "Xiaomi 14",
      messages: [
        { id: 1, sender: "contact", message: "Olha essa foto que tirei!", time: "12:28" },
        { id: 2, sender: "contact", message: "📸 Foto", time: "12:30", hasMedia: true, mediaType: "photo" }
      ]
    }
  ];

  const findConversation = (contact: string) => {
    return conversations.find(conv => conv.contact === contact);
  };

  const recentCalls = [
    { contact: "Carlos Mendes", number: "+55 11 96666-5555", time: "14:10", duration: "3:24", type: "incoming", device: "OnePlus 12" },
    { contact: "Desconhecido", number: "+55 11 95555-4444", time: "13:22", duration: "0:12", type: "missed", device: "Samsung S24" },
    { contact: "Patricia Lima", number: "+55 11 94444-3333", time: "12:45", duration: "8:45", type: "outgoing", device: "iPhone 15 Pro" }
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
      case 'whatsapp': return <span className="text-green-400">💬</span>;
      case 'telegram': return <span className="text-blue-400">✈️</span>;
      case 'sms': return <Phone className="w-4 h-4 text-accent" />;
      case 'email': return <Mail className="w-4 h-4 text-warning" />;
      default: return <MessageSquare className="w-4 h-4 text-primary" />;
    }
  };

  const getMessagesByType = (type: string) => {
    return filteredMessages.filter(msg => msg.type === type);
  };

  return (
    <div className="p-3 md:p-6 h-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />
          <span>INTERCEPTAÇÃO DE MENSAGENS</span>
        </h2>
        <div className="flex items-center space-x-2 md:space-x-4">
          <Badge className="bg-primary/20 text-primary border-primary cyber-glow text-xs">
            {filteredMessages.filter(m => m.unread).length} NÃO LIDAS
          </Badge>
        </div>
      </div>

      <div className="mb-4 md:mb-6">
        <div className="flex flex-wrap gap-2">
          {devices.map((device) => (
            <Button
              key={device}
              variant={selectedDevice === device ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDevice(device)}
              className="cyber-border text-xs"
            >
              {device === 'all' ? 'TODOS' : maskText(device)}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
        <Card className="cyber-border bg-card/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-primary font-mono text-lg">MENSAGENS INTERCEPTADAS</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="whatsapp" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="whatsapp" className="text-xs">💬 WhatsApp</TabsTrigger>
                <TabsTrigger value="telegram" className="text-xs">✈️ Telegram</TabsTrigger>
                <TabsTrigger value="sms" className="text-xs">📱 SMS</TabsTrigger>
              </TabsList>
              
              <TabsContent value="whatsapp" className="mt-0">
                <div className="space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
                  {getMessagesByType('whatsapp').map((msg) => (
                    <Dialog key={msg.id}>
                      <DialogTrigger asChild>
                        <div className="border border-green-500/20 rounded p-3 hover:bg-green-500/5 transition-colors cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full" style={{backgroundImage: 'url(https://i.pinimg.com/736x/fa/25/b5/fa25b56f831a5d8cdd2040179fc6b4f3.jpg)', backgroundSize: 'cover'}}></div>
                              <span className="text-sm font-medium text-green-400">{maskText(msg.contact)}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <div className="text-sm text-foreground">{msg.message}</div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="cyber-border bg-card/90 backdrop-blur-sm max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-green-400 flex items-center gap-2">
                            💬 {maskText(msg.contact)}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {findConversation(msg.contact)?.messages.map((convMsg) => (
                            <div key={convMsg.id} className={`flex ${convMsg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[70%] p-3 rounded-lg ${
                                convMsg.sender === 'user' 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-muted text-foreground'
                              }`}>
                                <div className="text-sm">{convMsg.message}</div>
                                <div className="text-xs opacity-70 mt-1">{convMsg.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="telegram" className="mt-0">
                <div className="space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
                  {getMessagesByType('telegram').map((msg) => (
                    <Dialog key={msg.id}>
                      <DialogTrigger asChild>
                        <div className="border border-blue-500/20 rounded p-3 hover:bg-blue-500/5 transition-colors cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">✈️</div>
                              <span className="text-sm font-medium text-blue-400">{maskText(msg.contact)}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <div className="text-sm text-foreground">{msg.message}</div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="cyber-border bg-card/90 backdrop-blur-sm max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-blue-400 flex items-center gap-2">
                            ✈️ {maskText(msg.contact)}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {findConversation(msg.contact)?.messages.map((convMsg) => (
                            <div key={convMsg.id} className={`flex ${convMsg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[70%] p-3 rounded-lg ${
                                convMsg.sender === 'user' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-muted text-foreground'
                              }`}>
                                <div className="text-sm">{convMsg.message}</div>
                                <div className="text-xs opacity-70 mt-1">{convMsg.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="sms" className="mt-0">
                <div className="space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
                  {getMessagesByType('sms').map((msg) => (
                    <Dialog key={msg.id}>
                      <DialogTrigger asChild>
                        <div className="border border-primary/20 rounded p-3 hover:bg-primary/5 transition-colors cursor-pointer">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium text-primary">{maskText(msg.contact)}</span>
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                          </div>
                          <div className="text-sm text-foreground">{msg.message}</div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="cyber-border bg-card/90 backdrop-blur-sm max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-primary flex items-center gap-2">
                            📱 {maskText(msg.contact)}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {findConversation(msg.contact)?.messages.map((convMsg) => (
                            <div key={convMsg.id} className={`flex ${convMsg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[70%] p-3 rounded-lg ${
                                convMsg.sender === 'user' 
                                  ? 'bg-primary text-white' 
                                  : 'bg-muted text-foreground'
                              }`}>
                                <div className="text-sm">{convMsg.message}</div>
                                <div className="text-xs opacity-70 mt-1">{convMsg.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="cyber-border bg-card/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-primary font-mono text-lg">REGISTRO DE CHAMADAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
              {filteredCalls.map((call, index) => (
                <div key={index} className="p-3 rounded border border-border bg-muted/10 hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-foreground">{maskText(call.contact)}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      call.type === 'incoming' ? 'bg-primary' : 
                      call.type === 'outgoing' ? 'bg-accent' : 'bg-neon-red'
                    }`}></div>
                  </div>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};