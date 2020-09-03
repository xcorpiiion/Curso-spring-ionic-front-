import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produto_service: ProdutoService,
    public cart_service: CartService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produtoId');
    this.produto_service.findBYId(produto_id).subscribe(response => {
      this.item = response;
    },
    error => {});
  }

  getImageUrlIfExists() {
    this.produto_service.getImageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
    }),
    error => {}; 
  }

  addToCart(produto: ProdutoDTO) {
    this.cart_service.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
