import { ClienteService } from './../../services/domain/cliente.service';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
    public cidadeService: CidadeService, public estadoService: EstadoService, public clienteService: ClienteService,
    public alertController: AlertController) {
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', [Validators.required]],
      cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', []],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value).subscribe(Response => {
      this.showInsertOk();
    },
      erros => { });
  }

  showInsertOk() {
    let alert = this.alertController.create({
      title: "Sucesso!",
      message: "Cadastro efetuado com sucesso",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.push('HomePage');
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(Response => {
      this.estados = Response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
      erros => { });
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    },
      erros => { });
  }

}
