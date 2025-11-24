
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
  showLabels: boolean;
}

// RS Flag Colors
const RS_COLORS = {
    GREEN: '#009b3a',
    RED: '#d22630',
    YELLOW: '#fedf00'
};

const MapController: React.FC<MapControllerProps> = ({ 
  geoData, 
  visitedCities, 
  onCityClick, 
  colorMode, 
  highlightedCityId, 
  highlightedRegion,
  showLabels 
}) => {
  const geoJsonLayerRef = useRef<L.GeoJSON>(null);

  // We use a Ref to store the latest props. This allows the 'onEachFeature' closures
  // (which are bound once at creation) to access current state without re-binding/re-rendering.
  const propsRef = useRef({
    visitedCities,
    colorMode,
    highlightedCityId,
    highlightedRegion,
    showLabels
  });

  // Keep the Ref in sync with props
  useEffect(() => {
    propsRef.current = {
      visitedCities,
      colorMode,
      highlightedCityId,
      highlightedRegion,
      showLabels
    };
  }, [visitedCities, colorMode, highlightedCityId, highlightedRegion, showLabels]);

  // Helper to manage tooltip state dynamically without remounting layers
  const updateLayerTooltip = (layer: L.Layer, feature: GeoJSONFeature, activeShowLabels: boolean) => {
    const l = layer as L.Path;
    if (!l.bindTooltip || !l.unbindTooltip) return;

    // Remove existing tooltip to prevent conflicts
    l.unbindTooltip();

    const cityName = feature.properties.name;
    const cityData = MUNICIPIOS_DATA[cityName];
    const regionName = cityData?.regiaoTuristica || "Sem Região";

    if (activeShowLabels) {
        // PERMANENT LABEL MODE (Optimized for low visual noise)
        const labelHtml = `<div class="text-[10px] font-bold text-slate-700 drop-shadow-md text-center leading-none" style="text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;">${cityName}</div>`;
        l.bindTooltip(labelHtml, {
            permanent: true,
            direction: "center",
            className: "bg-transparent border-none shadow-none",
            interactive: false
        });
    } else {
        // HOVER MODE TOOLTIP (Rich Info)
        const tooltipHtml = `
          <div class="flex flex-col items-center">
            <span class="text-sm font-extrabold text-slate-800 leading-tight">${cityName}</span>
            <span class="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">${regionName}</span>
            <div class="mt-1 flex items-center gap-1 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded text-[10px] font-bold border border-blue-100 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>${cityData?.populacao?.replace(" pessoas", "") || "N/A"}</span>
            </div>
          </div>
        `;
        l.bindTooltip(tooltipHtml, {
            permanent: false,
            direction: "top",
            offset: [0, -10],
            className: "bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-2xl border border-slate-100 font-sans min-w-max",
            opacity: 1
        });
    }
  };

  // Style calculation logic
  const getStyle = (feature: any) => {
    if (!feature || !feature.properties) return {};

    const { visitedCities, colorMode, highlightedCityId, highlightedRegion } = propsRef.current;
    
    const id = feature.properties.id;
    const name = feature.properties.name;
    
    const isVisited = visitedCities.has(name);
    const isHighlightedCity = highlightedCityId === id;

    const realData = MUNICIPIOS_DATA[name];
    const regionName = realData ? realData.regiaoTuristica : "Sem Região Turística Definida";

    // Default Base Style
    let fillColor = '#f8fafc'; // Slate 50
    let fillOpacity = 1;
    let weight = 0.5;
    let color = '#94a3b8'; // Slate 400

    // Logic Override: If a Tourism Region is highlighted
    if (highlightedRegion) {
        if (regionName === highlightedRegion) {
            fillColor = REGION_COLORS[regionName] || '#94a3b8';
            fillOpacity = 0.9; 
            weight = 1;
            color = '#475569'; 
        } else {
            fillColor = '#ffffff';
            fillOpacity = 0.1; 
            color = '#e2e8f0';
            weight = 0.5;
        }
    } else {
        // Normal Behavior
        if (colorMode === MapColorMode.VISITED) {
            if (isVisited) {
                fillColor = RS_COLORS.GREEN;
                fillOpacity = 0.8;
                color = '#14532d'; 
                weight = 1;
            } else {
                fillColor = '#f1f5f9'; 
            }
        } else if (colorMode === MapColorMode.REGION) {
            fillColor = REGION_COLORS[regionName] || '#94a3b8';
            if (isVisited) {
                fillOpacity = 0.9;
                weight = 1.5;
                color = '#ffffff'; 
            } else {
                fillOpacity = 0.6;
            }
        }
    }

    // Selected city logic (Persistent Selection - Matches Hover Style now)
    if (isHighlightedCity) {
      weight = 3;              // Thick border
      color = RS_COLORS.RED;   // Red Border
      fillColor = RS_COLORS.YELLOW; // Yellow Fill (Relief effect)
      fillOpacity = 1;
    }

    return {
      fillColor,
      weight,
      opacity: 1,
      color,
      fillOpacity
    };
  };

  // Update the entire map layer style when state changes
  useEffect(() => {
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.setStyle(getStyle);
      
      // Canvas rendering handling for bringing to front is different,
      // generally strict z-ordering isn't as critical for the overall effect 
      // with the color change, so we skip heavy DOM manipulation loops here.
    }
  }, [colorMode, visitedCities, highlightedCityId, highlightedRegion]);

  // Update tooltips when toggle changes without remounting layers
  useEffect(() => {
    if (geoJsonLayerRef.current) {
        geoJsonLayerRef.current.getLayers().forEach((layer: any) => {
            if (layer.feature) {
                updateLayerTooltip(layer, layer.feature, showLabels);
            }
        });
    }
  }, [showLabels]);

  const onEachFeature = (feature: GeoJSONFeature, layer: L.Layer) => {
    const cityName = feature.properties.name;
    const cityData = MUNICIPIOS_DATA[cityName];
    
    updateLayerTooltip(layer, feature, showLabels);

    const featureLayer = layer as L.Path;

    featureLayer.on({
      mouseover: (e) => {
        // Keep desktop hover effect
        const { highlightedRegion } = propsRef.current;
        if (highlightedRegion && cityData?.regiaoTuristica !== highlightedRegion) return; 

        featureLayer.setStyle({
          weight: 3,             
          color: RS_COLORS.RED,  
          fillColor: RS_COLORS.YELLOW, 
          fillOpacity: 1,
        });
        
        if (!L.Browser.canvas) featureLayer.bringToFront();
      },
      mouseout: (e) => {
        const correctStyle = getStyle(feature);
        featureLayer.setStyle(correctStyle);
      },
      click: () => {
        onCityClick(feature);
        // Force immediate style update
        featureLayer.setStyle({
            weight: 3,
            color: RS_COLORS.RED,
            fillColor: RS_COLORS.YELLOW,
            fillOpacity: 1
        });
        if (!L.Browser.canvas) featureLayer.bringToFront();
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
      touchZoom={true} // Explicitly enable touch zoom
      style={{ height: "100%", width: "100%", zIndex: 0, background: "#e2e8f0" }}
      className="outline-none"
      zoomControl={false}
      preferCanvas={true} // CRITICAL: Fixes mobile performance lag
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      <GeoJSON
        key="geo-data"
        ref={geoJsonLayerRef}
        data={geoData}
        style={getStyle}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default MapController;
