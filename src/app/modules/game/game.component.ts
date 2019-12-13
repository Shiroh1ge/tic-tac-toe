import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Game, GameSymbol } from '../../models/game.model';
import { GameActions } from '../../store/actions/game.actions';
import { GameSelectors } from '../../store/selectors/game.selectors';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
    private componentAlive: boolean = true;
    public cells: any[] = new Array(9);
    public currentGame: Game;
    public completedGames: Game[];
    public totalScore: number[] = [0, 0];

    constructor(private gameSelectors: GameSelectors, private gameActions: GameActions) {
    }

    public markCell(index: number) {
        this.gameActions.makeMove({
            gameId: this.currentGame.id,
            updateData: {
                ...this.currentGame,
                player1Moves: [...this.currentGame.player1Moves, index]
            }
        });
    }

    public getSymbol(index: number) {
        if (this.currentGame.player1Moves.includes(index)) {
            return GameSymbol.X;
        }

        if (this.currentGame.player2Moves.includes(index)) {
            return GameSymbol.O;
        }

        return null;
    }

    public resetGame() {
        this.gameActions.resetCurrentGame();
    }

    ngOnInit() {
        this.gameSelectors.currentGame$
            .pipe(
                takeWhile(() => this.componentAlive)
            )
            .subscribe(game => {
                this.currentGame = game;
            });
        this.gameSelectors.completedGames$
            .pipe(
                takeWhile(() => this.componentAlive)
            )
            .subscribe(games => {
                this.completedGames = games;

                const player1WonGames = games.filter(game => game.winner.id === game.player1.id);
                const player2WonGames = games.filter(game => game.winner.id === game.player2.id);

                this.totalScore[0] = player1WonGames.length;
                this.totalScore[1] = player2WonGames.length;
            });
    }

    ngOnDestroy() {
        this.componentAlive = false;
    }

}
