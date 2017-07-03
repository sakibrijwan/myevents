import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import {TabsPage} from '../pages/tabs/tabs'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  zone: NgZone;
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
 
 var config = {
    apiKey: "AIzaSyBXmZRlFuP4XO1oRWHrLrBNOoQXQy4abqY",
    authDomain: "myevents-ddf66.firebaseapp.com",
    databaseURL: "https://myevents-ddf66.firebaseio.com",
    projectId: "myevents-ddf66",
    storageBucket: "myevents-ddf66.appspot.com",
    messagingSenderId: "1062080339674"
  };
  firebase.initializeApp(config);


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.zone = new NgZone({});
const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  this.zone.run( () => {
    if (!user) {
      this.rootPage = 'login';
      unsubscribe();
    } else { 
      this.rootPage = TabsPage;
      unsubscribe();
    }
  });     
});


    });
  }
}

