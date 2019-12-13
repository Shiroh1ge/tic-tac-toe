import { Player } from './player.model';

export enum GameSymbol {
    X = 'X',
    O = 'O'
}

export interface Game {
    id: number;
    winner: Player | null;
    isDraw: boolean;
    isGameOver: boolean;
    winningLine: number[];
    player1: Player;
    player2: Player;
    player1Moves: number[];
    player2Moves: number[];
}
