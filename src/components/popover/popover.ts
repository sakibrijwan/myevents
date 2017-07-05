import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { NavController,App,ViewController,Loading, LoadingController,AlertController  } from 'ionic-angular';
import {ShareService} from '../../pages/services/share-service';


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
public displayImage:any;
public email: any;
  text: string;
  public loading:Loading;

  constructor(public authProvider: AuthProvider, public navCtrl: NavController,
               public app: App, public viewCtrl: ViewController,public loadingCtrl: LoadingController,
               private shareService: ShareService,public alertCtrl: AlertController  ) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
    this.displayImage=this.shareService.getphotoURL();
    this.email=this.shareService.getEmail();  
}

confirmLogout(){
 let alert = this.alertCtrl.create({
          message: 'Do you want to Logout?',
          buttons: [
            {
              text: "Cancel",
              role: 'cancel',   
              handler: () => {
              this.viewCtrl.dismiss();
            console.log('Cancel clicked');
        }
            },
                  {
        text: 'Ok',
        handler: () => {
            this.logoutUser();
            console.log('Ok clicked');
        }
      }
          ]
        });
        alert.present();

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
