import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Directive, Input } from '@angular/core';
declare var google: any;

@Directive({
    selector: 'sebm-google-map-directions'
})
export class DirectionsMapDirective {
    @Input() origin;
    @Input() destination;
    @Input() origin_id;
    @Input() destination_id;
    @Input() directionsDisplay: any;
    @Input() status: string;
    constructor(private gmapsApi: GoogleMapsAPIWrapper) {
    }


    updateDirections(response:any) {
        this.gmapsApi.getNativeMap().then(map => {
            if (!this.origin_id || !this.destination_id) {
                return;
            }
            if (!directionsService) {
                var directionsService = new google.maps.DirectionsService;
            }
            var me = this;
            this.directionsDisplay.setMap(map);
            // var styledMapType = new google.maps.StyledMapType(
            //     [
            //         {
            //             "elementType": "geometry.stroke",
            //             "stylers": [
            //                 {
            //                     "color": "#68f3ff"
            //                 }
            //             ]
            //         },
            //         {
            //             "featureType": "administrative",
            //             "elementType": "geometry",
            //             "stylers": [
            //                 {
            //                     "visibility": "off"
            //                 }
            //             ]
            //         },
            //         {
            //             "featureType": "administrative.land_parcel",
            //             "stylers": [
            //                 {
            //                     "visibility": "off"
            //                 }
            //             ]
            //         },
            //         {
            //             "featureType": "administrative.neighborhood",
            //             "stylers": [
            //                 {
            //                     "visibility": "off"
            //                 }
            //             ]
            //         },
            //         {
            //             "featureType": "poi",
            //             "stylers": [
            //                 {
            //                     "visibility": "off"
            //                 }
            //             ]
            //         },
            //         {
            //             "featureType": "poi",
            //             "elementType": "labels.text",
            //             "stylers": [
            //                 {
            //                     "visibility": "off"
            //                 }
            //             ]
            //         },
            //         {
            //             "featureType": "transit",
            //             "stylers": [
            //                 {
            //                     "visibility": "off"
            //                 }
            //             ]
            //         },
            //         {
            //             "featureType": "water",
            //             "elementType": "labels.text",
            //             "stylers": [
            //                 {
            //                     "visibility": "off"
            //                 }
            //             ]
            //         }
            //     ]
            // );

            map.setOptions(
                {
                    draggable: false,
                    streetViewControl: false,
                    zoomControl: false
                });

            this.directionsDisplay.setOptions({
                polylineOptions: {
                    strokeWeight: 8,
                    strokeOpacity: 1,
                    strokeColor: '#0BE3E3'
                }
            });
            this.directionsDisplay.setDirections({ routes: [] });
            me.directionsDisplay.setDirections(response);
            // map.setZoom(30);

            // var point = response.routes[0].legs[0];

            // console.log(this.origin_id + " - " + this.destination_id);
            // directionsService.route({
            //     origin: { placeId: this.origin_id },
            //     destination: { placeId: this.destination_id },
            //     avoidHighways: false,
            //     travelMode: google.maps.DirectionsTravelMode.DRIVING
            //     //travelMode: 'DRIVING'
            // }, function (response: any, status: any) {
            //     console.log(status);

            //     if (status === 'OK') {
            //         console.log(me.directionsDisplay);
            //         me.directionsDisplay.setDirections(response);
            //         map.setZoom(30);
            //         //console.log(me.getcomputeDistance (latLngA, latLngB));
            //         var point = response.routes[0].legs[0];
            //         this.status = "OK";

            //     } else {
            //         this.directionsDisplay.setDirections({ routes: [] });
            //         this.status = "ZERO_RESULTS";
            //     }
            // });
        });
    }
}