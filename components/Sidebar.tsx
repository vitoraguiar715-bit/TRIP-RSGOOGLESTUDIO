
import React, { useState } from 'react';
import { GeoJSONFeature, MapColorMode } from '../types';
import { MUNICIPIOS_DATA, REGIOES_TURISTICAS, REGION_COLORS, getCityRankings } from '../data/municipios';

interface SidebarProps {
  selectedFeature: GeoJSONFeature | null;
  visitedCities: Set<string>;
  toggleVisited: (name: string) => void;
  colorMode: MapColorMode;
  setColorMode: (mode: MapColorMode) => void;
  onCloseSelection: () => void;
  highlightedRegion: string | null;
  onRegionClick: (region: string) => void;
  onSearchSelect: (name: string) => void;
}

// Componente Logo SVG Personalizado TRIP-RS
const TripRSLogo = () => (
  <svg viewBox="0 0 100 115" className="w-full h-full drop-shadow-lg" style={{ filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.3))' }}>
    {/* Argola da Bússola */}
    <circle cx="50" cy="12" r="8" fill="none" stroke="#1e293b" strokeWidth="3" />
    <rect x="44" y="18" width="12" height="6" rx="1" fill="#1e293b" />

    <g transform="translate(0, 15)">
        {/* Aro Externo Preto */}
        <circle cx="50" cy="50" r="48" fill="#1e293b" />
        
        {/* Textos no Aro (Curvados) */}
        <path id="curveTop" d="M 20 50 A 30 30 0 0 1 80 50" fill="none" />
        <path id="curveBottom" d="M 18 50 A 32 32 0 0 0 82 50" fill="none" />
        
        <text fontSize="7.5" fontWeight="900" fill="white" letterSpacing="1.5" fontFamily="serif">
            {/* @ts-ignore: 'side' is an SVG2 attribute not yet in React types */}
            <textPath href="#curveTop" startOffset="50%" textAnchor="middle" side="right">
                @TRIP-RS
            </textPath>
        </text>
        
        <text fontSize="5.5" fontWeight="bold" fill="white" letterSpacing="1.5" fontFamily="serif">
            {/* @ts-ignore: 'side' is an SVG2 attribute not yet in React types */}
            <textPath href="#curveBottom" startOffset="50%" textAnchor="middle" side="left">
                DESDE 2015
            </textPath>
        </text>

        {/* Interior da Bússola */}
        <circle cx="50" cy="50" r="38" fill="white" />
        
        {/* Fundo com Bandeira RS (Máscara Circular) */}
        <defs>
           <clipPath id="innerCompass">
              <circle cx="50" cy="50" r="36" />
           </clipPath>
        </defs>

        <g clipPath="url(#innerCompass)">
           {/* Rotação para diagonal */}
           <g transform="rotate(-35 50 50) scale(1.5)">
              <rect x="-50" y="-20" width="200" height="50" fill="#009b3a" /> {/* Verde */}
              <rect x="-50" y="30" width="200" height="40" fill="#d22630" /> {/* Vermelho */}
              <rect x="-50" y="70" width="200" height="100" fill="#fedf00" /> {/* Amarelo */}
           </g>
        </g>

        {/* Pontos Cardeais Personalizados (V, F, R, C) */}
        <text x="50" y="28" textAnchor="middle" fill="black" fontWeight="900" fontSize="14" fontFamily="serif">V</text> {/* Norte */}
        <text x="50" y="78" textAnchor="middle" fill="black" fontWeight="900" fontSize="14" fontFamily="serif">C</text> {/* Sul */}
        <text x="22" y="55" textAnchor="middle" fill="black" fontWeight="900" fontSize="14" fontFamily="serif">F</text> {/* Oeste */}
        <text x="78" y="55" textAnchor="middle" fill="black" fontWeight="900" fontSize="14" fontFamily="serif">R</text> {/* Leste */}

        {/* Marcadores de traço */}
        <rect x="49" y="16" width="2" height="5" fill="black" />
        <rect x="49" y="79" width="2" height="5" fill="black" />
        <rect x="16" y="49" width="5" height="2" fill="black" />
        <rect x="79" y="49" width="5" height="2" fill="black" />

        {/* Agulha da Bússola */}
        <circle cx="50" cy="50" r="6" fill="#1e293b" />
        <path d="M50 50 L70 35 L50 46 Z" fill="#1e293b" /> 
        <path d="M50 50 L30 65 L50 54 Z" fill="#1e293b" />
    </g>
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedFeature, 
  visitedCities, 
  toggleVisited,
  colorMode,
  setColorMode,
  onCloseSelection,
  highlightedRegion,
  onRegionClick,
  onSearchSelect
}) => {
  
  const [searchTerm, setSearchTerm] = useState('');

  const isVisited = selectedFeature ? visitedCities.has(selectedFeature.properties.name) : false;
  const selectedData = selectedFeature ? MUNICIPIOS_DATA[selectedFeature.properties.name] : null;
  
  // Calculate rankings if a city is selected
  const rankings = selectedData ? getCityRankings(selectedData.name) : null;

  const totalCities = Object.keys(MUNICIPIOS_DATA).length;
  const totalVisited = visitedCities.size;
  const percentVisited = ((totalVisited / totalCities) * 100).toFixed(1);

  // Search Logic
  const normalizeStr = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  
  const searchResults = searchTerm.length > 1 
    ? Object.keys(MUNICIPIOS_DATA)
        .filter(city => normalizeStr(city).includes(normalizeStr(searchTerm)))
        .slice(0, 5)
    : [];

  const handleResultClick = (city: string) => {
      onSearchSelect(city);
      setSearchTerm(''); // Clear search after selection
  };

  return (
    <div className="absolute top-0 left-0 z-[1000] h-full w-full md:w-[450px] bg-slate-50 shadow-2xl flex flex-col border-r border-slate-200 font-sans">
      
      {/* Header TRIP-RS Style */}
      <div className="bg-slate-900 text-white shrink-0 relative overflow-hidden">
        {/* Bandeira RS Stripes */}
        <div className="flex h-2 w-full">
            <div className="flex-1 bg-[#009b3a]"></div> {/* Verde */}
            <div className="flex-1 bg-[#d22630]"></div> {/* Vermelho */}
            <div className="flex-1 bg-[#fedf00]"></div> {/* Amarelo */}
        </div>

        <div className="p-6 relative z-10">
            <div className="flex items-center gap-4 mb-4">
                {/* LOGO TRIP-RS SVG REIMPLEMENTADO */}
                <div className="h-20 w-20 shrink-0 transition-transform hover:scale-105 duration-300">
                    <TripRSLogo />
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tighter text-white italic">
                        TRIP<span className="text-[#fedf00]">-RS</span>
                    </h1>
                    <p className="text-slate-300 text-xs uppercase tracking-widest font-bold">Diário de Bordo</p>
                    <div className="mt-1 flex gap-1">
                         <span className="block h-1 w-4 bg-[#009b3a] rounded-full"></span>
                         <span className="block h-1 w-4 bg-[#d22630] rounded-full"></span>
                         <span className="block h-1 w-4 bg-[#fedf00] rounded-full"></span>
                    </div>
                </div>
                
                {selectedFeature && (
                    <button onClick={onCloseSelection} className="ml-auto text-slate-400 hover:text-[#d22630] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

             <div className="flex bg-slate-800/80 p-1.5 rounded-xl backdrop-blur-md border border-slate-700 shadow-inner">
                <button 
                    onClick={() => {
                        setColorMode(MapColorMode.VISITED);
                        if (highlightedRegion) onRegionClick(highlightedRegion); 
                    }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${colorMode === MapColorMode.VISITED && !highlightedRegion ? 'bg-[#009b3a] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Minhas Visitas
                </button>
                <button 
                    onClick={() => setColorMode(MapColorMode.REGION)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide ${colorMode === MapColorMode.REGION || highlightedRegion ? 'bg-[#d22630] text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Regiões
                </button>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 relative">
        
        {!selectedFeature && (
           <div className="p-6 space-y-8">
              {/* Search Bar */}
              <div className="relative group">
                  <div className="flex items-center bg-white border-2 border-slate-200 rounded-full shadow-sm group-focus-within:border-[#009b3a] group-focus-within:ring-1 group-focus-within:ring-[#009b3a] overflow-hidden transition-all">
                      <div className="pl-4 text-slate-400 group-focus-within:text-[#009b3a]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                      </div>
                      <input 
                          type="text" 
                          placeholder="Buscar município..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full py-3 px-3 text-sm text-slate-700 outline-none placeholder-slate-400 bg-transparent"
                      />
                  </div>
                  
                  {/* Search Results */}
                  {searchTerm.length > 1 && searchResults.length > 0 && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden">
                          {searchResults.map((city) => (
                              <div 
                                key={city}
                                onClick={() => handleResultClick(city)}
                                className="px-4 py-3 text-sm text-slate-700 hover:bg-[#009b3a] hover:text-white cursor-pointer border-b border-slate-50 last:border-none flex justify-between items-center transition-colors"
                              >
                                  <span className="font-medium">{city}</span>
                                  <span className="text-[10px] uppercase opacity-70 font-bold">{MUNICIPIOS_DATA[city].regiaoTuristica}</span>
                              </div>
                          ))}
                      </div>
                  )}
                   {searchTerm.length > 1 && searchResults.length === 0 && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50 p-4 text-center text-sm text-slate-400">
                          Nenhum município encontrado.
                      </div>
                   )}
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#fedf00]"></span>
                      Progresso da Trip
                  </h2>
                  <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-black text-slate-900">{percentVisited}%</span>
                      <span className="text-sm text-slate-500 mb-1 font-medium">conquistado</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden border border-slate-100 relative">
                       {/* Gradient Bar: Green -> Yellow -> Red */}
                      <div 
                        className="h-full rounded-full transition-all duration-1000 relative" 
                        style={{ 
                            width: `${percentVisited}%`,
                            background: 'linear-gradient(90deg, #009b3a 0%, #fedf00 100%)'
                        }}
                      >
                          <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                      </div>
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-slate-400 font-bold uppercase">
                      <span>Início</span>
                      <span>{totalVisited} de {totalCities} Cidades</span>
                  </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                  <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#d22630]"></span>
                        <span>Regiões Turísticas</span>
                      </div>
                      {highlightedRegion && (
                          <span className="text-[10px] bg-[#d22630] text-white px-2 py-0.5 rounded-full font-bold shadow-sm">FILTRADO</span>
                      )}
                  </h2>
                  <div className="space-y-3">
                      {REGIOES_TURISTICAS.map(region => {
                          const citiesInRegion = Object.values(MUNICIPIOS_DATA).filter(c => c.regiaoTuristica === region);
                          const totalRegion = citiesInRegion.length;
                          
                          const visitedInRegion = citiesInRegion.filter(c => visitedCities.has(c.name)).length;
                          const percentRegion = totalRegion > 0 ? (visitedInRegion / totalRegion) * 100 : 0;

                          const regionColorHex = REGION_COLORS[region] || "#94a3b8"; // Fallback grey
                          const isActive = highlightedRegion === region;
                          const isDimmed = highlightedRegion && !isActive;

                          return (
                            <div 
                                key={region} 
                                onClick={() => onRegionClick(region)}
                                className={`flex items-center gap-3 group cursor-pointer p-2 rounded-lg transition-all duration-200 border border-transparent
                                    ${isActive ? 'bg-slate-50 border-slate-200 shadow-sm scale-[1.02]' : 'hover:bg-slate-50 hover:border-slate-100'}
                                    ${isDimmed ? 'opacity-40 hover:opacity-70' : 'opacity-100'}
                                `}
                            >
                                <div 
                                    className={`w-3 h-3 rounded-full shrink-0 shadow-sm ${isActive ? 'ring-2 ring-offset-2 ring-[#d22630]' : ''}`}
                                    style={{ backgroundColor: regionColorHex }}
                                ></div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className={`font-bold ${isActive ? 'text-[#d22630]' : 'text-slate-700'}`}>{region}</span>
                                        <span className="text-slate-400 font-mono">{visitedInRegion}/{totalRegion}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                        <div 
                                            className="h-1.5 rounded-full transition-all duration-1000" 
                                            style={{ 
                                                width: `${percentRegion}%`,
                                                backgroundColor: regionColorHex
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                          )
                      })}
                  </div>
              </div>

              {visitedCities.size > 0 && (
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#009b3a]"></span>
                        <span>Histórico de Conquistas</span>
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(visitedCities).map(city => (
                            <span key={city} className="text-xs px-2.5 py-1 bg-[#009b3a]/10 text-[#009b3a] rounded-md border border-[#009b3a]/20 font-bold">
                                {city}
                            </span>
                        ))}
                    </div>
                </div>
              )}
           </div>
        )}

        {selectedFeature && (
            <div className="p-6 space-y-6">
                
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border shadow-sm ${isVisited ? 'bg-[#009b3a] text-white border-[#009b3a]' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                            {isVisited ? '✓ Conquistado' : '○ A Visitar'}
                        </span>
                        {selectedData && (
                            <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border bg-white text-slate-700 border-slate-200 shadow-sm">
                                {selectedData.regiaoTuristica}
                            </span>
                        )}
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 leading-none tracking-tight mb-1">{selectedFeature.properties.name}</h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-[#009b3a] via-[#d22630] to-[#fedf00] rounded-full mt-4 mb-6"></div>

                    <button
                        onClick={() => toggleVisited(selectedFeature.properties.name)}
                        className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center space-x-2 transition-all transform active:scale-[0.98] shadow-lg uppercase tracking-widest ${
                        isVisited 
                            ? 'bg-white text-[#d22630] border-2 border-[#d22630] hover:bg-red-50' 
                            : 'bg-[#009b3a] text-white hover:bg-green-700 hover:shadow-green-200'
                        }`}
                    >
                        {isVisited ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span>Remover Visita</span>
                        </>
                        ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Marcar Visita</span>
                        </>
                        )}
                    </button>
                </div>

                {selectedData && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group hover:border-[#fedf00] transition-colors">
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">População</p>
                            <p className="font-bold text-slate-800 text-lg mt-0.5">{selectedData.populacao}</p>
                            {rankings && (
                                <div className="mt-2 inline-flex items-center bg-slate-100 px-2 py-1 rounded-md text-[10px] text-slate-500 font-medium" title="Ranking Estadual">
                                    <span className="font-bold text-slate-900">#{rankings.popRank}</span>
                                    <span className="mx-1 text-slate-300">/</span>
                                    <span>{rankings.totalCities}</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group hover:border-[#009b3a] transition-colors">
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">PIB per Capita</p>
                            <p className="font-bold text-slate-800 text-lg mt-0.5">{selectedData.pibPerCapita}</p>
                            {rankings && (
                                <div className="mt-2 inline-flex items-center bg-slate-100 px-2 py-1 rounded-md text-[10px] text-slate-500 font-medium" title="Ranking Estadual">
                                    <span className="font-bold text-slate-900">#{rankings.pibRank}</span>
                                    <span className="mx-1 text-slate-300">/</span>
                                    <span>{rankings.totalCities}</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group hover:border-[#d22630] transition-colors">
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Área</p>
                            <p className="font-bold text-slate-800 text-lg mt-0.5">{selectedData.area}</p>
                            {rankings && (
                                <div className="mt-2 inline-flex items-center bg-slate-100 px-2 py-1 rounded-md text-[10px] text-slate-500 font-medium" title="Ranking Estadual">
                                    <span className="font-bold text-slate-900">#{rankings.areaRank}</span>
                                    <span className="mx-1 text-slate-300">/</span>
                                    <span>{rankings.totalCities}</span>
                                </div>
                            )}
                        </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Mesorregião</p>
                            <p className="font-bold text-slate-800 text-sm mt-1 leading-tight" title={selectedData.mesorregiao}>{selectedData.mesorregiao}</p>
                        </div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
