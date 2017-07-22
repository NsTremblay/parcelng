import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { TabsPage } from '../../tabs/tabs';

@Component({
  templateUrl:'./createNewAccountModal.html',
})
export class CreateNewAccountModal {

  registrationForm :FormGroup;
 constructor(public viewCtrl: ViewController,
  public fb: FormBuilder) {
  this.createForm();
 }

  createForm(){
   this.registrationForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required]
   }, {
        validator: this.matchingPasswords('password', 'confirmPassword')
      });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

 dismiss() {
   this.viewCtrl.dismiss();
 }

}