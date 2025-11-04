export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
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
  cca2: string; // Country code (2 letters)
  cca3: string; // Country code (3 letters)
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
  borders?: string[];
}

export interface ApiError {
  message: string;
  status?: number;
}
