export interface MunicipalityProperties {
  id: string;
  name: string;
  description?: string;
}

export interface MunicipalityData {
  name: string;
  pibPerCapita: string;
  populacao: string;
  area: string;
  regiaoIntermediaria: string;
  mesorregiao: string;
  regiaoTuristica: string;
}

export interface GeoJSONFeature {
  type: "Feature";
  properties: MunicipalityProperties;
  geometry: any;
  id?: string;
}

export interface GeoJSONData {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface CityInfo {
  name: string;
  summary: string;
  funFact: string;
  sources: string[];
}

export enum MapColorMode {
  VISITED = 'VISITED',
  REGION = 'REGION',
}