import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameSymbol } from '../../../models/game.model';

@Component({
    selector: 'app-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
    @Input() currentSymbol: GameSymbol | null = null;
    @Input() isWinningCell: boolean = false;
    @Input() isDisabled: boolean = false;
    @Output() onMarked = new EventEmitter();
    public GameSymbol = GameSymbol;

    constructor() {
    }

    public mark() {
        this.onMarked.emit();
    }

    ngOnInit() {
    }

}
