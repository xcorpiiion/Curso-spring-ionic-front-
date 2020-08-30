import { AuthService } from './../../services/auth.service';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciaisDTO: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    if (this.auth.refreshToken() != null) {
      this.auth.refreshToken().subscribe(response => {
        if (this.auth.storage.getLocalUser() == null) {
          this.navCtrl.setRoot('HomePage');
        } else {
          this.auth.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriasPage');
        }
      },
        error => { }
      );
    }
  }

  login() {
    this.auth.authenticate(this.credenciaisDTO).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
      error => { }
    );
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
