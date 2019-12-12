import { GameSymbol, Player } from './player.model';

export interface Game {
    id: number;
    // We can substitute winner with a real player, currently we're using the player with the winning symbol
    winner: GameSymbol | null;
    isDraw: boolean;
    isGameOver: boolean;
    winningLine: number[];
    player1Moves: number[];
    player2Moves: number[];
}
