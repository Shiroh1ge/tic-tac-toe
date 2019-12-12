import { Player } from './player.model';

export interface Game {
    winner: Player | null;
    isDraw: boolean;
    player1Moves: number[];
    player2Moves: number[];
}
