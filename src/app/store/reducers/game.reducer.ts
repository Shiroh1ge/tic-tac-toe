import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { Game } from '../../models/game.model';
import { GameSymbol } from '../../models/player.model';
import { GameActions } from '../actions/game.actions';
import { GlobalState } from '../store';

export interface GameState {
    currentGame: Game;
    games: Game[];
}

export const gameInitialState: GameState = {
    currentGame: {
        id: 0,
        winner: undefined,
        isDraw: false,
        currentSymbol: GameSymbol.X,
        player1Moves: [],
        player2Moves: []
    },
    games: []
};

const reducer = createReducer(
    gameInitialState,
    on(GameActions.updateGameSuccess, (state, { payload }): GameState => ({
        ...state,
        currentGame: {
            ...state.currentGame,
            ...payload
        }
    })),
);


export function gameReducer(state: GameState | undefined, action: Action) {
    return reducer(state, action);
}

const getGame = (state: GlobalState) => state.game.currentGame;

export const gameSelector = createSelector([getGame], (game) => game);


