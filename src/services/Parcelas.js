import { http } from './config'
export default {
    list: (codigoParcela) => {
        return http.get(`despesas/detalhes/${codigoParcela}`)
    },
    update: (parcela) => {
        return http.put(`despesas/update/${parcela.id}`, {
            VALOR_PARCELA: parcela.VALOR_PARCELA,
            DATA_VENCIMENTO: parcela.DATA_VENCIMENTO,
            DATA_PAGAMENTO: parcela.DATA_PAGAMENTO,
            ID_FORMA_PAGAMENTO: parcela.despesas.ID_FORMA_PAGAMENTO,
            ID_FORNECEDOR: parcela.despesas.ID_FORNECEDOR,
            ID_CATEGORIA: parcela.despesas.ID_CATEGORIA,
            JUROS: parcela.JUROS,
            DESCONTO: parcela.DESCONTO
        })
    }
}