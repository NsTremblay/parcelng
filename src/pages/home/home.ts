import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { ParcelPage } from '../parcel/parcel';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  presentNewPackageModal() {
    let profileModal = this.modalCtrl.create(ParcelPage, { userId: 8675309 });
    profileModal.present();
  }

}