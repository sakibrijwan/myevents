
export class ShareService {  
  
    email:string;
    //uid:string;
    firstName: string;
    lastName: string;
    photoURL:string;
 
    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.email='';
        this.photoURL='';
    }
  
      setEmail(email) {
        this.email = email;
    }
      getEmail() {
        return this.email;
    } 

    setUserName(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;       
    }
  
    getUserName() {
        return this.firstName + ' ' + this.lastName;
    } 

    setphotoURL(photoURL){
        this.photoURL=photoURL;
    }  

    getphotoURL(){
        return this.photoURL;
    }
}