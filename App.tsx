import React, { useState, useEffect, useCallback } from 'react';
import MapController from './components/MapController';
import Sidebar from './components/Sidebar';
import ChatWidget from './components/ChatWidget';
import { GeoJSONFeature, MapColorMode, GeoJSONData } from './types';

const App: React.FC = () => {
  const [visitedCities, setVisitedCities] = useState<Set<string>>(new Set());
  const [selectedFeature, setSelectedFeature] = useState<GeoJSONFeature | null>(null);
  const [colorMode, setColorMode] = useState<MapColorMode>(MapColorMode.VISITED);
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<GeoJSONData | null>(null);

  // Lifted GeoJSON fetching from MapController to App
  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-43-mun.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setGeoData(data);
      } catch (error) {
        console.error("Failed to load map data", error);
      }
    };

    fetchGeoJSON();
  }, []);

  const handleCityClick = useCallback((feature: GeoJSONFeature) => {
    setSelectedFeature(feature);
  }, []);

  const handleCloseSelection = useCallback(() => {
    setSelectedFeature(null);
  }, []);

  const toggleVisited = useCallback((name: string) => {
    setVisitedCities(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }, []);

  const handleRegionClick = useCallback((region: string) => {
    setHighlightedRegion(prev => prev === region ? null : region);
    setColorMode(MapColorMode.REGION);
  }, []);

  // New handler for Sidebar search
  const handleSearchSelect = useCallback((cityName: string) => {
    if (!geoData) return;
    const feature = geoData.features.find(f => f.properties.name === cityName);
    if (feature) {
      setSelectedFeature(feature);
    }
  }, [geoData]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex bg-slate-100 font-sans text-slate-900">
      {/* Sidebar Container */}
      <Sidebar 
        selectedFeature={selectedFeature}
        visitedCities={visitedCities}
        toggleVisited={toggleVisited}
        colorMode={colorMode}
        setColorMode={setColorMode}
        onCloseSelection={handleCloseSelection}
        highlightedRegion={highlightedRegion}
        onRegionClick={handleRegionClick}
        onSearchSelect={handleSearchSelect}
      />

      {/* Main Map Area */}
      <div className="flex-1 relative md:ml-[450px] transition-all duration-300 h-full shadow-inner">
         <MapController 
            geoData={geoData}
            visitedCities={visitedCities}
            onCityClick={handleCityClick}
            colorMode={colorMode}
            highlightedCityId={selectedFeature?.properties.id || null}
            highlightedRegion={highlightedRegion}
         />
      </div>

      {/* Floating Chat */}
      <ChatWidget />
    </div>
  );
};

export default App;