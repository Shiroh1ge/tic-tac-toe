import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellComponent } from './game/cell/cell.component';
import { GameComponent } from './game/game.component';
import { Effects } from './store/effects';
import { metaReducers, reducers } from './store/store';

@NgModule({
    declarations: [
        AppComponent,
        GameComponent,
        CellComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        EffectsModule.forRoot([...Effects]),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
