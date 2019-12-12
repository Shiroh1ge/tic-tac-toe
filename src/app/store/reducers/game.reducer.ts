import { Action, createReducer, createSelector } from '@ngrx/store';
import { Game } from '../../models/game.model';
import { GlobalState } from '../store';

export interface GameState {
    currentGame: Game;
    games: Game[];
}

export const gameInitialState: GameState = {
    currentGame: {
        winner: null,
        isDraw: false,
        player1Moves: [],
        player2Moves: []
    },
    games: []
};

const reducer = createReducer(
    gameInitialState
);


export function gameReducer(state: GameState | undefined, action: Action) {
    return reducer(state, action);
}

const getGame = (state: GlobalState) => state.game.currentGame;

export const gameSelector = createSelector([getGame], (game) => game);


