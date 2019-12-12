import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { Game } from '../../models/game.model';
import { GlobalState } from '../store';

const updateGame = createAction(
    'UPDATE_GAME',
    props<{ payload: { gameId: number; updateData: Partial<Game> } }>()
);

const updateGameSuccess = createAction(
    'UPDATE_GAME_SUCCESS',
    props<{ payload: Game }>()
);

const addGame = createAction(
    'ADD_GAME',
    props<{ payload: Game }>()
);

const resetCurrentGame = createAction(
    'RESET_CURRENT_GAME'
);

@Injectable({ providedIn: 'root' })
export class GameActions {
    public static updateGame = updateGame;
    public static addGame = addGame;
    public static updateGameSuccess = updateGameSuccess;
    public static resetCurrentGame = resetCurrentGame;

    constructor(private store: Store<GlobalState>) {

    }

    public updateGame(updateData: { gameId: number; updateData: Game }) {
        return this.store.dispatch(GameActions.updateGame({ payload: updateData }));
    }

    public resetCurrentGame() {
        return this.store.dispatch(GameActions.resetCurrentGame());
    }

    public addGame(game: Game) {
        return this.store.dispatch(GameActions.addGame({ payload: game }));
    }
}


