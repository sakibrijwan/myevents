import {Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,ViewController,LoadingController,AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EventProvider } from '../../providers/event/event';
/**
 * Generated class for the EventCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'event-create'
})
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})

export class EventCreatePage {
public eventCreateForm:FormGroup;
public loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController,
              public viewCtrl:ViewController, public formBuilder: FormBuilder,
              public eventProvider: EventProvider, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

                    this.eventCreateForm = formBuilder.group({
                    eventName: ['', Validators.compose([Validators.required])],
                    place: ['', Validators.compose([Validators.required])],
                    date: ['', Validators.compose([Validators.required])]
                  });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCreatePage');
  }
  eventClose(){
    this.viewCtrl.dismiss();
  }

  eventCreate(): void{
 if (!this.eventCreateForm.valid){
    console.log(this.eventCreateForm.value);
  } else {
    this.eventProvider.createEvent(this.eventCreateForm.value.eventName,
    this.eventCreateForm.value.place,this.eventCreateForm.value.date)
    .then((data) => {
      this.loading.dismiss().then( () => {
        this.navCtrl.pop();
        let alert = this.alertCtrl.create({
          message: 'Your Event has been created successfully.',
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
    //this.loading.present();
  }
}  

}
