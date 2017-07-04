import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController,AlertController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

/**
 * Generated class for the EventEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'event-edit',
  segment: 'event-edit/:eventId'
})
@Component({
  selector: 'page-event-edit',
  templateUrl: 'event-edit.html',
})
export class EventEditPage {
public currentEvent:any;
public editEventsForm: FormGroup;
public loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public eventProvider: EventProvider,
              public formBuilder: FormBuilder,public viewCtrl:ViewController, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
                    
                    if (this.navParams.get('eventId')!='null')
                    this.eventProvider.getEditEventDetail(this.navParams.get('eventId'))
                    .on('value', eventSnapshot => {
                      this.currentEvent = eventSnapshot.val();
                      this.currentEvent.id = eventSnapshot.key;
                    });

                    this.editEventsForm = formBuilder.group({
                    eventName: [this.currentEvent.eventName],
                    place: [this.currentEvent.place],
                    date: [this.currentEvent.date]
                  });

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventEditPage');

  
  //     if (this.navParams.get('eventId')!='null'){
//   this.eventProvider.editEventDetail(this.navParams.get('eventId'),eventName, place: string,date:string)
// }
  // }


  }


  goToEditEventDetails(){
    if(this.navParams.get('eventId')!='null'){
    this.eventProvider.editEventDetail(this.navParams.get('eventId'),this.editEventsForm.value.eventName,
    this.editEventsForm.value.place,this.editEventsForm.value.date)
        .then((data) => {
      this.loading.dismiss().then( () => {
        this.navCtrl.pop();
        let alert = this.alertCtrl.create({
          message: 'Your Event has been updated successfully.',
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    }, (error) => {
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
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
  }
}
