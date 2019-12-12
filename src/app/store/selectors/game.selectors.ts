import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from '../../models/game.model';
import { gameSelector, completedGamesSelector } from '../reducers/game.reducer';
import { GlobalState } from '../store';

@Injectable({ providedIn: 'root' })
export class GameSelectors {
  currentGame$: Observable<Game>;
  completedGames$: Observable<Game[]>;

  constructor(store: Store<GlobalState>) {
    this.currentGame$ = store.pipe(select(gameSelector));
    this.completedGames$ = store.pipe(select(completedGamesSelector));
  }
}
