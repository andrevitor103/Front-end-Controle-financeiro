import { http } from './config'
import storageService from '@/services/storage.js'

export default {
    list: () => {
        return http.get(`despesas/categoria/${storageService.getStorage('value')}`)
    },
    create: (categoria) => {
        return http.post('despesa/create-categoria', {
            'DESCRICAO': categoria.DESCRICAO,
            'ID_USUARIO': storageService.getStorage('value')
        })
    },
    update: (categoria) => {
        return http.put(`despesa/update-categoria/${categoria.id}`,{
            'DESCRICAO': categoria.DESCRICAO,
            'ID_USUARIO': storageService.getStorage('value')
        })
    },
     
    delete: (fornecedor) => {
        return http.delete(`fornecedor/delete/${fornecedor.id}`)
    }
}