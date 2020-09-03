import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  pedido: PedidoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.pedido = this.navParams.get('pedido');
    this.formGroup = this.formBuilder.group({
      numeroParcelas: [1, Validators.required],
      "@type": ["PagamentoCartao", Validators.required]
    });
  }

  nextPage() {
    this.pedido = this.formGroup.value;
    console.log(this.pedido);
  }

}
