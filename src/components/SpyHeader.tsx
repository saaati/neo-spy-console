import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Wifi, Signal, Shield } from "lucide-react";

interface SpyHeaderProps {
  children?: React.ReactNode;
}

export const SpyHeader = ({ children }: SpyHeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <header className="h-14 sm:h-16 lg:h-18 glass-card border-b border-primary/30 flex items-center justify-between px-2 sm:px-4 lg:px-8 backdrop-blur-md">
      <div className="flex items-center space-x-1 sm:space-x-3 lg:space-x-6">
        <SidebarTrigger className="text-primary hover:text-primary/80 hover-glow focus-glow p-1.5 sm:p-2 rounded-lg transition-all" />
        <SidebarTrigger asChild>
          <span className="sm:hidden text-primary font-mono text-sm font-bold cursor-pointer hover:text-primary/80 transition-colors">MENU</span>
        </SidebarTrigger>
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          <div className="relative">
            <Shield className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary cyber-glow" />
            <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-destructive rounded-full animate-pulse shadow-lg"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="hidden sm:block text-lg sm:text-xl lg:text-3xl font-bold text-primary terminal-glow glitch tracking-wider">
              XSPY
            </h1>
            <span className="hidden sm:inline text-[8px] lg:text-[10px] text-terminal-dim bg-primary/10 px-1.5 py-0.5 lg:px-2 rounded-full border border-primary/30 font-mono">
              ÚLTIMA VERSÃO V3.0
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-3 lg:space-x-8">
        {children}
        
        <div className="flex sm:hidden items-center space-x-1 bg-primary/5 px-1.5 py-1 rounded border border-primary/20">
          <Wifi className="w-3 h-3 text-muted-foreground/50" />
          <Signal className="w-3 h-3 text-primary cyber-glow" />
          <Signal className="w-3 h-3 text-muted-foreground/50" />
          <Signal className="w-3 h-3 text-muted-foreground/50" />
        </div>
        
        <div className="hidden sm:flex items-center space-x-2 lg:space-x-3 bg-primary/5 px-2 py-1.5 lg:px-3 lg:py-2 rounded-lg border border-primary/20">
          <Wifi className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground/50" />
          <Signal className="w-3 h-3 lg:w-4 lg:h-4 text-primary cyber-glow" />
          <Signal className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground/50" />
          <Signal className="w-3 h-3 lg:w-4 lg:h-4 text-muted-foreground/50" />
          <span className="text-primary text-[10px] sm:text-xs lg:text-sm font-mono pulse-green font-bold">ONLINE</span>
        </div>
        
        <div className="text-right font-mono bg-card/50 px-1 py-1 sm:px-3 sm:py-2 rounded-lg border border-primary/20 backdrop-blur-sm min-w-0">
          <div className="text-primary text-xs sm:text-lg lg:text-xl font-bold terminal-glow tracking-wider whitespace-nowrap">
            {formatTime(currentTime)}
          </div>
          <div className="hidden lg:block text-terminal-dim text-xs mt-1">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </header>
  );
};