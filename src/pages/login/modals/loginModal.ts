import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController, LoadingController, Loading, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { TabsPage } from '../../tabs/tabs';

@Component({

    templateUrl: './loginModal.html'
})
export class LoginModal {
    loading: Loading;
    loginForm: FormGroup;
    constructor(public viewCtrl: ViewController,
        public nav: NavController,
        private auth: AuthServiceProvider,
        private alertCtrl: AlertController,
        public navParams: NavParams,
        private loadingCtrl: LoadingController,
        private fb: FormBuilder) {
            this.buildForm();
    }

    buildForm() {
        this.loginForm = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        })
    }

    login() {
        this.showLoading()
        this.auth.login({
                name:this.loginForm.value.email,
                password:this.loginForm.value.password
            }).subscribe(allowed => {
            if (allowed.message=="ok") {

                //store the token
                this.auth.storeToken(allowed.token);
                this.nav.setRoot(TabsPage);
                
                //this.nav.setRoot('TabsPage');
                this.loading.dismiss();
            } else {
                this.showError("Access Denied");
            }
        },
            error => {
                let sM = error.json().message;
                if(sM == "an error occured"){
                    this.showError("Something unexpected happened");
                }else if(sM == "noUser"){
                    this.showError("Sorry, we could not find this user, please try a different user");
                }else{
                    this.showError("Something unexpected happened");
                }
            });
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'Oups',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    dismiss() {
        let data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(data);
    }

}