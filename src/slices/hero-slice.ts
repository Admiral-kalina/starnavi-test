import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { Hero, ExpandedHero} from '../types/hero.dto';
import {getFilms, getHeroById, getHeroesByPage, getStarshipById} from "../services/hero-service";

interface HeroState {
  heroes: Hero[];
  selectedHero: ExpandedHero | null;
  loading: boolean;
  error: string | null;
  loadNewPersons: boolean;
  currentPage: number;
  isLastPage: boolean;
}

interface ApiError {
  response: {
    data: string;
  };
}

const initialState: HeroState = {
  heroes: [],
  selectedHero: null,
  loading: false,
  error: null,
  currentPage: 1,
  loadNewPersons: true,
  isLastPage: false,
};

// Thunks for async actions
export const loadHeroes = createAsyncThunk<{ heroes: Hero[], next: string | null }, number, { rejectValue: string }>(
  'heroes/fetchHeroes',
  async (page, {rejectWithValue}) => {
    try {
      return await getHeroesByPage(page);
    } catch (error: unknown) {
      if (error && (error as ApiError).response) {
        return rejectWithValue((error as ApiError).response.data);
      }
      return rejectWithValue('An unexpected error occurred fetchHeroes');
    }
  }
);

export const loadHeroDetails = createAsyncThunk<ExpandedHero, number, { rejectValue: string }>(
  'heroes/fetchHeroDetails',
  async (heroId, {rejectWithValue}) => {
    try {
      const hero = await getHeroById(heroId);
      if (!hero) {
        // Return a rejection value if no data is found
        return rejectWithValue('Hero not found');
      }
      const filmsResponse = await getFilms();
      const films = filmsResponse.filter((film) => hero.films.includes(film.id));
      const starshipsResponse = await Promise.all(hero.starships.map(starshipId => getStarshipById(starshipId)));
      const starships = starshipsResponse.flatMap(starship => starship);
      return {...hero, films, starships};
    } catch (error: unknown) {
      if (error && (error as ApiError).response) {
        return rejectWithValue((error as ApiError).response.data);
      }
      return rejectWithValue('An unexpected error occurred fetchHeroDetails');
    }
  }
);

const heroSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    setLoadNewPersons(state, action: PayloadAction<boolean>) {
      state.loadNewPersons = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadHeroes.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.loadNewPersons = true;
      })
      .addCase(loadHeroes.fulfilled, (state, action: PayloadAction<{ heroes: Hero[], next: string | null }>) => {
        state.loading = false;
        state.loadNewPersons = false;
        state.heroes = [...state.heroes, ...action.payload.heroes];
        state.isLastPage = action.payload.next === null; // Update isLastPage based on the next property
        state.currentPage += 1;
      })
      .addCase(loadHeroes.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.loadNewPersons = false;
        state.error = action.payload || 'Failed to load heroes';
      })
      .addCase(loadHeroDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadHeroDetails.fulfilled, (state, action: PayloadAction<ExpandedHero>) => {
        state.loading = false;
        state.selectedHero = action.payload;
      })
      .addCase(loadHeroDetails.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load hero details';
      });
  },
});

export const {setLoadNewPersons} = heroSlice.actions;
export default heroSlice.reducer;
