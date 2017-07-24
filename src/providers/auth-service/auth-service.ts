import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';

const connectionString = "http://localhost:8080/";

export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {


  currentUser: User;
  
  constructor(private http: Http,
    private storageS: Storage){

  }

  login(credentials) {

    console.log(credentials);
    
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this.http.post(connectionString+'login', credentials).map(this.mapLogin);
      // return Observable.create(observer => {
      //   // At this point make a request to your backend to make a real check!
      //   let access = (credentials.password === "pass" && credentials.email === "email");
      //   this.currentUser = new User('Nicolas', 'ns.tremblay@gmail.com');
      //   observer.next(access);
      //   observer.complete();
      // });
    }
  }

  mapLogin(r:Response){
    let tr = r.json();
    return tr || "nothing";
  }
 
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  createAccount(credentials):Observable<Object>{
    return this.http.post(connectionString+"signup", {name:credentials.email,password:credentials.password})
    
    .map(this.mapCreateAccount);
  }

  // handleError(err:Response):string{
  //   let res = err.json();
  //   console.log(err)
  //   if(err.status==401){
  //     let message = err.json();
  //     console.log(message.message);
  //     return err.json();
  //   }
  //   return err.json();
  // }

  mapCreateAccount(response:Response){
    console.log(response)
    let res = response.json();
    
    return res.message || "";
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  storeToken(token:string){
    this.storageS.set("loginToken",token);
  }

  loginWithToken(token:string):Observable<Response>{
      let myHeaders = new Headers();
      myHeaders.append('Authorization', 'JWT '+token);
      return this.http.post(connectionString+'testToken', {},{headers:myHeaders});
  }

}

