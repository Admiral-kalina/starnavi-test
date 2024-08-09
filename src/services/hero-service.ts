import Api from "../api";
import {Film, FilmsResponse, Hero, HeroesResponse, HeroResponse, Starship, StarshipResponse} from '../types/hero.dto';

export const getHeroesByPage = async (page: number): Promise<{ heroes: Hero[], next: string | null }> => {
  try {
    const response: HeroesResponse = await Api.get<HeroesResponse>(`/people`, { page });
    return { heroes: response.results, next: response.next }; // Return an object with heroes and next page URL
  } catch (error) {
    console.error('Failed to fetch heroes:', error);
    throw error;
  }
};

export const getHeroById = async (id: number): Promise<Hero> => {
  try {
    const response: HeroResponse = await Api.get<HeroResponse>(`/people/`, {id});
    return response.results[0];
  } catch (error) {
    console.error('Failed to fetch hero:', error);
    throw error;
  }
};

export const getFilms = async ():Promise<Film[]> => {
  try {
    const response = await Api.get<FilmsResponse>('/films/');
    return response.results;
  } catch (error) {
    console.error('Failed to fetch film:', error);
    throw error;
  }
};

export const getStarshipById = async (id: number):Promise<Starship[]> => {
  try {
    const response = await Api.get<StarshipResponse>('/starships/', {id});
    return response.results;
  } catch (error) {
    console.error('Failed to fetch starship:', error);
    throw error;
  }
};