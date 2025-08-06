import { 
  MapPin, 
  Camera, 
  MessageSquare, 
  Mic, 
  FileText, 
  Users, 
  Settings,
  Eye,
  ShoppingCart
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ActivePanel } from "./SpyDashboard";

interface SpySidebarProps {
  activePanel: ActivePanel;
  setActivePanel: (panel: ActivePanel) => void;
}

const menuItems = [
  { id: 'location' as ActivePanel, title: 'Localização', icon: MapPin },
  { id: 'cameras' as ActivePanel, title: 'Câmeras', icon: Camera },
  { id: 'messages' as ActivePanel, title: 'Mensagens', icon: MessageSquare },
  { id: 'microphone' as ActivePanel, title: 'Microfone', icon: Mic },
  { id: 'gallery' as ActivePanel, title: 'Galeria', icon: Eye },
  { id: 'logs' as ActivePanel, title: 'Logs', icon: FileText },
  { id: 'targets' as ActivePanel, title: 'Alvos', icon: Users },
  { id: 'system' as ActivePanel, title: 'Sistema (Gerar Arquivo)', icon: Settings },
];

export const SpySidebar = ({ activePanel, setActivePanel }: SpySidebarProps) => {
  const { isMobile, setOpenMobile } = useSidebar();

  const handleMenuClick = (panel: ActivePanel) => {
    setActivePanel(panel);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className="border-r border-primary/20 bg-sidebar">
      <SidebarContent>
        <div className="p-4 border-b border-primary/20">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Eye className="w-5 h-5 text-primary cyber-glow" />
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-neon-red rounded-full animate-pulse"></div>
            </div>
            <span className="font-mono text-primary font-semibold">XSPY</span>
          </div>
          <p className="text-xs text-terminal-dim mt-1">Neural Surveillance</p>
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleMenuClick(item.id)}
                    className={`
                      font-mono transition-all duration-200 hover:bg-primary/10 hover:border-l-2 hover:border-primary
                      ${activePanel === item.id 
                        ? 'bg-primary/20 border-l-2 border-primary text-primary cyber-glow' 
                        : 'text-sidebar-foreground'
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-primary/20 space-y-4">
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => window.open('https://appespiao.duckdns.org/planos/', '_blank')}
              className="font-mono transition-all duration-200 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border border-orange-400 cyber-glow w-full justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Comprar APP</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <div className="text-xs text-terminal-dim font-mono">
            <div>Status: <span className="text-primary pulse-green">ACTIVE</span></div>
            <div>Security: <span className="text-neon-red">MAXIMUM</span></div>
            <div>Access: <span className="text-warning">LEVEL 7</span></div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};