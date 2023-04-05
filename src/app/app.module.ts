import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Imports de Firestore
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';






@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    SocialSharing, 
    InAppBrowser
    ],    

  bootstrap: [AppComponent],
})
export class AppModule { }
