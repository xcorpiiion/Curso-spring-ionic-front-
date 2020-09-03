import { PagamentoDTO } from './../../models/pagamento.dto';
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
  pagamentoDTO: PagamentoDTO;
  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.pedido = this.navParams.get('pedido');
    console.log("Pedidos chegou com o valor: ");
    console.log(this.pedido);
    this.formGroup = this.formBuilder.group({
      numeroParcelas: [1, Validators.required],
      "@type": ["PagamentoCartao", Validators.required]
    });
  }

  nextPage() {
    let idCliente = this.pedido.idCliente;
    let idEndereco = this.pedido.enderecoEntrega;
    let tipoPagamento = this.pedido.nomeTipoPagamento;
    let itens = this.pedido.itensPedido;
    this.pagamentoDTO = this.formGroup.value;
    console.log("Pagemento tem o valor: ")
    console.log(this.pagamentoDTO);
    console.log("Pedidos foi com o valor: ");
    this.pedido.idCliente = idCliente;
    this.pedido.enderecoEntrega = idEndereco;
    this.pedido.nomeTipoPagamento = tipoPagamento;
    this.pedido.itensPedido = itens;
    this.pedido.pagamento = this.pagamentoDTO;
    console.log(this.pedido);
    this.navCtrl.setRoot('OrderConfirmationPage', {pedido: this.pedido});
  }

  pagamentoCartao() {
    this.pedido.nomeTipoPagamento = "Cartão";
  }

  pagamentoBoleto() {
    this.pedido.nomeTipoPagamento = "Boleto";
  }

}
