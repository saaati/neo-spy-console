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
    <header className="h-14 md:h-16 bg-card border-b border-primary/20 flex items-center justify-between px-3 md:px-6 cyber-border">
      <div className="flex items-center space-x-2 md:space-x-4">
        <SidebarTrigger className="text-primary hover:text-primary/80" />
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Shield className="w-6 h-6 text-primary cyber-glow" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-red rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-primary terminal-glow glitch">
            XSPY
          </h1>
          <span className="hidden sm:inline text-xs text-terminal-dim bg-primary/10 px-2 py-1 rounded border border-primary/30">
            v7.0
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-6">
        {children}
        
        <div className="hidden sm:flex items-center space-x-2">
          <Wifi className="w-4 h-4 text-primary" />
          <Signal className="w-4 h-4 text-primary" />
          <span className="text-primary text-xs md:text-sm font-mono pulse-green">ONLINE</span>
        </div>
        
        <div className="text-right font-mono">
          <div className="text-primary text-sm md:text-lg font-bold terminal-glow">
            {formatTime(currentTime)}
          </div>
          <div className="hidden md:block text-terminal-dim text-xs">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </header>
  );
};