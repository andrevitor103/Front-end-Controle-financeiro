import { http } from './config'
import storageService from '@/services/storage.js'

export default {
    list: () => {
        return http.get(`despesas/formas-pagamento/${storageService.getStorage('value')}`)
    },
     create: (formaPagamento) => {
        return http.post('despesa/create-forma-pagamento', {
            'DESCRICAO': formaPagamento.DESCRICAO,
            'SALDO_LIMITE': formaPagamento.SALDO_LIMITE,
            'DATA_COBRANCA': formaPagamento.DATA_COBRANCA,
            'ID_USUARIO':  storageService.getStorage('value')
        })
    },
    update: (formaPagamento) => {
        return http.put(`despesa/update-forma-pagamento/${formaPagamento.id}`,{
            'DESCRICAO': formaPagamento.DESCRICAO,
            'SALDO_LIMITE': formaPagamento.SALDO_LIMITE,
            'DATA_COBRANCA': formaPagamento.DATA_COBRANCA,
            'ID_USUARIO':  storageService.getStorage('value')
        })
    },
    delete: (formaPagamento) => {
        return http.delete(`forma-pagamento/delete/${formaPagamento.id}`)
    }
}