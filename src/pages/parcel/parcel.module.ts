import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParcelPage } from './parcel';

@NgModule({
  declarations: [
    ParcelPage,
  ],
  imports: [
    IonicPageModule.forChild(ParcelPage),
  ],
  exports: [
    ParcelPage
  ]
})
export class ParcelPageModule {}
