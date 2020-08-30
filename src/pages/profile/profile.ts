import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { LocalUser } from './../../models/local_user';
import { StorageService } from './../../services/storage_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let LocalUser = this.storage.getLocalUser();
    if (LocalUser && LocalUser.email) {
      this.clienteService.findByEmail(LocalUser.email).subscribe(response => {
        this.cliente = response;
        this.getImageIfExists();
      },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`
    },
      error => { });
  }

}
