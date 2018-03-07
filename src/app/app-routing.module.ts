import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings';
import { ContatoComponent } from './contato/contato.component'
import { IssueComponent } from './issue/issue.component'
import { GoogleMapComponent } from './google-map/google-map.component';

const routes: Routes = [

  {
    path: '', redirectTo: 'about', pathMatch: 'full'
  },
  {

    path: 'contato',      component: ContatoComponent 
  },
  {
    path: 'issue',      component: IssueComponent 
  },
  {
    path: 'settings', component: SettingsComponent, data: { title: 'Settings'}
  },
  {
    path: 'examples', loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: '**', redirectTo: 'about'
  },
  {
    path: 'google-map', component: GoogleMapComponent, data: { title: 'google-map'}
  }

];

@NgModule({

  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]

})

export class AppRoutingModule {}
