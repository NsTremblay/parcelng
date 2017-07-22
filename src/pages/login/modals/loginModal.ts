import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../../providers/auth-service/auth-service';
import { TabsPage } from '../../tabs/tabs';

@Component({

    templateUrl: './loginModal.html'
})
export class LoginModal {
    loading: Loading;
    registerCredentials: FormGroup;
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
        this.registerCredentials = this.fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        })
    }

    login() {
        this.showLoading()
        this.auth.login(this.registerCredentials.value).subscribe(allowed => {
            if (allowed) {
                this.nav.setRoot(TabsPage);
                //this.nav.setRoot('TabsPage');
                this.loading.dismiss();
            } else {
                this.showError("Access Denied");
            }
        },
            error => {
                this.showError(error);
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
            title: 'Fail',
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