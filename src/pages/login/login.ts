import { Component } from '@angular/core';

import { 
  IonicPage, NavController, NavParams,ModalController,
  Loading, LoadingController,  AlertController,App } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { Facebook } from '@ionic-native/facebook'
import firebase from 'firebase';
import {ShareService} from '../services/share-service';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
public loginForm:FormGroup;
public loading:Loading;
userProfile: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public authProvider: AuthProvider, public formBuilder: FormBuilder,
              private facebook: Facebook, public modalCtrl:ModalController, public app:App,
              private shareService: ShareService) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
        EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), 
        Validators.required])]
    });

  }

 loginWithFacebook() {
     this.facebook.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
        .then((success,)  => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
            this.navCtrl.push(TabsPage);
            this.shareService.setEmail(this.userProfile.email);
            //let modal= this.modalCtrl.create(HomePage,this.userProfile);
            //modal.present();
            // this.navCtrl.push(HomePage,this.userProfile);
        })
        .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => { console.log(error) });
}

loginUser(): void {
  if (!this.loginForm.valid){
    console.log(this.loginForm.value);
  } else {
    this.authProvider.loginUser(this.loginForm.value.email, 
        this.loginForm.value.password)
    .then( authData => {   
      this.loading.dismiss().then( () => {
       this.navCtrl.push(TabsPage);
       this.shareService.setEmail(authData.email);
       // this.app.getRootNav().setRoot(TabsPage);
      });
    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });
    this.loading = this.loadingCtrl.create({content : "Logging in , please wait..."});
    this.loading.present();
  }
}
goToSignup(): void { this.navCtrl.push('signup'); }

goToResetPassword(): void { this.navCtrl.push('reset-password'); }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
