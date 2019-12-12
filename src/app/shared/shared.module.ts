import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        MatButtonModule
    ]
})
export class SharedModule {
}
