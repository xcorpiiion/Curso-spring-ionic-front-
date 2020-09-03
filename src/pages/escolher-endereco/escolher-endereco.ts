import { ProdutoDTO } from './../../models/produto.dto';
import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
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

  enderecos: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public clienteService: ClienteService,
    public storage: StorageService, public cartService: CartService) {
  }

  ionViewDidLoad() {
    let LocalUser = this.storage.getLocalUser();
    console.log("fora do if");
    let produtos = [this.cartService.getCart().items[0].produtoDTO];
    for (var i = 1; i < this.cartService.getCart().items.length; i++) {
      produtos.push(this.cartService.getCart().items[i].produtoDTO);
    }
    if (LocalUser && LocalUser.email) {
      console.log("entrou no if");
      this.clienteService.findByEmail(LocalUser.email).subscribe(response => {
        this.enderecos = response['enderecos'];
        let cart = this.cartService.getCart();
        let id = { id: response['id'] };
        console.log(id);
        this.pedido = {
          idCliente: response['id'],
          nomeTipoPagamento: null,
          numeroParcelas: null,
          enderecoEntrega: null,
          pagamento: null,
          produtos: produtos,
          itensPedido: cart.items.map(x => { return { quantidade: x.quantidade, produto: { idCliente: x.produtoDTO.id } } })
        }
        console.log(this.pedido);
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

  nextPage(enderecoDTO: EnderecoDTO) {
    this.pedido.enderecoEntrega = this.pedido.enderecoEntrega = { idCliente: enderecoDTO.id };
    console.log("dados são: ");
    console.log(this.pedido);
    this.navCtrl.push('PagamentoPage', { pedido: this.pedido });
  }

}
