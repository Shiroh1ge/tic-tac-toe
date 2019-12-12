import { Injectable } from '@angular/core';
import { createAction, props, Store } from '@ngrx/store';
import { Game } from '../../models/game.model';
import { GlobalState } from '../store';

const updateGame = createAction(
    'UPDATE_GAME',
    props<{ payload: Game }>()
);


@Injectable({ providedIn: 'root' })
export class GameActions {
    public static updateGame = updateGame;

    constructor(private store: Store<GlobalState>) {

    }

}


