import api from "../../api";
import {Hero} from '../../types/hero.dto';

export interface HeroesResponse {
  results: Hero[];
  next: string | null;
}

export interface HeroResponse {
  results: Hero[];
}

export const getHeroesByPage = async (page: number): Promise<{ heroes: Hero[], next: string | null }> => {
  try {
    const response: HeroesResponse = await api.get<HeroesResponse>(`/people`, { page });
    return { heroes: response.results, next: response.next }; // Return an object with heroes and next page URL
  } catch (error) {
    console.error('Failed to fetch heroes:', error);
    throw error;
  }
};

export const getHeroById = async (id: number): Promise<Hero> => {
  try {
    const response: HeroResponse = await api.get<HeroResponse>(`/people/`, {id});
    return response.results[0];
  } catch (error) {
    console.error('Failed to fetch hero:', error);
    throw error;
  }
};
