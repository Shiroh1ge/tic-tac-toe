import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { GameSymbol } from '../../models/player.model';

@Component({
    selector: 'app-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
    @Input() currentSymbol: GameSymbol | null = null;
    public GameSymbol = GameSymbol;

    constructor() {
    }

    ngOnInit() {
    }

}
