import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { GeoJSONData, GeoJSONFeature, MapColorMode } from '../types';
import { MUNICIPIOS_DATA, REGION_COLORS } from '../data/municipios';

const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapControllerProps {
  geoData: GeoJSONData | null;
  visitedCities: Set<string>;
  onCityClick: (feature: GeoJSONFeature) => void;
  colorMode: MapColorMode;
  highlightedCityId: string | null;
  highlightedRegion: string | null;
}

// RS Flag Colors
const RS_COLORS = {
    GREEN: '#009b3a',
    RED: '#d22630',
    YELLOW: '#fedf00'
};

const MapController: React.FC<MapControllerProps> = ({ geoData, visitedCities, onCityClick, colorMode, highlightedCityId, highlightedRegion }) => {
  const geoJsonLayerRef = useRef<L.GeoJSON>(null);

  // Style calculation logic
  const getStyle = (feature: any) => {
    if (!feature || !feature.properties) return {};

    const id = feature.properties.id;
    const name = feature.properties.name;
    
    const isVisited = visitedCities.has(name);
    const isHighlightedCity = highlightedCityId === id;

    const realData = MUNICIPIOS_DATA[name];
    const regionName = realData ? realData.regiaoTuristica : "Sem Região Turística Definida";

    let fillColor = '#f1f5f9'; // Slate 100
    let fillOpacity = 0.8;
    let weight = 1;
    let color = '#cbd5e1'; // Slate 300 border

    // Logic Override: If a Tourism Region is highlighted via Sidebar, we go into "Spotlight Mode"
    if (highlightedRegion) {
        if (regionName === highlightedRegion) {
            // Spotlight this region
            fillColor = REGION_COLORS[regionName] || '#94a3b8';
            fillOpacity = 0.9; 
            weight = 2;
            color = '#334155'; // Dark border
        } else {
            // Dim everything else
            fillColor = '#e2e8f0';
            fillOpacity = 0.3;
            color = '#e2e8f0';
            weight = 0.5;
        }
    } else {
        // Normal Behavior (No specific region spotlight)
        if (colorMode === MapColorMode.VISITED) {
            if (isVisited) {
                fillColor = RS_COLORS.GREEN; // Official RS Green for visits
                fillOpacity = 0.9;
                color = '#14532d'; // Darker green border
            } else {
                fillColor = '#f1f5f9'; 
            }
        } else if (colorMode === MapColorMode.REGION) {
            fillColor = REGION_COLORS[regionName] || '#94a3b8';
            if (isVisited) {
                fillOpacity = 1;
                weight = 1.5;
                color = '#ffffff'; 
            } else {
                fillOpacity = 0.7;
            }
        }
    }

    // Clicked city always gets visual priority
    if (isHighlightedCity) {
      weight = 3;
      color = RS_COLORS.RED; // Selected gets RS Red Border
      fillOpacity = 1;
      
      // If looking at regions, selected city pops even if outside selection (though UI prevents this mostly)
      if (colorMode === MapColorMode.VISITED) {
         fillColor = isVisited ? RS_COLORS.GREEN : RS_COLORS.YELLOW; // If not visited but selected -> Yellow
      }
    }

    return {
      fillColor,
      weight,
      opacity: 1,
      color,
      fillOpacity
    };
  };

  // Important: Apply styles when dependencies change without destroying layers
  useEffect(() => {
    if (geoJsonLayerRef.current) {
      // Update the internal options so resetStyle works correctly on mouseout
      // @ts-ignore
      geoJsonLayerRef.current.options.style = getStyle;
      
      // Force immediate repaint of all features with new style logic
      geoJsonLayerRef.current.setStyle(getStyle);
    }
  }, [colorMode, visitedCities, highlightedCityId, highlightedRegion]);

  const onEachFeature = (feature: GeoJSONFeature, layer: L.Layer) => {
    if (feature.properties && feature.properties.name) {
        const cityName = feature.properties.name;
        const cityData = MUNICIPIOS_DATA[cityName];
        const regionName = cityData?.regiaoTuristica || "";

        const tooltipHtml = `
          <div class="flex flex-col items-center">
            <span class="text-sm font-extrabold text-slate-800 leading-tight">${cityName}</span>
            <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">${regionName}</span>
          </div>
        `;

        layer.bindTooltip(tooltipHtml, {
            permanent: false,
            direction: "top",
            offset: [0, -10],
            className: "bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-2xl border border-slate-100 font-sans min-w-max"
        });
    }

    layer.on({
      mouseover: (e) => {
        const targetLayer = e.target;
        targetLayer.setStyle({
          weight: 3,
          color: RS_COLORS.RED, // Red Border on hover
          fillColor: RS_COLORS.YELLOW, // Yellow fill on hover (RS Flag)
          fillOpacity: 1,
        });
        targetLayer.bringToFront();
      },
      mouseout: (e) => {
        const targetLayer = e.target;
        if (geoJsonLayerRef.current) {
           // resetStyle uses the layer.options.style we updated in the useEffect
           geoJsonLayerRef.current.resetStyle(targetLayer);
        }
      },
      click: () => {
        onCityClick(feature);
      }
    });
  };

  if (!geoData) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-100 text-slate-500 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#009b3a]"></div>
        <p className="text-lg font-bold text-[#009b3a] animate-pulse">Carregando Mapa do RS...</p>
      </div>
    );
  }

  return (
    <MapContainer
      center={[-30.0346, -51.2177]} 
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%", zIndex: 0, background: "#e2e8f0" }}
      className="outline-none"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <GeoJSON
        ref={geoJsonLayerRef}
        data={geoData}
        style={getStyle}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default MapController;