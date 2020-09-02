import { ProdutoDTO } from './../../models/produto.dto';
import { Cart } from './../../models/cart';
import { StorageService } from './../storage_service';
import { Injectable } from "@angular/core";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {

    }

    createOrClearCart(): Cart {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        cart.items[0].produto = produto;
        console.log(cart.items[0]);
        let position = cart.items.findIndex(id => id.produto.id == produto.id);
        if (position == -1) {
            cart.items.push({ quantidade: 1, produto: produto });
        }
        this.storage.setCart(cart);
        return cart;
    }
}