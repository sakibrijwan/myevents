import { Component,NgZone } from '@angular/core';
import { NavController, NavParams,ModalController,PopoverController,ViewController,LoadingController,AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {PopoverComponent} from '../../components/popover/popover'
import { EventProvider } from '../../providers/event/event';
import {ShareService} from '../services/share-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public name:any;
public email:any;
public loading:any;
public displayImage:any;
public eventList: Array<any>=[{}];
zone:NgZone;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public modalController:ModalController,public authProvider: AuthProvider,
              public popoverCtrl: PopoverController,private shareService: ShareService,
              public eventProvider:EventProvider,public viewCtrl:ViewController, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController  
              ) {
                this.zone=new NgZone({enableLongStackTrace: false});               

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
ionViewDidEnter() {
   this.eventProvider.getEventList().orderByChild('date')
   .on('value', snapshot => {
    this.eventList = [];
    this.zone.run(()=>{
    snapshot.forEach( snap => {
      this.eventList.push({
        id:snap.key,
        eventName: snap.val().eventName,
        place: snap.val().place,
        date: snap.val().date,
      });
      return false
    });
    });
  });;
   console.log(this.eventList);
}

goToEventDetail(eventId){
 this.navCtrl.push('event-detail', { 'eventId': eventId });
}

goToEditEventDetail(eventId){
 this.navCtrl.push('event-edit', { 'eventId': eventId });
}

goToDeleteEvent(eventId){
     
        let alert = this.alertCtrl.create({
          message: 'Do you want to delete this event?',
          buttons: [
            {
              text: "Cancel",
              role: 'cancel'
            },
                  {
        text: 'Ok',
        handler: () => {
          this.eventProvider.deleteEvent(eventId);
          console.log('Buy clicked');
        }
      }
          ]
        });
        alert.present();
    
}

}

