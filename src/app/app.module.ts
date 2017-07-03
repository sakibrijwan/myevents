import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Facebook } from '@ionic-native/facebook'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthProvider } from '../providers/auth/auth';
import {TabsPage} from '../pages/tabs/tabs'
import {EventCreatePage} from '../pages/event-create/event-create'
import {ProfilePage} from '../pages/profile/profile'
import {FavoriteListPage} from '../pages/favorite-list/favorite-list'
import { PopoverComponent } from '../components/popover/popover';
import {ShareService} from '../pages/services/share-service';
import { EventProvider } from '../providers/event/event';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    EventCreatePage,
    FavoriteListPage,
    ProfilePage,    
    PopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    EventCreatePage,
    ProfilePage,
    FavoriteListPage,
    PopoverComponent
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ShareService,
    EventProvider
  ]
})
export class AppModule {}
