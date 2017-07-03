import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase'

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class EventProvider {
public eventList: Array<any>;
  constructor() {
    console.log('Hello EventProvider Provider');
  }


createEvent(eventName: string, place: string, date: string): firebase.Promise<any> {
  
  console.log(eventName);
  
  return firebase.database().ref('/events')
  .push({
    eventName: eventName,
    palce: place,
    date: date
  });
}

getEventList():firebase.database.Reference  {
  return firebase.database().ref('/events')
}

getEventDetail(eventId:string): firebase.database.Reference {
  return firebase.database().ref('/events').child(eventId);
}
}