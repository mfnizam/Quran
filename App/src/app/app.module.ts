import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
registerLocaleData(localeId);
import { FormsModule } from '@angular/forms';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

import { HttpClientModule } from '@angular/common/http';

import { PublicGuardService } from './services/guard/public-guard.service';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: 'masuk',
    loadChildren: () => import('./pages/auth/masuk/masuk.module').then( m => m.MasukPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'daftar',
    loadChildren: () => import('./pages/auth/daftar/daftar.module').then( m => m.DaftarPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    loadChildren: () => import('./pages/public/public.module').then(m => m.PublicPageModule),
    canActivate: [PublicGuardService]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

// services
import { ServerService } from './services/server/server.service';
import { StorageService } from './services/storage/storage.service';
import { ModalService } from './services/modal/modal.service';
import { CameraService } from './services/camera/camera.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule, 
    // BrowserAnimationsModule,
  	IonicModule.forRoot(), 
  	RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    HTTP,
    File,
    NativeAudio,
    Diagnostic,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'id-ID'},

    // -- services
    ServerService,
    StorageService,
    ModalService,
    CameraService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
