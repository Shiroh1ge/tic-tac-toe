export enum GameSymbol {
  X = 'X',
  O = 'O'
}

export interface Player {
  id: number;
  username: string;
  symbol: GameSymbol;
}
