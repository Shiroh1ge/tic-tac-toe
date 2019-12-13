import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Game, GameSymbol } from '../../models/game.model';
import { GameActions } from '../actions/game.actions';

const GAME_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8];

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
        private actions$: Actions,
        private gameActions: GameActions
    ) {
    }

    private getPlayer2Move(game: Game): Game {
        const availableIndexes = GAME_INDEXES
            .filter(index => !game.player1Moves.includes(index) && !game.player2Moves.includes(index));

        if (!availableIndexes.length) {
            return game;
        }

        const player2MoveIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

        return {
            ...game,
            player2Moves: [...game.player2Moves, player2MoveIndex]
        };

    }

    private checkForWinner(game: Game) {
        const player1WinningLine = WINNING_LINES.find(line => {
            return line.every(index => game.player1Moves.includes(index));
        });

        const player2WinningLine = WINNING_LINES.find(line => {
            return line.every(index => game.player2Moves.includes(index));
        });

        if (player1WinningLine) {
            return {
                ...game,
                isGameOver: true,
                winningLine: player1WinningLine,
                winner: game.player1
            };
        }

        if (player2WinningLine) {
            return {
                ...game,
                isGameOver: true,
                winningLine: player2WinningLine,
                winner: game.player2
            };
        }

        if (game.player1Moves.length + game.player2Moves.length === 9 || game.player1Moves.length + game.player2Moves.length === 10) {
            return {
                ...game,
                isGameOver: true,
                isDraw: true
            };
        }

        return game;
    }

    // Typically a backend API call
    private makeMove({ gameId, updateData }: { gameId: number; updateData: Game }): Observable<Game> {
        let updatedGame = this.getPlayer2Move(updateData);
        updatedGame = this.checkForWinner(updatedGame);

        if (updatedGame.isGameOver) {
            this.gameActions.addGame(updatedGame);
        }

        return new Observable(observer => {
            return observer.next(updatedGame);
        });
    }

    makeMove$ = createEffect(() => this.actions$.pipe(
        ofType<any>(GameActions.makeMove),
        switchMap(action => {
            return this.makeMove(action.payload)
                .pipe(
                    map(game => ({ type: GameActions.makeMoveSuccess.type, payload: game })),
                    catchError(() => EMPTY)
                );
        })
        )
    );
}
