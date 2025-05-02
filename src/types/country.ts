export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  population: number;
  languages?: { [key: string]: string };
  flags: {
    png: string;
    svg: string;
  };
  cca3: string;
}

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'; 