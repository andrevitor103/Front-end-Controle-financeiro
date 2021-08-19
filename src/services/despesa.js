import { http } from './config'
import storageService from '@/services/storage.js'

export default{
    list: () => {
        return http.get(`despesas/main/${storageService.getStorage('value')}`)
    },
    listDespesas: () => {
        return http.get(`/despesas/${storageService.getStorage('value')}`)
    },
    changePayment: (despesa) => {
        return http.get(`despesas/detalhes/realizar-pagamento/${despesa}`)
    },
    deleteDespesa: (idDespesa) => {
        return http.delete(`despesas/delete/${idDespesa}`)
    },
    createDespesa: (newDespesa) => {
        return http.post('/create-despesa',{
            VALOR_DESPESA: newDespesa.VALOR_DESPESA,
            TOTAL_PARCELAS: newDespesa.TOTAL_PARCELAS,
            DATA_COMPRA: newDespesa.DATA_COMPRA,
            ID_FORNECEDOR: newDespesa.ID_FORNECEDOR,
            ID_CATEGORIA: newDespesa.ID_CATEGORIA,
            ID_CONDICAOPAGAMENTO: 1,
            JUROS_ATRASO: 0,
            DESCONTO: newDespesa.DESCONTO,
            ID_FORMA_PAGAMENTO: newDespesa.ID_FORMA_PAGAMENTO,
            ID_USUARIO: storageService.getStorage('value')
        })
    }
}
