export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Country {
  name: CountryName;
  capital: string[];
  population: number;
  area: number;
  region: string;
  subregion: string;
  flags: CountryFlags;
  cca2: string;
  cca3: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
