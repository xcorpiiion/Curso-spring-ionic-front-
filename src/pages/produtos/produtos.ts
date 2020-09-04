import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public produto_service: ProdutoService,
    public loadingControl: LoadingController) {
  }


  ionViewDidLoad() {
    this.carregarDados();
  }

  carregarDados() {
    let loader = this.presentLoading();
    let categoria_id = this.navParams.get('categoriaId');
    this.produto_service.findByCategoria(categoria_id, this.page, 10).subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length - 1;
      this.loadImageUrls(start, end);
      loader.dismiss();
    },
      erro => {
        loader.dismiss();
      });
  }

  loadImageUrls(start: number, end: number) {
    for (var i = start; i < end; i++) {
      let item = this.items[i];
      this.produto_service.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error => { });
    }
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', { produtoId: produto_id });
  }

  presentLoading() {
    let loader = this.loadingControl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.carregarDados();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.carregarDados();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}

