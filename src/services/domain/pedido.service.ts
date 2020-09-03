import { API_CONFIG } from './../../config/api.config';
import { PedidoDTO } from './../../models/pedido.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class PedidoService {

    constructor(public http: HttpClient) {

    }

    insert(pedidoDTO: PedidoDTO) {
        console.log(pedidoDTO);
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos`,
            pedidoDTO,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}