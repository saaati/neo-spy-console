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
import { GalleryPanel } from "./panels/GalleryPanel";
import { PinAuth } from "./PinAuth";
import { PrivacyToggle } from "./PrivacyToggle";
import { UserIdentifier } from "./UserIdentifier";

export type ActivePanel = 'location' | 'cameras' | 'messages' | 'microphone' | 'logs' | 'targets' | 'system' | 'gallery';

export const SpyDashboard = () => {
  const [activePanel, setActivePanel] = useState<ActivePanel>('location');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hideInfo, setHideInfo] = useState(false);

  if (!isAuthenticated) {
    return <PinAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'location':
        return <LocationPanel hideInfo={hideInfo} />;
      case 'cameras':
        return <CamerasPanel hideInfo={hideInfo} />;
      case 'messages':
        return <MessagesPanel hideInfo={hideInfo} />;
      case 'microphone':
        return <MicrophonePanel hideInfo={hideInfo} />;
      case 'logs':
        return <LogsPanel hideInfo={hideInfo} />;
      case 'targets':
        return <TargetsPanel hideInfo={hideInfo} />;
      case 'system':
        return <SystemPanel hideInfo={hideInfo} />;
      case 'gallery':
        return <GalleryPanel hideInfo={hideInfo} />;
      default:
        return <LocationPanel hideInfo={hideInfo} />;
    }
  };

  const showUserIdentifier = activePanel === 'location';

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background scanlines">
        <SpyHeader />
        
        <div className="flex w-full">
          <SpySidebar activePanel={activePanel} setActivePanel={setActivePanel} />
          
          <main className="flex-1 p-2 md:p-6 lg:p-8">
            <div className={`grid gap-3 md:gap-6 h-full min-h-[calc(100vh-7rem)] ${showUserIdentifier ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1'}`}>
              <div className={showUserIdentifier ? 'lg:col-span-4 xl:col-span-3 order-2 lg:order-1' : 'col-span-1'}>
                <div className="glass-card cyber-border rounded-xl h-full overflow-hidden">
                  <div className="p-3 md:p-6 lg:p-8 h-full">
                    {renderActivePanel()}
                  </div>
                </div>
              </div>
              {showUserIdentifier && (
                <div className="lg:col-span-4 xl:col-span-1 order-1 lg:order-2">
                  <UserIdentifier />
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};