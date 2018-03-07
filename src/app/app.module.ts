import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

//FIREBASE
import { AngularFireModule } from 'angularfire2';
export const firebaseConfig = environment.firebaseConfigs;
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AgmCoreModule } from '@agm/core';
import { GoogleMapComponent } from './google-map/google-map.component';
import { ContatoComponent } from './contato/contato.component';
import { IssueComponent } from './issue/issue.component';

//import { GoogleMapModule } from './google-map/google-map.module'

import { ContatoModule } from './contato/contato.module';
import { IssueModule } from './issue/issue.module';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    StaticModule,
    SettingsModule,

    // app
    AppRoutingModule,

    ContatoModule,

    IssueModule,

    //GoogleMapModule,
    //BARRA DE NOTIFICAÇÃO
     //SnackbarModule,

    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
    
  ],
  declarations: [AppComponent, GoogleMapComponent, ContatoComponent, IssueComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
