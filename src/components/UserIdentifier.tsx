import { useState } from "react";
import { User, Monitor, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserData {
  id: string;
  name: string;
  device: "mobile" | "desktop";
  status: "online" | "offline";
  lastSeen: string;
  dataOwnership: {
    messages: number;
    photos: number;
    locations: number;
    calls: number;
  };
}

const mockUsers: UserData[] = [
  {
    id: "user_001",
    name: "USUÁRIO ATIVO",
    device: "mobile",
    status: "online",
    lastSeen: "Agora",
    dataOwnership: {
      messages: 847,
      photos: 156,
      locations: 2341,
      calls: 92
    }
  },
  {
    id: "user_002", 
    name: "USUÁRIO INATIVO",
    device: "desktop",
    status: "offline",
    lastSeen: "2h atrás",
    dataOwnership: {
      messages: 234,
      photos: 67,
      locations: 543,
      calls: 28
    }
  }
];

export const UserIdentifier = () => {
  const [selectedUser, setSelectedUser] = useState<string>(mockUsers[0].id);

  return (
    <Card className="cyber-border bg-card/30 backdrop-blur-sm h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-primary font-mono flex items-center space-x-2 text-sm md:text-base">
          <User className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">IDENTIFICAÇÃO DE USUÁRIOS</span>
          <span className="sm:hidden">USUÁRIOS</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <div className="space-y-3">
          {mockUsers.map((user) => (
            <div 
              key={user.id}
              className={`p-3 md:p-4 rounded-lg border transition-all cursor-pointer ${
                selectedUser === user.id 
                  ? 'border-primary bg-primary/10' 
                  : 'border-primary/20 hover:border-primary/40 hover:bg-primary/5'
              }`}
              onClick={() => setSelectedUser(user.id)}
            >
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="relative">
                    {user.device === "mobile" ? (
                      <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    ) : (
                      <Monitor className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    )}
                    <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                      user.status === "online" ? "bg-green-400" : "bg-red-400"
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-mono text-primary font-semibold text-sm md:text-base">{user.name}</h3>
                    <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                  </div>
                </div>
                <Badge variant={user.status === "online" ? "default" : "secondary"} className="text-xs">
                  {user.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Msgs:</span>
                    <span className="text-primary font-mono">{user.dataOwnership.messages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fotos:</span>
                    <span className="text-primary font-mono">{user.dataOwnership.photos}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Locs:</span>
                    <span className="text-primary font-mono">{user.dataOwnership.locations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chamadas:</span>
                    <span className="text-primary font-mono">{user.dataOwnership.calls}</span>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-primary/20">
                <p className="text-xs text-muted-foreground">
                  <span className="hidden sm:inline">Última atividade: </span>
                  <span className="sm:hidden">Ativo: </span>
                  <span className="text-primary">{user.lastSeen}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 md:mt-4 p-2 md:p-3 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground font-mono">
            <span className="text-primary">INFO:</span> 
            <span className="hidden sm:inline"> Todos os dados exibidos pertencem ao usuário selecionado. 
            Clique em um usuário para filtrar as informações nos painéis.</span>
            <span className="sm:hidden"> Dados do usuário selecionado.</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};