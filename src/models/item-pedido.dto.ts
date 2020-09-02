import { ReferenciaDTO } from './referencia.dto';

export interface ItemPedidoDTO {
    quantidade: number;
    produto: ReferenciaDTO;
}