import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AddressSearchComponent } from './address-search';

@NgModule({
  declarations: [
    AddressSearchComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    AddressSearchComponent
  ]
})
export class AddressSearchComponentModule {}
