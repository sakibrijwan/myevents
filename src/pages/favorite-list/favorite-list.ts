import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {PopoverComponent} from '../../components/popover/popover'

/**
 * Generated class for the FavoriteListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-favorite-list',
  templateUrl: 'favorite-list.html',
})
export class FavoriteListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }

    presentPopover(ev) {
    let popover = this.popoverCtrl.create(PopoverComponent, {
    });
    popover.present({
      ev: ev
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteListPage');
  }

}