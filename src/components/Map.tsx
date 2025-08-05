import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.divIcon({
  html: `<div class="w-6 h-6 bg-destructive rounded-full border-2 border-primary animate-pulse shadow-lg"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  className: 'custom-marker'
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    position: [number, number];
    popup?: string;
    isTarget?: boolean;
  }>;
  className?: string;
}

export const Map: React.FC<MapProps> = ({ 
  center = [-23.5614, -46.6558], // São Paulo
  zoom = 13,
  markers = [],
  className = ""
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: false
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map);

    // Add custom dark theme CSS
    const style = document.createElement('style');
    style.textContent = `
      .leaflet-tile {
        filter: brightness(0.7) contrast(1.2) hue-rotate(240deg) saturate(0.8);
      }
      .leaflet-control-zoom {
        border: 1px solid hsl(var(--primary) / 0.5) !important;
        background: hsl(var(--card) / 0.9) !important;
        backdrop-filter: blur(10px);
        border-radius: 8px !important;
      }
      .leaflet-control-zoom a {
        background: hsl(var(--card) / 0.8) !important;
        color: hsl(var(--primary)) !important;
        border: 1px solid hsl(var(--primary) / 0.3) !important;
        font-weight: bold;
      }
      .leaflet-control-zoom a:hover {
        background: hsl(var(--primary) / 0.2) !important;
        color: hsl(var(--primary)) !important;
      }
      .leaflet-popup-content-wrapper {
        background: hsl(var(--card)) !important;
        border: 1px solid hsl(var(--primary) / 0.5) !important;
        border-radius: 8px !important;
        box-shadow: 0 0 20px hsl(var(--primary) / 0.3) !important;
      }
      .leaflet-popup-content {
        color: hsl(var(--foreground)) !important;
        font-family: monospace !important;
        font-size: 12px !important;
      }
      .leaflet-popup-tip {
        background: hsl(var(--card)) !important;
        border: 1px solid hsl(var(--primary) / 0.5) !important;
      }
    `;
    document.head.appendChild(style);

    mapInstanceRef.current = map;

    // Add markers
    markers.forEach((marker, index) => {
      const markerIcon = marker.isTarget 
        ? L.divIcon({
            html: `<div class="w-8 h-8 bg-destructive rounded-full border-4 border-primary animate-pulse shadow-lg shadow-destructive/50 relative">
                     <div class="absolute inset-1 bg-destructive rounded-full animate-ping"></div>
                   </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            className: 'target-marker'
          })
        : L.divIcon({
            html: `<div class="w-6 h-6 bg-primary rounded-full border-2 border-card shadow-lg shadow-primary/50"></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            className: 'history-marker'
          });

      const leafletMarker = L.marker(marker.position, { icon: markerIcon }).addTo(map);
      
      if (marker.popup) {
        leafletMarker.bindPopup(marker.popup);
      }
    });

    // Cleanup
    return () => {
      map.remove();
      document.head.removeChild(style);
    };
  }, [center, zoom, markers]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-full rounded-lg overflow-hidden cyber-border ${className}`}
      style={{ minHeight: '300px' }}
    />
  );
};

export default Map;