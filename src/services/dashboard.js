import { http } from './config.js'
import storageService from './storage.js'
export default {
    list: () => {
        return http.get(`despesas/dashboard/limite-despesas/${storageService.getStorage('value')}`)
    },
    filter: (filter) => {
        return http.post('dashboard/filter', {
            fornecedor:  filter.fornecedor ?? null,
            forma_pagamento: filter.forma_pagamento ?? null
        })
    },
    filterLine: (filter) => {
        return http.post('dashboard/filter-line', {
            fornecedor:  filter.fornecedor,
            forma_pagamento: filter.forma_pagamento,
            categoria: filter.categoria,
            data_vencimento: [filter.data_vencimento],
            /*data_vencimento_ate: [filter.data_vencimento_ate],
            data_pagamento: [filter.data_pagamento],
            data_pagamento_ate: [filter.data_pagamento_ate]*/
        })
    }
}
