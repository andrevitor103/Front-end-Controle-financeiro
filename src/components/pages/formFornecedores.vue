<template>
    <div>
        <div class="viewport">
        <form @submit.prevent="optionSubmitForm()">
            <md-card class="md-layout-item md-size-100 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Fornecedor</div>
                </md-card-header>
                 <md-progress-spinner v-if="loadSubmitForm" md-mode="indeterminate"></md-progress-spinner>
                <md-card-content>
                    <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100 md-small-size-100">
                        <md-field :class="{'md-invalid': $v.fornecedor.DOCUMENTO.$error && errors}">
                            <label for="documento">DOCUMENTO</label>
                            <md-input name="documento" id="documento" v-model.trim="$v.fornecedor.DOCUMENTO.$model" />
                            <div v-if="errors">
                                <span class="md-error" v-if="!$v.fornecedor.DOCUMENTO.required">Campo obrigatório</span> 
                                <span class="md-error" v-else-if="!$v.fornecedor.DOCUMENTO.minLength">Campo deve conter no mínimo 10 caracteres</span> 
                            </div>
                            <md-button class="md-fab md-mini md-plain" @click="fetchSupplierInformation()" style="display: flex">
                                <md-icon>search</md-icon>
                            </md-button>
                        </md-field>
                    </div>
                    </div>
                    <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-50 md-small-size-100">
                        <md-field :class="{'md-invalid': $v.fornecedor.RAZAO_SOCIAL.$error && errors}">
                            <label for="razao_social">RAZÃO SOCIAL</label>
                            <md-input name="razao_social" id="razao_social" v-model="$v.fornecedor.RAZAO_SOCIAL.$model" />
                            <div v-if="errors">
                                <span class="md-error" v-if="!$v.fornecedor.RAZAO_SOCIAL.required">Campo obrigatório</span> 
                                <span class="md-error" v-else-if="!$v.fornecedor.RAZAO_SOCIAL.minLength">Campo deve conter no mínimo 2 caracteres</span> 
                            </div>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50 md-small-size-100">
                        <md-field>
                            <label for="nome_fantasia">NOME FANTASIA</label>
                            <md-input name="nome_fantasia" id="nome_fantasia" v-model="fornecedor.NOME_FANTASIA" :disabled="!personPhysical" />
                        </md-field>
                    </div>
                    </div>
                     <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-50 md-small-size-100">
                        <md-field>
                            <label for="situacao_cadastral">SITUAÇÃO CADASTRAL</label>
                            <md-input name="situacao_cadastral" id="situacao_cadastral" v-model="fornecedor.SITUACAO_CADASTRAL"  :disabled="!personPhysical" />
                        </md-field>
                            <md-checkbox v-model="personPhysical">PESSOA FÍSICA</md-checkbox>
                    </div>
                    <div class="md-layout-item md-size-50 md-small-size-100">
                        <md-field>
                            <label for="telefone">TELEFONE</label>
                            <md-input name="telefone" id="telefone" v-model="fornecedor.TELEFONE"  :disabled="!personPhysical" />
                        </md-field>
                    </div>
                    </div>
                </md-card-content>
                <md-button  v-if="!loadSubmitForm && !editForm" type="submit" class="md-raised  md-primary" :disabled="!($v.$dirty && !$v.$invalid || personPhysical)">SALVAR</md-button> 
                <md-button v-if="editForm" type="button" class="md-accent" :disabled="disabledButtonSubmitLoad" @click.prevent="disabledEditFormClearForm()">CANCELAR</md-button>
                <md-button  v-if="!loadSubmitForm && editForm" type="submit" class="md-raised  md-primary" :disabled="!($v.$dirty && !$v.$invalid)">EDITAR</md-button>
                <md-button v-if="editForm" type="submit" class="md-raised  md-accent" :disabled="disabledButtonSubmitLoad" @click.prevent="deleteFornecedor()">DELETAR</md-button>
            </md-card>
        </form>
        </div>
            <div class="viewport">
                <md-table>
                    <md-table-row>
                        <md-table-head class="md-table-head-label-personalized">CÓDIGO</md-table-head>
                        <md-table-head class="md-table-head-label-personalized">DOCUMENTO</md-table-head>
                        <md-table-head class="md-table-head-label-personalized">RAZÃO SOCIAL</md-table-head>
                        <md-table-head class="md-table-head-label-personalized">DATA CRIAÇÃO</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(fornecedor, index) in listFornecedor" :key="index" @click="showFornecedorForm(fornecedor)">
                        <md-table-cell>{{ fornecedor.id }}</md-table-cell>
                        <md-table-cell>{{ fornecedor.DOCUMENTO }}</md-table-cell>
                        <md-table-cell>{{ fornecedor.RAZAO_SOCIAL | UpperCase }}</md-table-cell>
                        <md-table-cell>{{ fornecedor.created_at | formatDate }}</md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
            <div style="height: 50px">
            </div>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import FornecedorService from '@/services/Fornecedor.js'
import storageService from '@/services/storage.js'

export default {
    name: 'form-fornecedores',
    components: {
    },
    data() {
        return {
            listFornecedor: [],
            fornecedor: {
                DOCUMENTO: null,
                RAZAO_SOCIAL: null,
                NOME_FANTASIA: null,
                SITUACAO_CADASTRAL: null,
                TELEFONE: null
            },
            errors: false,
            personPhysical: false,
            loadSubmitForm: false,
            documentoRequisicao: '',
            disabledButtonSubmitLoad: false,
            editForm: false
        }
    },
    methods: {
         async deleteFornecedor () {
            this.toggleLoadSubmit()
            await FornecedorService.delete(this.fornecedor)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
            this.clearForm()
            this.loadListaFornecedores()
            this.toggleLoadSubmit()

        },
        optionSubmitForm () {
            if(this.formIsValidated()) {
                if (this.editForm) {
                    this.editFornecedor()
                } else {
                    this.createFornecedor()
                }
                this.isSucess()   
            } else {
                console.log("Erro")
                this.isError()
            }
        },
         formIsValidated () {
            return (this.$v.$dirty && !this.$v.$invalid)
        },
         isError () {
            this.errors = true
        },
        isSucess () {
            this.errors = false
        },
         async editFornecedor () {
            this.toggleLoadSubmit()
            await FornecedorService.update(this.fornecedor)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
            this.loadListaFornecedores()
            this.toggleLoadSubmit()
            this.clearForm()
        },
        async createFornecedor () {
            this.toggleLoadSubmit()
            await FornecedorService.create(this.fornecedor)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
            this.clearForm()
            this.loadListaFornecedores()
            this.toggleLoadSubmit()
        },
        loadListaFornecedores() {
            FornecedorService.list()
            .then((response) => {
                this.listFornecedor = response.data.fornecedores
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        },
        toggleSpinner () {
            this.loadSubmitForm = !this.loadSubmitForm
        },
        toggleDisabledButton () {
            this.disabledButtonSubmitLoad = !this.disabledButtonSubmitLoad
        },
        toggleLoadSubmit () {
            this.toggleSpinner()
            this.toggleDisabledButton()
        },
        enableEditForm () {
            this.editForm = true
        },
        disabledEditForm () {
            this.editForm = false
        },
        disabledEditFormClearForm () {
            this.disabledEditForm()
            this.clearForm()
             this.isSucess()
        },
        showFornecedorForm (fornecedorSelected) {
            this.enableEditForm()
            this.fornecedor = fornecedorSelected
        },
        clearForm () {
            this.fornecedor = {}
        },
        fetchSupplierInformation () {
            if (this.fornecedor.DOCUMENTO && this.fornecedor.DOCUMENTO.length > 10) {
                FornecedorService.fetchSupplierInformation(this.onlyNumbers(this.fornecedor.DOCUMENTO))
                    .then((response) => {
                        
                        if(this.isTrue(response.data, "fornecedor_api")) {
                            this.fornecedor.DOCUMENTO = response.data.fornecedor_api['cnpj']
                            this.fornecedor.RAZAO_SOCIAL = response.data.fornecedor_api['razao_social']
                            this.fornecedor.NOME_FANTASIA = response.data.fornecedor_api['nome_fantasia']
                            this.fornecedor.SITUACAO_CADASTRAL = response.data.fornecedor_api['descricao_situacao_cadastral']
                            this.fornecedor.TELEFONE = response.data.fornecedor_api['ddd_telefone_1']
                        }
                })
                    .catch((error) => {
                        console.log(error)
                })   
                }
        },
        isTrue: function (response, check) {
            if(check in response) {
                return true
            }
            return false
        },
        onlyNumbers (strToNumbers) {
            return strToNumbers.replace(/([^\d])+/gim, '')
        },
    },
    filters: {
        UpperCase (value) {
            return value.toUpperCase()
        },
        formatDate: function (value) {
                value = new Date(value)
                value = `${value.getDate()}-${(value.getMonth()+1)}-${value.getFullYear()}`
                return value
        }
    },
    validations: {
        fornecedor: {
            DOCUMENTO: {
                required,
                minLength: minLength(10)
            },
            RAZAO_SOCIAL: {
                required,
                minLength: minLength(2)
            },
        },
    },
    mounted () {
        this.loadListaFornecedores()
        storageService.userLoginSuccess('value')
    },
    watch: {
    }
}
</script>

<style lang="css" scoped>
    .md-table-head {
        background-color: rgba(0,0,0,0.6);
    }
    .md-table-head-label-personalized {
        color: #fff !important;
    }    
</style>
