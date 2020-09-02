import { StorageService } from './../../services/storage_service';
import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-escolher-endereco',
  templateUrl: 'escolher-endereco.html',
})
export class EscolherEnderecoPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public clienteService: ClienteService,
    public storage: StorageService) {
  }

  ionViewDidLoad() {
    let LocalUser = this.storage.getLocalUser();
    if (LocalUser && LocalUser.email) {
      this.clienteService.findByEmail(LocalUser.email).subscribe(response => {
        this.items = response['enderecos'];
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

}
