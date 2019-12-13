import { Action, createReducer, createSelector, on } from '@ngrx/store';
import { Game } from '../../models/game.model';
import { GameActions } from '../actions/game.actions';
import { GlobalState } from '../store';

export interface GameState {
    currentGame: Game;
    completedGames: Game[];
}

export const gameInitialState: GameState = {
    currentGame: {
        id: 0,
        winner: null,
        isDraw: false,
        isGameOver: false,
        winningLine: [],
        player1: {
            id: 0,
            username: 'Player 1'
        },
        player2: {
            id: 1,
            username: 'Player 2'
        },
        player1Moves: [],
        player2Moves: []
    },
    completedGames: []
};

const reducer = createReducer(
    gameInitialState,
    on(GameActions.makeMoveSuccess, (state, { payload }): GameState => ({
        ...state,
        currentGame: {
            ...state.currentGame,
            ...payload
        }
    })),
    on(GameActions.addGame, (state, { payload }): GameState => ({
        ...state,
        completedGames: [
            ...state.completedGames,
            payload
        ]
    })),
    on(GameActions.resetCurrentGame, (state): GameState => ({
        ...state,
        currentGame: gameInitialState.currentGame
    }))
);


export function gameReducer(state: GameState | undefined, action: Action) {
    return reducer(state, action);
}

const getGame = (state: GlobalState) => state.game.currentGame;
const getGames = (state: GlobalState) => state.game.completedGames;

export const gameSelector = createSelector([getGame], (game) => game);
export const completedGamesSelector = createSelector([getGames], (games) => games);


