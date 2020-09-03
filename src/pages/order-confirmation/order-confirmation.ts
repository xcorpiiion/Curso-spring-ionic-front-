import { PedidoService } from './../../services/domain/pedido.service';
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
  id: string;
  codigoPedido: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService,
    public clienteService: ClienteService, public pedidoService: PedidoService) {
    this.pedido = this.navParams.get('pedido');
    console.log("Pedido chegou com o valor")
    console.log(this.pedido);
    this.id = this.pedido.enderecoEntrega.idCliente;
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    for(var i = 0; i < this.cartItems.length; i++) {
      this.pedido.produtos[i] = this.cartItems[i].produtoDTO;
    }
    console.log(this.id);
    this.clienteService.findById(this.id).subscribe(response => {
      this.cliente = response as ClienteDTO;
      this.endereco = this.findEndereco(this.pedido.enderecoEntrega.idCliente, response['enderecos']);
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

  checkout() {
    console.log("Dados do pedido");
    console.log(this.pedido);
    this.pedidoService.insert(this.pedido).subscribe(response => {
      this.cartService.createOrClearCart();
      this.codigoPedido = this.extractId(response.headers.get('location'));
    },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  back() {
    this.navCtrl.setRoot('CartPage');
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage');
  }

private extractId(location: string): string {
  let position = location.lastIndexOf('/');
  return location.substring(position + 1);
}

}
