import { http } from './config'
import storageService from '@/services/storage.js'

export default {
    list: () => {
        return http.get(`despesas/fornecedores/${storageService.getStorage('value')}`)
    },
    create: (fornecedor) => {
        return http.post('despesa/create-fornecedor', {
            'RAZAO_SOCIAL': fornecedor.RAZAO_SOCIAL,
            'DOCUMENTO': fornecedor.DOCUMENTO,
            'NOME_FANTASIA': fornecedor.NOME_FANTASIA,
            'SITUACAO_CADASTRAL': fornecedor.SITUACAO_CADASTRAL,
            'TELEFONE': fornecedor.TELEFONE,
            'ID_USUARIO': storageService.getStorage('value')
        })
    },
    update: (fornecedor) => {
        return http.put(`despesa/update-fornecedor/${fornecedor.id}`,{
            'RAZAO_SOCIAL': fornecedor.RAZAO_SOCIAL,
            'DOCUMENTO': fornecedor.DOCUMENTO,
            'NOME_FANTASIA': fornecedor.NOME_FANTASIA,
            'SITUACAO_CADASTRAL': fornecedor.SITUACAO_CADASTRAL,
            'TELEFONE': fornecedor.TELEFONE,
        })
    },
    
    delete: (fornecedor) => {
        return http.delete(`fornecedor/delete/${fornecedor.id}`)
    },
    fetchSupplierInformation: (documento) => {
        return http.get(`despesas/fornecedores/cnpj/${documento}`)
    },
}