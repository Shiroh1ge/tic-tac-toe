import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Game } from '../../models/game.model';
import { GameActions } from '../actions/game.actions';

@Injectable()
export class GameEffects {

    constructor(
        private actions$: Actions
    ) {
    }

    // Typically a backend API call
    private updateGame(updateData: Partial<Game>): Observable<Partial<Game>> {
        return new Observable(observer => {
            return observer.next(updateData);
        });
    }

    updateGame$ = createEffect(() => this.actions$.pipe(
        ofType(GameActions.updateGame),
        exhaustMap(action => {
            return this.updateGame(action.payload)
                .pipe(
                    map(game => ({ type: GameActions.updateGame.type, payload: game })),
                    catchError(() => EMPTY)
                );
        })
        )
    );
}
