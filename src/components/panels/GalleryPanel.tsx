import { useState } from "react";
import { Image, Download, Eye, Calendar, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GalleryItem {
  id: string;
  name: string;
  type: 'photo' | 'video' | 'screenshot';
  date: string;
  size: string;
  location?: string;
  device: string;
  thumbnail: string;
}

interface GalleryPanelProps {
  hideInfo?: boolean;
}

export const GalleryPanel = ({ hideInfo = false }: GalleryPanelProps) => {
  const [selectedDevice, setSelectedDevice] = useState<string>('all');

  const devices = ['all', 'iPhone 15 Pro', 'Samsung S24', 'Xiaomi 14', 'OnePlus 12'];

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      name: 'IMG_0123.jpg',
      type: 'photo',
      date: '2024-01-15 14:23',
      size: '2.4 MB',
      location: 'São Paulo, SP',
      device: 'iPhone 15 Pro',
      thumbnail: '📸'
    },
    {
      id: '2',
      name: 'Screenshot_20240115.png',
      type: 'screenshot',
      date: '2024-01-15 13:45',
      size: '892 KB',
      device: 'Samsung S24',
      thumbnail: '📱'
    },
    {
      id: '3',
      name: 'VID_20240115.mp4',
      type: 'video',
      date: '2024-01-15 12:30',
      size: '15.2 MB',
      location: 'Rio de Janeiro, RJ',
      device: 'Xiaomi 14',
      thumbnail: '🎥'
    },
    {
      id: '4',
      name: 'IMG_0124.jpg',
      type: 'photo',
      date: '2024-01-15 11:15',
      size: '3.1 MB',
      location: 'Brasília, DF',
      device: 'OnePlus 12',
      thumbnail: '📸'
    },
    {
      id: '5',
      name: 'IMG_0125.jpg',
      type: 'photo',
      date: '2024-01-15 10:00',
      size: '1.8 MB',
      device: 'iPhone 15 Pro',
      thumbnail: '📸'
    },
    {
      id: '6',
      name: 'Screenshot_camera.png',
      type: 'screenshot',
      date: '2024-01-15 09:30',
      size: '654 KB',
      device: 'Samsung S24',
      thumbnail: '📱'
    }
  ];

  const filteredItems = selectedDevice === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.device === selectedDevice);

  const maskText = (text: string) => hideInfo ? '████████' : text;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return <Camera className="w-4 h-4" />;
      case 'video': return <Image className="w-4 h-4" />;
      case 'screenshot': return <Image className="w-4 h-4" />;
      default: return <Image className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      photo: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      video: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      screenshot: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };
    return variants[type as keyof typeof variants] || variants.photo;
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary terminal-glow flex items-center space-x-2">
          <Image className="w-6 h-6" />
          <span>GALERIA DE MÍDIA</span>
        </h2>
        <Badge className="bg-primary/20 text-primary border-primary cyber-glow">
          {filteredItems.length} ARQUIVOS
        </Badge>
      </div>

      {/* Device Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {devices.map((device) => (
            <Button
              key={device}
              variant={selectedDevice === device ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedDevice(device)}
              className="cyber-border"
            >
              {device === 'all' ? 'TODOS' : maskText(device)}
            </Button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="cyber-border bg-card/30 hover:bg-card/50 transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(item.type)}
                  <span className="text-xs font-mono text-muted-foreground">
                    {maskText(item.device)}
                  </span>
                </div>
                <Badge className={`text-xs ${getTypeBadge(item.type)}`}>
                  {item.type.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Thumbnail */}
              <div className="aspect-square bg-muted/20 rounded cyber-border flex items-center justify-center text-4xl">
                {item.thumbnail}
              </div>

              {/* File Info */}
              <div className="space-y-2">
                <div className="text-sm font-mono text-foreground truncate">
                  {maskText(item.name)}
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{maskText(item.date)}</span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  Tamanho: {item.size}
                </div>
                
                {item.location && (
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{maskText(item.location)}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="flex-1 cyber-border">
                      <Eye className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="cyber-border bg-card/90 backdrop-blur-sm">
                    <div className="text-center space-y-4">
                      <div className="text-6xl">{item.thumbnail}</div>
                      <div>
                        <h3 className="font-mono text-primary">{maskText(item.name)}</h3>
                        <p className="text-sm text-muted-foreground">{maskText(item.device)}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="outline" className="cyber-border">
                  <Download className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Nenhum arquivo encontrado</p>
        </div>
      )}
    </div>
  );
};