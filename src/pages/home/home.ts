import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,PopoverController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {PopoverComponent} from '../../components/popover/popover'
import {ShareService} from '../services/share-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public name:any;
public email:any;
public displayImage:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public modalController:ModalController,public authProvider: AuthProvider,
              public popoverCtrl: PopoverController,private shareService: ShareService  
              ) {
                

  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverComponent, {
    });
    popover.present({
      ev: ev
    });
  }

  ionViewDidLoad(){
     //console.log(this.navParams.get('userProfile'));
     this.name=this.navParams.get('displayName');
     //this.email=this.navParams.get('email');
     this.displayImage=this.navParams.get('photoURL');
    // console.log(this.data);
     this.email = this.shareService.getEmail();

  }

  
  
  // logoutUser():void{
  //   this.authProvider.logoutUser();
  //   this.navCtrl.setRoot('login');
  // }

}

