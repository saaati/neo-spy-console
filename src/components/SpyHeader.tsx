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
    <header className="h-16 md:h-18 glass-card border-b border-primary/30 flex items-center justify-between px-4 md:px-8 backdrop-blur-md">
      <div className="flex items-center space-x-3 md:space-x-6">
        <SidebarTrigger className="text-primary hover:text-primary/80 hover-glow focus-glow p-2 rounded-lg transition-all" />
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Shield className="w-7 h-7 md:w-8 md:h-8 text-primary cyber-glow" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-pulse shadow-lg"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl md:text-3xl font-bold text-primary terminal-glow glitch tracking-wider">
              XSPY
            </h1>
            <span className="hidden md:inline text-[10px] text-terminal-dim bg-primary/10 px-2 py-0.5 rounded-full border border-primary/30 font-mono">
              ÚLTIMA VERSÃO V3.0
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3 md:space-x-8">
        {children}
        
        <div className="hidden sm:flex items-center space-x-3 bg-primary/5 px-3 py-2 rounded-lg border border-primary/20">
          <Wifi className="w-4 h-4 text-primary cyber-glow" />
          <Signal className="w-4 h-4 text-primary cyber-glow" />
          <span className="text-primary text-xs md:text-sm font-mono pulse-green font-bold">ONLINE</span>
        </div>
        
        <div className="text-right font-mono bg-card/50 px-3 py-2 rounded-lg border border-primary/20 backdrop-blur-sm">
          <div className="text-primary text-lg md:text-xl font-bold terminal-glow tracking-wider">
            {formatTime(currentTime)}
          </div>
          <div className="hidden md:block text-terminal-dim text-xs mt-1">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </header>
  );
};