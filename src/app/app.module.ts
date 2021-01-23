import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injectable } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IconsComponent } from './icons/icons.component';
import { IconComponent } from './icons/icon.component';
import { RubiksSceneComponent } from './rubiks/rubiks-scene.component';
import { HomeComponent } from './home/home.component';
import { LevelsComponent } from './levels/levels.component';
import { LevelComponent } from './level/level.component';
import { LevelInstructionsComponent } from './level/instructions/level-instructions.component';
import { PlayComponent } from './play/play.component';
import { AlgorithmsComponent } from './algorithms/algorithms.component';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any> {
    pinch: { enable: false },
    rotate: { enable: false },
    pan: { direction: Hammer.DIRECTION_ALL, threshold: 0 }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    IconsComponent,
    IconComponent,
    RubiksSceneComponent,
    HomeComponent,
    LevelsComponent,
    LevelInstructionsComponent,
    LevelComponent,
    PlayComponent,
    AlgorithmsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HammerModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
