import { ProdutoDTO } from './../../models/produto.dto';
import { Cart } from './../../models/cart';
import { StorageService } from './../storage_service';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../../config/api.config';

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
        let position = cart.items.findIndex(id => id.produtoDTO.id == produto.id);
        if (position == -1) {
            cart.items.push({ quantidade: 1, produtoDTO: produto });
        }
        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        for (var i = 0; i < cart.items.length; i++) {
            cart.items[i].produtoDTO = produto;
        }
        let position = cart.items.findIndex(id => id.produtoDTO.id == produto.id);
        if (position != -1) {
            cart.items.splice(position, 1);
        }
        this.storage.setCart(cart);
        return cart;
    }

    recuperaUrlProduto(produtoDTO: ProdutoDTO): string {
        return `${API_CONFIG.bucketBaseUrl}/prod${produtoDTO.id}-small.jpg`;
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let url = [];
        for (var i = 0; i < cart.items.length; i++) {
            cart.items[i].produtoDTO.imageUrl = this.recuperaUrlProduto(cart.items[i].produtoDTO);
        }
        let position = cart.items.findIndex(id => id.produtoDTO.id == produto.id);
        if (position != -1) {
            cart.items[position].quantidade++;
        }
        this.storage.setCart(cart);
        return cart;
    }

    dencreaseQuantity(produto: ProdutoDTO): Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(id => id.produtoDTO.id == produto.id);
        if (position > -1 && cart.items[position].quantidade > 1) {
            cart.items[position].quantidade--;
        } else {
            cart = this.removeProduto(produto);
        }
        this.storage.setCart(cart);
        return cart;
    }

    totalCarrinho(): number {
        let cart = this.getCart();
        let valorTotalCarrinho = 0;
        for (var i = 0; i < cart.items.length; i++) {
            valorTotalCarrinho += cart.items[i].produtoDTO.preco * cart.items[i].quantidade;
        }
        return valorTotalCarrinho;
    }
}