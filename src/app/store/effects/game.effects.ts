import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Game } from '../../models/game.model';
import { GameSymbol } from '../../models/player.model';
import { GameActions } from '../actions/game.actions';

const WINNING_LINES = [
    [0, 1, 2],  // top row
    [3, 4, 5],  // middle row
    [6, 7, 8],  // bottom row
    [0, 3, 6],  // first col
    [1, 4, 7],  // second col
    [2, 5, 8],  // third col
    [0, 4, 8],  // first diagonal
    [2, 4, 6]   // second diagonal
];

@Injectable()
export class GameEffects {

    constructor(
        private actions$: Actions
    ) {
    }

    private checkForWinner(game: Game) {
        const isPlayer1Winner = WINNING_LINES.some(line => {
            return line.every(index => game.player1Moves.includes(index));
        });

        if (isPlayer1Winner) {
            return {
                ...game,
                winner: GameSymbol.X
            };
        }

        const isPlayer2Winner = WINNING_LINES.some(line => {
            return line.every(index => game.player2Moves.includes(index));
        });

        if (isPlayer2Winner) {
            return {
                ...game,
                winner: GameSymbol.O
            };
        }

        if (game.player1Moves.length + game.player2Moves.length === 9) {
            return {
                ...game,
                isDraw: true
            };
        }

        return game;
    }

    changeCurrentPlayer(game: Game) {
        return {
            ...game,
            currentSymbol: game.currentSymbol === GameSymbol.X ? GameSymbol.O : GameSymbol.X
        };
    }

    // Typically a backend API call
    private updateGame({ gameId, updateData }: { gameId: number; updateData: Game }): Observable<Game> {
        let updatedGame = this.checkForWinner(updateData);
        updatedGame = this.changeCurrentPlayer(updatedGame);

        return new Observable(observer => {
            return observer.next(updatedGame);
        });
    }

    updateGame$ = createEffect(() => this.actions$.pipe(
        ofType<any>(GameActions.updateGame),
        switchMap(action => {
            return this.updateGame(action.payload)
                .pipe(
                    map(game => ({ type: GameActions.updateGameSuccess.type, payload: game })),
                    catchError(() => EMPTY)
                );
        })
        )
    );
}
