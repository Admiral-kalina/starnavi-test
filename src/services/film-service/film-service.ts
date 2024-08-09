import api from "../../api";
import {Film} from "../../types/film.dto";

export interface FilmsResponse {
  results: Film[];
}

export const getFilms = async ():Promise<Film[]> => {
  try {
    const response = await api.get<FilmsResponse>('/films/');
    return response.results;
  } catch (error) {
    console.error('Failed to fetch film:', error);
    throw error;
  }
};