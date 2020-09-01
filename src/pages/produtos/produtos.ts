import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produto_service: ProdutoService) {
  }
  

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoriaId');
    this.produto_service.findByCategoria(categoria_id).subscribe(response => {
      this.items = response['content'];
    },
    erro => {});
  }

}
