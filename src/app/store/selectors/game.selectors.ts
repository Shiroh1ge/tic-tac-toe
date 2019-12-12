import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from '../../models/game.model';
import { gameSelector } from '../reducers/game.reducer';
import { GlobalState } from '../store';

@Injectable({ providedIn: 'root' })
export class GameSelectors {
  currentGame$: Observable<Game>;

  constructor(store: Store<GlobalState>) {
    this.currentGame$ = store.pipe(select(gameSelector));
  }
}
