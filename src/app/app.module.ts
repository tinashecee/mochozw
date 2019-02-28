import { BrowserModule , BrowserTransferStateModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NgxTweetModule } from "ngx-tweet";
import { NguCarouselModule } from '@ngu/carousel';
import { SeoService} from './seo.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatToolbarModule,MatSidenavModule,MatButtonModule,MatMenuModule,MatTabsModule,MatDividerModule,MatIconModule,MatCardModule,MatListModule} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VlogerComponent } from './vloger/vloger.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { ChannelsComponent } from './channels/channels.component';
import { SortPipePipe} from './sort-pipe.pipe';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { ContactsComponent } from './contacts/contacts.component';
import { MusicComponent } from './music/music.component';
import { ArtistprofileComponent } from './artistprofile/artistprofile.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VlogerComponent,
    SafeUrlPipe,
    ChannelsComponent,
    SortPipePipe,
    PrivacyComponent,
    TermsComponent,
    ContactsComponent,
    MusicComponent,
    ArtistprofileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule.forRoot(),
    BrowserTransferStateModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase,'mochoApp'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    DragScrollModule,
    FlexLayoutModule,
    NgxTweetModule,
    NguCarouselModule,
    MatTabsModule,MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    NgMasonryGridModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [SeoService],
  bootstrap: [AppComponent],
  exports:[ MatTabsModule,MatListModule,MatDividerModule,
    MatCardModule,MatToolbarModule,MatMenuModule,MatButtonModule,MatSidenavModule]
})
export class AppModule { }
