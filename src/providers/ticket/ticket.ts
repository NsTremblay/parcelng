import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the TicketProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TicketProvider {

  private ticketEndpoint :string = "http://localhost:8080/api/ticket";
  
  constructor(public http: Http) {
  }

  //Send the from and to address with text and then return
  //Pricing, coordinates
  getTicketEstimate(ticket:Ticket):Observable<string>{
    return this.http.post(this.ticketEndpoint+"/estimate", ticket).map(this.extractTicketEstimate);
  }
  extractTicketEstimate(res : Response){
    let body = res.json();
    return body.price || "";
  }
  submitTicket(ticket:Ticket):Observable<string>{
    return this.http.post(this.ticketEndpoint+"/submit", ticket).map(this.ticketSubmissionResult);
  }
  ticketSubmissionResult(result :Response){
    let res = result.json();
    return res.message || "";
  }
}


export class Ticket{

  from_coordinates:string ="";
  to_coordinates:string="";
  from_text_address:string="";
  to_text_address:string="";
  price:string="";
  from_place_id:"";
  to_place_id:"";

  from_place:any;
  to_place:any;

  directionsStatus:string;

}