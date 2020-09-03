import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produto_service: ProdutoService,
    public cart_service: CartService, public loadingControl: LoadingController) {
  }

  ionViewDidLoad() {
    this.carregarDados();
  }

  carregarDados() {
    let produto_id = this.navParams.get('produtoId');
    let loader = this.presentLoading();
    this.produto_service.findBYId(produto_id).subscribe(response => {
      this.item = response;
      loader.dismiss();
    },
    error => {
      loader.dismiss();
    });
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

  presentLoading() {
    let loader = this.loadingControl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.carregarDados();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
