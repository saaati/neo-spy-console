import { useState, useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Wifi, Signal, Shield } from "lucide-react";

export const SpyHeader = () => {
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
    <header className="h-16 bg-card border-b border-primary/20 flex items-center justify-between px-6 cyber-border">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="text-primary hover:text-primary/80" />
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-primary cyber-glow" />
          <h1 className="text-2xl font-bold text-primary terminal-glow glitch">
            XSPY v7.0
          </h1>
          <span className="text-xs text-terminal-dim bg-primary/10 px-2 py-1 rounded border border-primary/30">
            CLASSIFIED
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Wifi className="w-4 h-4 text-primary" />
          <Signal className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm font-mono pulse-green">ONLINE</span>
        </div>
        
        <div className="text-right font-mono">
          <div className="text-primary text-lg font-bold terminal-glow">
            {formatTime(currentTime)}
          </div>
          <div className="text-terminal-dim text-sm">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </header>
  );
};