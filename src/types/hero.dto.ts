import {Film} from "./film.dto";
import {Starship} from "./starship.dto";

export interface Hero {
  id: number;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: number;
  films: number[];
  species: number[];
  vehicles: number[];
  starships: number[];
  created: string;
  edited: string;
  url: string;
}

export type ExpandedHero = Omit<Hero, 'films' | 'starships'> & {
  films: Film[];
  starships: Starship[];
}
