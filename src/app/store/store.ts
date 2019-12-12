import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { gameReducer, GameState } from './reducers/game.reducer';

export interface GlobalState {
  game: GameState;
}

export const reducers: ActionReducerMap<GlobalState> = {
  game: gameReducer
};

export const metaReducers: MetaReducer<GlobalState>[] = [];
