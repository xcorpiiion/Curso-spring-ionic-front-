import { ProdutoDTO } from './produto.dto';
import { ItemPedidoDTO } from './item-pedido.dto';
import { PagamentoDTO } from './pagamento.dto';
import { ReferenciaDTO } from './referencia.dto';

export interface PedidoDTO {
    idCliente: ReferenciaDTO;
    enderecoEntrega: ReferenciaDTO;
    pagamento: PagamentoDTO;
    itensPedido: ItemPedidoDTO[];
    nomeTipoPagamento: string;
    numeroParcelas: number;
    produtos: ProdutoDTO[];
}