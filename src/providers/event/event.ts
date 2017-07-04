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
private eventsTable:any;
public userId: any;
public currentUser:firebase.User;
public userProfile:firebase.database.Reference;
  constructor() {
    console.log('Hello EventProvider Provider');
    
    this.eventsTable=firebase.database().ref('/events') //Initiate database table
             
     }


createEvent(eventName: string, place: string, date: string): firebase.Promise<any> {
 
  console.log(eventName);
  return firebase.database().ref('/events')
  .push({
    eventName: eventName,
    place: place,
    date: date,
    UserProfileUserId:firebase.auth().currentUser.uid
  });
}

getEventList():firebase.database.Reference  {
  return this.eventsTable;
}

getEventDetail(eventId:string): firebase.database.Reference {
  if(eventId!='null')
  return this.eventsTable.child(eventId);
}

getEditEventDetail(eventId:string): firebase.database.Reference {
  if(eventId!='null')
  return this.eventsTable.child(eventId);
}

editEventDetail(eventId:string,eventName:string, place:string, date:string): firebase.Promise<any>{
  if(eventId!='null')
  return this.eventsTable.child(eventId)
  .update({
    eventName:eventName,
    place:place,
    date:date  
  });
}

deleteEvent(eventId:string): firebase.Promise<any>{
if(eventId!='null')
return this.eventsTable.child(eventId).remove();
}

}