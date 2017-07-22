import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ModalController, ViewController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { CreateNewAccountModal } from './modals/createNewAccountModal';
import { LoginModal } from './modals/loginModal';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials: FormGroup;

  constructor(public modalCtrl: ModalController,
    public nav: NavController,
    private auth: AuthServiceProvider,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder) {
    this.buildForm();
  }

  public createAccount() {
    this.nav.push('RegisterPage');
  }

  public forgotPassword() {
    this.nav.push('ForgotPasswordPage');
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
        // this.nav.setRoot('TabsPage');
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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

  createANewAccountModal() {
    let createNewAccountModal = this.modalCtrl.create(CreateNewAccountModal);
    createNewAccountModal.present();
  }

  loginModal(){
    let loginModal = this.modalCtrl.create(LoginModal);
    loginModal.present();
}

}

