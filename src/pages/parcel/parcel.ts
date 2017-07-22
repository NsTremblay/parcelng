import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketProvider, Ticket } from '../../providers/ticket/ticket';
// import { AutocompletePage } from '../../modules/autocomplete';
import { AddressSearchComponent } from '../../components/address-search/address-search';
import { DirectionsMapDirective } from '../../directives/directions-map/directions-map'
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
declare var google: any;



/**
 * Generated class for the ParcelPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-parcel',
  templateUrl: 'parcel.html',
})
export class ParcelPage {

  @ViewChild(DirectionsMapDirective) dm: DirectionsMapDirective;
  ticket: Ticket;
  ticketForm: FormGroup;

  //constants for the map
  latitude: number;
  longitude: number;
  zoom: number;

  options: CameraOptions = {};

  constructor(params: NavParams, private viewControl: ViewController,
    private modalCtrl: ModalController,
    private ticketP: TicketProvider,
    private fb: FormBuilder,
    private geolocation: Geolocation,
    private camera: Camera) {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.ticket = new Ticket();
    this.createNewTicketForm();
    this.setCurrentLocation();
  }

  submitATicket() {
    
    this.ticketP.submitTicket(this.ticket).subscribe(result=>{
      
    });
  }

  getPicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log(base64Image);
    }, (err) => {
      // Handle error
    });
  }

  setCurrentLocation() {
    //only use in the browser
    //this.getPosition();
    this.zoom = 12;
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      if (this.ticketForm.value.origin == "" || this.ticketForm.value.destination == "") {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
      }

    });

  }

  public getPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

    });
  }

  createNewTicketForm() {
    this.ticketForm = this.fb.group({
      origin: ["", Validators.required],
      destination: ["", Validators.required],
      description: ["", Validators.required]
    });
  }

  directionsDisplay: any;

  //call the modal to select the origin of the package
  showFromModal() {
    let tmpDirection = this.ticketForm.value.origin == "" ? "From" : this.ticketForm.value.origin;
    let modal = this.modalCtrl.create(AddressSearchComponent, { direction: tmpDirection });
    modal.onDidDismiss(place => {

      if (!place) { return; }
      this.ticket.from_place = place;
      this.ticket.from_text_address = place.formatted_address;
      this.ticket.from_place_id = place.place_id;
      this.ticketForm.patchValue({ origin: place.formatted_address });
      //update the map and get an estimate
      if (this.ticketForm.value.origin.length > 0
        && this.ticketForm.value.destination.length > 0) {
        this.getTicketEstimate();
      }
    });
    modal.present();
  }

  //call the modal to select the destination of the package
  showToModal() {
    let tmpDirection = this.ticketForm.value.destination == "" ? "To" : this.ticketForm.value.destination;
    let modal = this.modalCtrl.create(AddressSearchComponent, { direction: tmpDirection });
    modal.onDidDismiss(place => {
      if (!place) { return; }
      this.ticket.to_place = place;

      this.ticket.to_text_address = place.formatted_address;
      this.ticket.to_place_id = place.place_id;
      this.ticketForm.patchValue({ destination: place.formatted_address });

      //update the map and get an estimate
      if (this.ticketForm.value.origin.length > 0
        && this.ticketForm.value.destination.length > 0) {
        this.getTicketEstimate();
      }
    });
    modal.present();
  }

  updateMap() {



    var directionsService = new google.maps.DirectionsService;

    var me = this;
    directionsService.route({
      origin: { placeId: this.ticket.from_place_id },
      destination: { placeId: this.ticket.to_place_id },
      avoidHighways: false,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
      //travelMode: 'DRIVING'
    }, function (response: any, status: any) {


      if (status === 'OK') {
        me.ticket.directionsStatus = "OK";
        //update the start and end and ask to redraw the map

        if (me.dm.directionsDisplay === undefined) {
          me.dm.directionsDisplay = new google.maps.DirectionsRenderer;
        };
        me.dm.origin_id = me.ticket.from_place_id;
        me.dm.destination_id = me.ticket.to_place_id;
        me.dm.updateDirections(response);

      } else if (status === 'ZERO_RESULTS') {
        me.ticket.directionsStatus = "ZERO";
        me.dm.updateDirections(response);

      }
    });
  }

  getTicketEstimate() {

    this.ticketP.getTicketEstimate(this.ticket).subscribe(resultPrice => {
      this.ticket.price = resultPrice;
      this.updateMap();
    }, err => {
      console.log(err);
      this.updateMap();
    });
  }

  // openModal(characterNum) {

  //   let modal = this.modalCtrl.create(ModalContentPage, characterNum);
  //   modal.present();
  // }

  //close the current modal
  cancel() {

    this.viewControl.dismiss();
  }

}

export class GeoService {
  public pos: any;


}

