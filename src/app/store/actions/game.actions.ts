import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { Game } from '../../models/game.model';
import { GlobalState } from '../store';

const makeMove = createAction(
    'MAKE_MOVE',
    props<{ payload: { gameId: number; updateData: Partial<Game> } }>()
);

const makeMoveSuccess = createAction(
    'MAKE_MOVE_SUCCESS',
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
    public static makeMove = makeMove;
    public static addGame = addGame;
    public static makeMoveSuccess = makeMoveSuccess;
    public static resetCurrentGame = resetCurrentGame;

    constructor(private store: Store<GlobalState>) {

    }

    public makeMove(updateData: { gameId: number; updateData: Game }) {
        return this.store.dispatch(GameActions.makeMove({ payload: updateData }));
    }

    public resetCurrentGame() {
        return this.store.dispatch(GameActions.resetCurrentGame());
    }

    public addGame(game: Game) {
        return this.store.dispatch(GameActions.addGame({ payload: game }));
    }
}


