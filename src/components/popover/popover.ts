import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { NavController,App,ViewController,Loading, LoadingController  } from 'ionic-angular';


/**
 * Generated class for the PopoverComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  public loading:Loading;

  constructor(public authProvider: AuthProvider, public navCtrl: NavController,
               public app: App, public viewCtrl: ViewController,public loadingCtrl: LoadingController,) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
  }

    logoutUser():void{
    this.authProvider.logoutUser()
     .then( authData => {
      this.loading.dismiss().then( () => {     
        this.navCtrl.push('login');
        //this.app.getRootNav().setRoot('login');
       // this.app.getActiveNav().setRoot('login');
        this.viewCtrl.dismiss();
      });
    });
    this.loading = this.loadingCtrl.create({content : "Logging Out , please wait..."});
    this.loading.present();
  }

}
