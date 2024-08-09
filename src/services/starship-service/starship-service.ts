import api from "../../api";
import {Starship} from "../../types/starship.dto";

export interface StarshipResponse {
  results: Starship[];
}

export const getStarshipById = async (id: number):Promise<Starship[]> => {
  try {
    const response = await api.get<StarshipResponse>('/starships/', {id});
    return response.results;
  } catch (error) {
    console.error('Failed to fetch starship:', error);
    throw error;
  }
};