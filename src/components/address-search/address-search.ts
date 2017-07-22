import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from 'angular2-google-maps/core';
import { NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the AddressSearchComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'address-search',
  styles: [`
    agm-map {
      height: 300px;
    }
  `],
  templateUrl: 'address-search.html'
})
export class AddressSearchComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public direction:string;
  public location;
  public placeholderText;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public params: NavParams,
    private viewCtrl: ViewController
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    
    this.direction = this.params.get('direction')=="To" || this.params.get('direction')=="From" ? null:this.params.get('direction');
    this.placeholderText =  this.params.get('direction')=="To" || this.params.get('direction')=="From" ? this.params.get('direction'):"";
    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        console.log("changed");
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.viewCtrl.dismiss(place);
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }
  closeEmpty(){
    this.viewCtrl.dismiss();
  }
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}