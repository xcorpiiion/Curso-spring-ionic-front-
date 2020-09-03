import { ItemPedidoDTO } from './item-pedido.dto';
import { PagamentoDTO } from './pagamento.dto';
import { ReferenciaDTO } from './referencia.dto';

export interface PedidoDTO {
    cliente: ReferenciaDTO;
    enderecoEntrega: ReferenciaDTO;
    pagamento: PagamentoDTO;
    itens: ItemPedidoDTO[];
    nomeTipoPagamento: string;
    numeroParcelas: number;
}