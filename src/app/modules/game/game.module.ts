import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CellComponent } from './cell/cell.component';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';


@NgModule({
    declarations: [CellComponent, GameComponent],
    imports: [
        CommonModule,
        SharedModule,
        GameRoutingModule
    ]
})
export class GameModule {
}
