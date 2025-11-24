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
  const [showLabels, setShowLabels] = useState<boolean>(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Mobile UI State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Robust GeoJSON fetching with backup
  useEffect(() => {
    const fetchGeoJSON = async () => {
      setMapError(null);
      try {
        let data = null;
        
        // Try Primary Source (jsDelivr CDN - usually faster/reliable for GitHub raw files)
        try {
            const response = await fetch('https://cdn.jsdelivr.net/gh/tbrugz/geodata-br@master/geojson/geojs-43-mun.json');
            if (!response.ok) throw new Error('Primary source failed');
            data = await response.json();
        } catch (primaryError) {
            console.warn("Primary GeoJSON source failed, trying backup...", primaryError);
            
            // Try Backup Source (Code for America)
            try {
                const response = await fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states/rio-grande-do-sul.geojson');
                if (!response.ok) throw new Error('Backup source failed');
                data = await response.json();
            } catch (backupError) {
                throw new Error("Unable to load map data from any source.");
            }
        }

        if (data && data.features) {
            // Normalize data: Ensure every feature has an ID (polyfill with name if needed)
            // and ensure property keys are consistent for our types
            data.features = data.features.map((f: any) => ({
                ...f,
                properties: {
                    ...f.properties,
                    // Prefer existing ID, then cartodb_id, then name as fallback ID
                    id: f.properties.id || f.properties.cartodb_id || f.properties.name, 
                    name: f.properties.name
                }
            }));
            setGeoData(data);
        } else {
            throw new Error("Invalid map data format.");
        }

      } catch (error) {
        console.error("Failed to load map data", error);
        setMapError("Não foi possível carregar o mapa do Rio Grande do Sul. Por favor, verifique sua conexão e recarregue a página.");
      }
    };

    fetchGeoJSON();
  }, []);

  const handleCityClick = useCallback((feature: GeoJSONFeature) => {
    setSelectedFeature(feature);
    // On mobile, clicking a city should open the sidebar to show details
    if (window.innerWidth < 768) {
      setMobileMenuOpen(true);
    }
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
      if (window.innerWidth < 768) {
        setMobileMenuOpen(true);
      }
    }
  }, [geoData]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex bg-slate-100 font-sans text-slate-900">
      
      {/* Mobile Toggle Button (Floating) */}
      <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[3000]">
        <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="bg-slate-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold text-sm hover:scale-105 transition-transform"
        >
            {mobileMenuOpen ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#fedf00]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V6.172L3.707 3.293zM14 6l4 4V6.172l-4-4V6z" clipRule="evenodd" />
                  </svg>
                  <span>Ver Mapa</span>
                </>
            ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#fedf00]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Menu / Lista</span>
                </>
            )}
        </button>
      </div>

      {/* Sidebar Container - Controlled via Props */}
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
        showLabels={showLabels}
        setShowLabels={setShowLabels}
        isOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Map Area */}
      {/* On mobile, this takes full width/height. On desktop, it has left margin */}
      <div className="flex-1 relative md:ml-[450px] transition-all duration-300 h-full shadow-inner z-0">
         {mapError ? (
             <div className="flex flex-col items-center justify-center h-full bg-slate-100 text-slate-500 gap-4 p-8 text-center">
                <div className="text-[#d22630]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <p className="text-lg font-bold text-slate-700">{mapError}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-[#009b3a] text-white rounded-lg hover:bg-green-700 transition-colors font-bold shadow-md"
                >
                    Tentar Novamente
                </button>
             </div>
         ) : (
            <MapController 
                geoData={geoData}
                visitedCities={visitedCities}
                onCityClick={handleCityClick}
                colorMode={colorMode}
                highlightedCityId={selectedFeature?.properties.id || null}
                highlightedRegion={highlightedRegion}
                showLabels={showLabels}
            />
         )}
      </div>

      {/* Floating Chat */}
      <ChatWidget />
    </div>
  );
};

export default App;