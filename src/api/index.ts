import axios from "./config";
import { HeroesPageParam, HeroByIdParam } from "../types/hero.dto";

type ParamsType = HeroesPageParam | HeroByIdParam | undefined;

class Api {
  async get<T>(endpoint: string, params?: ParamsType): Promise<T> {
    try {
      const response = await axios.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch data from ${endpoint}:`, error);
      throw new Error("Failed to fetch data");
    }
  }
}

const apiInstance = new Api();
export default apiInstance;
