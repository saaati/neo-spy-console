import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SpySidebar } from "./SpySidebar";
import { SpyHeader } from "./SpyHeader";
import { LocationPanel } from "./panels/LocationPanel";
import { CamerasPanel } from "./panels/CamerasPanel";
import { MessagesPanel } from "./panels/MessagesPanel";
import { MicrophonePanel } from "./panels/MicrophonePanel";
import { LogsPanel } from "./panels/LogsPanel";
import { TargetsPanel } from "./panels/TargetsPanel";
import { SystemPanel } from "./panels/SystemPanel";

export type ActivePanel = 'location' | 'cameras' | 'messages' | 'microphone' | 'logs' | 'targets' | 'system';

export const SpyDashboard = () => {
  const [activePanel, setActivePanel] = useState<ActivePanel>('location');

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'location':
        return <LocationPanel />;
      case 'cameras':
        return <CamerasPanel />;
      case 'messages':
        return <MessagesPanel />;
      case 'microphone':
        return <MicrophonePanel />;
      case 'logs':
        return <LogsPanel />;
      case 'targets':
        return <TargetsPanel />;
      case 'system':
        return <SystemPanel />;
      default:
        return <LocationPanel />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background scanlines">
        <SpyHeader />
        
        <div className="flex w-full">
          <SpySidebar activePanel={activePanel} setActivePanel={setActivePanel} />
          
          <main className="flex-1 p-6">
            <div className="cyber-border rounded bg-card/50 backdrop-blur-sm h-full">
              {renderActivePanel()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};