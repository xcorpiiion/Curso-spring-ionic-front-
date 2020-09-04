import { Camera } from '@ionic-native/camera';
import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { CameraOptions } from '@ionic-native/camera';

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
  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService,
    public clienteService: ClienteService, public camera: Camera) {
  }

  ionViewDidLoad() {
   this.carregarDados();
  }

  carregarDados() {
    let LocalUser = this.storage.getLocalUser();
    if (LocalUser && LocalUser.email) {
      this.clienteService.findByEmail(LocalUser.email).subscribe(response => {
        this.cliente = response as ClienteDTO;
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

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
    });
  }

  sendPicture() {
    this.clienteService.uploadPicture(this.picture).subscribe(response => {
      this.picture = null;
      this.ionViewDidLoad();
    },
    errors => {});
  }

  cancel() {
    this.picture = null;
  }
}
