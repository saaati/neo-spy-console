import { useState } from "react";
import { Image, Download, Eye, Calendar, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import gallery4 from "@/assets/gallery4.jpg";
import gallery5 from "@/assets/gallery5.jpg";
import gallery6 from "@/assets/gallery6.jpg";
import gallery7 from "@/assets/gallery7.jpg";
import gallery8 from "@/assets/gallery8.jpg";
import gallery9 from "@/assets/gallery9.jpg";
import gallery10 from "@/assets/gallery10.jpg";
import gallery11 from "@/assets/gallery11.jpg";
import gallery12 from "@/assets/gallery12.jpg";
import gallery13 from "@/assets/gallery13.jpg";
import gallery14 from "@/assets/gallery14.jpg";
import gallery15 from "@/assets/gallery15.jpg";
import gallery16 from "@/assets/gallery16.gif";
import gallery17 from "@/assets/gallery17.jpg";
import gallery18 from "@/assets/gallery18.jpg";
import gallery19 from "@/assets/gallery19.jpg";
import gallery20 from "@/assets/gallery20.jpg";

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
      name: 'IMG_20241205_143022.png',
      type: 'photo',
      date: '2024-01-15 14:23',
      size: '2.4 MB',
      location: 'São Paulo, SP',
      device: 'iPhone 15 Pro',
      thumbnail: gallery1
    },
    {
      id: '2',
      name: 'DSC_8947.png',
      type: 'photo',
      date: '2024-01-15 13:45',
      size: '892 KB',
      location: 'Centro, SP',
      device: 'Samsung S24',
      thumbnail: gallery2
    },
    {
      id: '3',
      name: 'IMG_4532.png',
      type: 'photo',
      date: '2024-01-15 12:30',
      size: '15.2 MB',
      location: 'Rio de Janeiro, RJ',
      device: 'Xiaomi 14',
      thumbnail: gallery3
    },
    {
      id: '4',
      name: 'Photo_2024_0115_111547.png',
      type: 'photo',
      date: '2024-01-15 11:15',
      size: '3.1 MB',
      location: 'Brasília, DF',
      device: 'OnePlus 12',
      thumbnail: gallery4
    },
    {
      id: '5',
      name: 'IMG_9831.png',
      type: 'photo',
      date: '2024-01-15 10:00',
      size: '1.8 MB',
      location: 'São Paulo, SP',
      device: 'iPhone 15 Pro',
      thumbnail: gallery5
    },
    {
      id: '6',
      name: 'Screenshot_20241205_093045.png',
      type: 'photo',
      date: '2024-01-15 09:30',
      size: '654 KB',
      location: 'Los Angeles, CA',
      device: 'Samsung S24',
      thumbnail: gallery6
    },
    {
      id: '7',
      name: 'IMG_7462.png',
      type: 'photo',
      date: '2024-01-15 09:15',
      size: '1.8 MB',
      location: 'Copacabana, RJ',
      device: 'Samsung S24',
      thumbnail: gallery7
    },
    {
      id: '8',
      name: 'DSC_1829.png',
      type: 'photo',
      date: '2024-01-15 08:45',
      size: '2.2 MB',
      location: 'Vila Madalena, SP',
      device: 'iPhone 15 Pro',
      thumbnail: gallery8
    },
    {
      id: '9',
      name: 'Photo_2024_0115_082015.png',
      type: 'photo',
      date: '2024-01-15 08:20',
      size: '3.4 MB',
      location: 'Ipanema, RJ',
      device: 'Xiaomi 14',
      thumbnail: gallery9
    },
    {
      id: '10',
      name: 'IMG_5633.png',
      type: 'photo',
      date: '2024-01-15 07:50',
      size: '2.7 MB',
      location: 'Barra da Tijuca, RJ',
      device: 'OnePlus 12',
      thumbnail: gallery10
    },
    {
      id: '11',
      name: 'Screenshot_20241205_073012.png',
      type: 'photo',
      date: '2024-01-15 07:30',
      size: '2.1 MB',
      location: 'Leblon, RJ',
      device: 'Samsung S24',
      thumbnail: gallery11
    },
    {
      id: '12',
      name: 'IMG_2947.png',
      type: 'photo',
      date: '2024-01-15 07:15',
      size: '1.9 MB',
      location: 'Jardins, SP',
      device: 'iPhone 15 Pro',
      thumbnail: gallery12
    },
    {
      id: '13',
      name: 'DSC_6281.png',
      type: 'photo',
      date: '2024-01-15 06:45',
      size: '2.5 MB',
      location: 'Fortaleza, CE',
      device: 'Xiaomi 14',
      thumbnail: gallery13
    },
    {
      id: '14',
      name: 'Photo_2024_0115_062034.png',
      type: 'photo',
      date: '2024-01-15 06:20',
      size: '2.8 MB',
      location: 'Porto de Galinhas, PE',
      device: 'OnePlus 12',
      thumbnail: gallery14
    },
    {
      id: '15',
      name: 'IMG_8174.png',
      type: 'photo',
      date: '2024-01-15 05:55',
      size: '2.3 MB',
      location: 'Moema, SP',
      device: 'Samsung S24',
      thumbnail: gallery15
    },
    {
      id: '16',
      name: 'VID_20241205_053047.mp4',
      type: 'video',
      date: '2024-01-15 05:30',
      size: '12.4 MB',
      location: 'Lapa, RJ',
      device: 'iPhone 15 Pro',
      thumbnail: gallery16
    },
    {
      id: '17',
      name: 'Screenshot_20241205_051023.png',
      type: 'screenshot',
      date: '2024-01-15 05:10',
      size: '1.2 MB',
      location: 'Centro, SP',
      device: 'Xiaomi 14',
      thumbnail: gallery17
    },
    {
      id: '18',
      name: 'IMG_3582.png',
      type: 'photo',
      date: '2024-01-15 04:45',
      size: '2.0 MB',
      location: 'Bela Vista, SP',
      device: 'OnePlus 12',
      thumbnail: gallery18
    },
    {
      id: '19',
      name: 'DSC_9246.png',
      type: 'photo',
      date: '2024-01-15 04:20',
      size: '1.7 MB',
      location: 'Perdizes, SP',
      device: 'Samsung S24',
      thumbnail: gallery19
    },
    {
      id: '20',
      name: 'Photo_2024_0115_035518.png',
      type: 'photo',
      date: '2024-01-15 03:55',
      size: '2.6 MB',
      location: 'Vila Olímpia, SP',
      device: 'iPhone 15 Pro',
      thumbnail: gallery20
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
              <div className="aspect-square bg-muted/20 rounded cyber-border overflow-hidden">
                <img 
                  src={item.thumbnail} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
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
                    <Button size="sm" variant="outline" className="flex-1 cyber-border text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      <span className="hidden sm:inline">Ver</span>
                      <span className="sm:hidden">🔍</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="cyber-border bg-card/90 backdrop-blur-sm max-w-2xl">
                    <div className="text-center space-y-4">
                      <div className="w-full max-h-96 overflow-hidden rounded">
                        <img 
                          src={item.thumbnail} 
                          alt={item.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-mono text-primary">{maskText(item.name)}</h3>
                        <p className="text-sm text-muted-foreground">{maskText(item.device)}</p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="outline" className="cyber-border text-xs p-1">
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