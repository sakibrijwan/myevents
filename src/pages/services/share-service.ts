
export class ShareService {  
  
    email:string;
    firstName: string;
    lastName: string;
 
    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.email='';
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
}