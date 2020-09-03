import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { CartService } from './../../services/domain/cart.service';
import { CarItem } from './../../models/cart_item';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CarItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService,
    public clienteService: ClienteService) {
    this.pedido = this.navParams.get('pedido');
    console.log("Pedido chegou com o valor")
    console.log(this.pedido);
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id).subscribe(response => {
      this.cliente = response as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.enderecoEntrega.id, response['enderecos']);
    },
    erros => {
      this.navCtrl.setRoot('HomePage');
    });
  }

  private findEndereco(id: string, enderecos: EnderecoDTO[]): EnderecoDTO {
    let position = enderecos.findIndex(endereco => endereco.id == id);
    return enderecos[position];
  }

  total() {
    return this.cartService.totalCarrinho();
  }

}
