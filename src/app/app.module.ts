import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule} from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';


import { HistoryPage } from '../pages/history/history';
import { ProfilePage } from '../pages/profile/profile';
import { HomePage } from '../pages/home/home';
import { ParcelPage } from '../pages/parcel/parcel';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { TicketProvider } from '../providers/ticket/ticket';
import { AddressSearchComponent } from '../components/address-search/address-search';
//custom directive
import { DirectionsMapDirective } from '../directives/directions-map/directions-map';
import { GoogleMapsAPIWrapper } from 'angular2-google-maps/core/services/google-maps-api-wrapper';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginModal } from '../pages/login/modals/loginModal';
import { CreateNewAccountModal } from '../pages/login/modals/createNewAccountModal';

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    ProfilePage,
    HomePage,
    ParcelPage,
    AddressSearchComponent,
    DirectionsMapDirective,
    TabsPage,
    LoginModal,
    CreateNewAccountModal
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDyWZvwVX8t7cZWFl2A7t_pbsNK1_oDrhw",
      libraries: ["places"]
    }),
    HttpModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()
    
  ], 
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HistoryPage,
    ProfilePage,
    HomePage,
    ParcelPage,
    AddressSearchComponent,
    TabsPage,
    LoginModal,
    CreateNewAccountModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TicketProvider,
    Geolocation,
    GoogleMapsAPIWrapper,
    Camera,
    AuthServiceProvider
  ],
  schemas:[MapsAPILoader]
})
export class AppModule {}
