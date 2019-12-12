import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { Game } from '../../models/game.model';
import { GlobalState } from '../store';

const updateGame = createAction(
    'UPDATE_GAME',
    props<{ payload: {gameId: number; updateData: Partial<Game>} }>()
);

const updateGameSuccess = createAction(
    'UPDATE_GAME_SUCCESS',
    props<{ payload: Game }>()
);

@Injectable({ providedIn: 'root' })
export class GameActions {
    public static updateGame = updateGame;
    public static updateGameSuccess = updateGameSuccess;

    constructor(private store: Store<GlobalState>) {

    }

    public updateGame(updateData: { gameId: number; updateData: Game }) {
        console.log(updateData);
        return this.store.dispatch(GameActions.updateGame({payload: updateData}));
    }
}


