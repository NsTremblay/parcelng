import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';

@Component({
  templateUrl:'./createNewAccountModal.html',
})
export class CreateNewAccountModal {

  registrationForm :FormGroup;
  message:string;
  
 constructor(public viewCtrl: ViewController,
  private fb: FormBuilder,
  private auth: AuthServiceProvider ) {
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

  createAccount(){
    this.auth.createAccount(this.registrationForm.value).subscribe(r => {
      console.log(r);
      if(r==="newUserSuccess"){
        this.message = "Created the account successfully";
      }
    },err=>{
      console.log(err.json().messaged); 
      if(err.json().message=="alreadyExist"){
        this.message = "This user is already registered";
      }
    })
  }

 dismiss() {
   this.viewCtrl.dismiss();
 }

}