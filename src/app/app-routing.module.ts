import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VlogerComponent } from './vloger/vloger.component';
import { ChannelsComponent} from './channels/channels.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {TermsComponent} from './terms/terms.component';
import {ContactsComponent} from './contacts/contacts.component';
import {MusicComponent} from './music/music.component';
import {ArtistprofileComponent} from './artistprofile/artistprofile.component';
const routes: Routes = [
 
  {path:'',component:HomeComponent, data: {depth: 1}},
  {path:'channels',component:ChannelsComponent, data: {depth: 2}},
  {path:'vloger',component:VlogerComponent, data: {depth: 3}},
  {path:'contacts',component:ContactsComponent,data: {depth: 3}},
  {path:'privacy',component:PrivacyComponent,data: {depth: 3}},
  {path:'t&c',component:TermsComponent,data: {depth: 3}},
  {path:'music',component:MusicComponent,data: {depth: 2}},
  {path:'artist',component:ArtistprofileComponent,data: {depth: 2}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
