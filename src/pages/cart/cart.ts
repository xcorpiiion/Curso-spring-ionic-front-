import { CartService } from './../../services/domain/cart.service';
import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarItem } from '../../models/cart_item';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CarItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public cart_service: CartService,
    public produto_service: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cart_service.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      console.log("O item é: " + item.produtoDTO.nome);
      this.produto_service.getSmallImageFromBucket(item.produtoDTO.id)
        .subscribe(response => {
          item.produtoDTO.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produtoDTO.id}-small.jpg`;
        },
        error => {});
    }
  }  

  removeItem(produto: ProdutoDTO) {
    this.items = this.cart_service.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cart_service.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cart_service.dencreaseQuantity(produto).items;
  }

  total() : number {
    return this.cart_service.totalCarrinho();
  }  

  continuarComprando() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
