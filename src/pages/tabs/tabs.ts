import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {HomePage} from '../home/home'
import {EventCreatePage} from '../event-create/event-create'
import {ProfilePage} from '../profile/profile'
import {FavoriteListPage} from '../favorite-list/favorite-list'
/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'tabs'
})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FavoriteListPage;
  tab3Root = ProfilePage;

public name:any;
public email:any;
public displayImage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
     this.name=this.navParams.get('displayName');
     this.email=this.navParams.get('email');
     this.displayImage=this.navParams.get('photoURL');
  }
  
  goToEventCreate(): void {     
    let modal= this.modalCtrl.create(EventCreatePage);
    modal.present(); }
  

}
