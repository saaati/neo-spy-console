import { MessageSquare, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fakeMessages = [
  {
    id: 1,
    type: "whatsapp",
    contact: "Maria Silva",
    number: "+55 11 99999-8888",
    time: "14:25",
    message: "Chegando em 10 minutos. Estou no trânsito.",
    unread: true
  },
  {
    id: 2,
    type: "sms",
    contact: "João Santos",
    number: "+55 11 98888-7777",
    time: "13:45",
    message: "Reunião cancelada. Reagendaremos para amanhã.",
    unread: false
  },
  {
    id: 3,
    type: "whatsapp",
    contact: "Ana Costa",
    number: "+55 11 97777-6666",
    time: "12:30",
    message: "Você viu as notícias? Preciso conversar com você urgente!",
    unread: true
  },
  {
    id: 4,
    type: "email",
    contact: "banco@secure.com",
    number: "no-reply@banco.com",
    time: "11:15",
    message: "Seu extrato mensal está disponível. Acesse sua conta para visualizar.",
    unread: false
  },
];

const recentCalls = [
  { contact: "Carlos Mendes", number: "+55 11 96666-5555", time: "14:10", duration: "3:24", type: "incoming" },
  { contact: "Desconhecido", number: "+55 11 95555-4444", time: "13:22", duration: "0:12", type: "missed" },
  { contact: "Patricia Lima", number: "+55 11 94444-3333", time: "12:45", duration: "8:45", type: "outgoing" },
];

export const MessagesPanel = () => {
  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <MessageSquare className="w-6 h-6" />
          <span>INTERCEPTAÇÃO DE MENSAGENS</span>
        </h2>
        <Badge variant="outline" className="cyber-border text-primary">
          {fakeMessages.filter(m => m.unread).length} NÃO LIDAS
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Messages */}
        <Card className="cyber-border bg-card/30">
          <CardHeader>
            <CardTitle className="text-primary font-mono">MENSAGENS INTERCEPTADAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {fakeMessages.map((msg) => (
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
                      {msg.type === 'whatsapp' && <MessageSquare className="w-4 h-4 text-primary" />}
                      {msg.type === 'sms' && <Phone className="w-4 h-4 text-accent" />}
                      {msg.type === 'email' && <Mail className="w-4 h-4 text-warning" />}
                      <span className="font-mono text-sm text-foreground">{msg.contact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-mono">{msg.time}</span>
                      {msg.unread && <div className="w-2 h-2 bg-neon-red rounded-full animate-pulse"></div>}
                    </div>
                  </div>
                  <p className="text-xs text-terminal-dim font-mono mb-1">{msg.number}</p>
                  <p className="text-sm text-foreground">{msg.message}</p>
                  <div className="mt-2 flex justify-between text-xs">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="text-primary font-mono uppercase">{msg.type}</span>
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
            <div className="space-y-3">
              {recentCalls.map((call, index) => (
                <div 
                  key={index}
                  className="p-3 rounded border border-border bg-muted/10 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-foreground">{call.contact}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      call.type === 'incoming' ? 'bg-primary' : 
                      call.type === 'outgoing' ? 'bg-accent' : 'bg-neon-red'
                    }`}></div>
                  </div>
                  <p className="text-xs text-terminal-dim font-mono mb-1">{call.number}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Horário:</span>
                    <span className="text-primary font-mono">{call.time}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Duração:</span>
                    <span className="text-primary font-mono">{call.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs">
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
                  <p className="text-primary font-mono">23 chamadas</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Tempo total:</span>
                  <p className="text-primary font-mono">2h 15m</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};