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
    },
 filter: (filter, id = storageService.getStorage("value")) => {
          let camposData = ["data_vencimento", "data_vencimento_ate", "data_pagamento", "data_pagamento_ate"]
         camposData.forEach((item) => {
            if (filter[item]) {
                let data = filter[item]
                if (data instanceof Date) {
                    filter[item] = `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`
                }
            }
        });
        return http.post(`despesas-filter/${id}`,{ 
            fornecedor:  filter.fornecedor,
            forma_pagamento: filter.forma_pagamento,
            categoria: filter.categoria,
            data_vencimento: [filter.data_vencimento],
            data_vencimento_ate: [filter.data_vencimento_ate],
            data_pagamento: [filter.data_pagamento],
            data_pagamento_ate: [filter.data_pagamento_ate],
            status: [filter.status]
        })
    },
}
