import { Component, OnInit } from '@angular/core';
import { GameSelectors } from '../store/selectors/game.selectors';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  cells: any[] = new Array(9);

  constructor(private gameSelectors: GameSelectors) {
  }

  ngOnInit() {
  }

}
