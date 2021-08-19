<template>
    <div>
        <div class="viewport">
        
        <form @submit.prevent="optionSubmitForm()">

            <md-card class="md-layout-item md-size-100 md-small-size-100">
            
                <md-card-header>
                    <div class="md-title">FORMAS DE PAGAMENTO</div>
                </md-card-header>

                 <md-progress-spinner v-if="loadSubmitForm" md-mode="indeterminate"></md-progress-spinner>

                <md-card-content>
                    <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100 md-small-size-100">
                        <md-field  :class="{'md-invalid': $v.formaPagamento.DESCRICAO.$error && errors}">
                            <label for="descricao">DESCRICAO</label>
                            <md-input name="descricao" id="descricao" v-model.trim="$v.formaPagamento.DESCRICAO.$model" />
                            <div v-if="errors">
                                <span class="md-error" v-if="!$v.formaPagamento.DESCRICAO.required">Campo obrigatório</span> 
                                <span class="md-error" v-else-if="!$v.formaPagamento.DESCRICAO.minLength">Campo deve conter no mínimo 3 caracteres</span> 
                            </div>
                        </md-field>
                    </div>
                    </div>
                    <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-50 md-small-size-100">
                        <md-field :class="{'md-invalid': $v.formaPagamento.SALDO_LIMITE.$error && errors}">
                            <label for="saldo_limite">LIMITE DE CREDITO</label>
                            <md-input type="number" name="saldo_limite" id="saldo_limite" v-model.number="$v.formaPagamento.SALDO_LIMITE.$model" min="1" />
                            <div v-if="errors">
                                <span class="md-error" v-if="!$v.formaPagamento.SALDO_LIMITE.required">Campo obrigatório</span> 
                                <span class="md-error" v-else-if="!$v.formaPagamento.SALDO_LIMITE.between">Campo deve ser maior que zero</span> 
                            </div>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-50 md-small-size-100">
                        <md-field :class="{'md-invalid': $v.formaPagamento.DATA_COBRANCA.$error && errors}">
                            <label for="data_cobranca">DIA DÉBITO</label>
                            <md-input type="number" min="1" max="31" name="data_cobranca" id="data_cobranca" v-model.number="$v.formaPagamento.DATA_COBRANCA.$model" />
                            <div v-if="errors">
                                <span class="md-error" v-if="!$v.formaPagamento.DATA_COBRANCA.required">Campo obrigatório</span> 
                                <span class="md-error" v-else-if="!$v.formaPagamento.DATA_COBRANCA.between">Campo deve conter um dia válido</span> 
                            </div>
                        </md-field>
                    </div>
                    </div>
                </md-card-content>
                <md-button v-if="!loadSubmitForm && !editForm" type="submit" class="md-raised  md-primary" :disabled="!($v.$dirty && !$v.$invalid)">SALVAR</md-button>
                <md-button v-if="editForm" type="button" class="md-accent" :disabled="disabledButtonSubmitLoad" @click.prevent="disabledEditFormClearForm()">CANCELAR</md-button>
                <md-button v-if="!loadSubmitForm && editForm" type="submit" class="md-raised  md-primary" :disabled="!($v.$dirty && !$v.$invalid)">EDITAR</md-button>
                <md-button v-if="editForm" type="submit" class="md-raised  md-accent" @click.prevent="deleteFormaPagamento()" :disabled="disabledButtonSubmitLoad" >DELETAR</md-button>
            </md-card>
        </form>
        </div>
            <div class="viewport">
                <md-table>
                    <md-table-row>
                        <md-table-head class="md-table-head-label-personalized">CÓDIGO</md-table-head>
                        <md-table-head class="md-table-head-label-personalized">DESCRIÇÃO</md-table-head>
                        <md-table-head class="md-table-head-label-personalized">LIMITE CRÉDITO</md-table-head>
                         <md-table-head class="md-table-head-label-personalized">DIA DÉBITO</md-table-head>
                        <md-table-head class="md-table-head-label-personalized">DATA CRIAÇÃO</md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(formaPagamento, index) in listFormasPagamento" :key="index" @click="showFormaPagamento(formaPagamento)">
                        <md-table-cell>{{ formaPagamento.id }}</md-table-cell>
                        <md-table-cell>{{ formaPagamento.DESCRICAO | UpperCase}}</md-table-cell>
                        <md-table-cell>{{ formaPagamento.SALDO_LIMITE | toConvertFloat | currencyBRL }}</md-table-cell>
                        <md-table-cell>{{ formaPagamento.DATA_COBRANCA }}</md-table-cell>
                        <md-table-cell>{{ formaPagamento.created_at | formatDate }}</md-table-cell>
                    </md-table-row>
                </md-table>
            </div>
            <div style="height: 50px">
            </div>
    </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'
import FormasPagamentoService from '@/services/FormasPagamento.js'
import storageService from '@/services/storage.js'

export default {
    name: 'form-formas-pagamento',
    data() {
        return {
            listFormasPagamento: [],
            formaPagamento: {
                DESCRICAO: null,
                SALDO_LIMITE: null,
                DATA_COBRANCA: null
            },
            errors: false,
            loadSubmitForm: false,
            disabledButtonSubmitLoad: false,
            editForm: false
        }
    },
    methods: {
        async deleteFormaPagamento () {
            this.toggleLoadSubmit()
            await FormasPagamentoService.delete(this.formaPagamento)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
            this.clearForm()
            this.loadFormasPagamento()
            this.toggleLoadSubmit()

        },
        optionSubmitForm () {
            if(this.formIsValidated()) {
                if (this.editForm) {
                    this.editFormaPagamento()
                } else {
                    this.createFormaPagamento()
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
         async editFormaPagamento () {
            this.toggleLoadSubmit()
            await FormasPagamentoService.update(this.formaPagamento)
            .then((response) => {
                console.log(response)
                this.clearForm()
            })
            .catch((error) => {
                console.log(error)
            })
            this.loadFormasPagamento()
            this.toggleLoadSubmit()
        },
        async createFormaPagamento () {
            this.toggleLoadSubmit()
            await FormasPagamentoService.create(this.formaPagamento)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
            this.clearForm()
            this.loadFormasPagamento()
            this.toggleLoadSubmit()
        },
         isError () {
            this.errors = true
        },
        isSucess () {
            this.errors = false
        },
        loadFormasPagamento() {
            FormasPagamentoService.list()
            .then((response) => {
                this.listFormasPagamento = response.data.formas_de_pagamento
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
        showFormaPagamento (formaPagamentoSelected) {
            this.enableEditForm()
            this.formaPagamento = formaPagamentoSelected
        },
        clearForm () {
            this.formaPagamento = {}
        }
    },
    filters: {
        UpperCase (value) {
            return value.toUpperCase()
        },
        formatDate: function (value) {
                value = new Date(value)
                value = `${value.getDate()}-${(value.getMonth()+1)}-${value.getFullYear()}`
                return value
        },
        currencyBRL (value) {
            return `R$ ${value}`
        },
        toConvertFloat (value) {
            return parseFloat(value).toFixed(2)
        }

    },
    validations: {
        formaPagamento: {
            DESCRICAO: {
                required,
                minLength: minLength(3)
            },
            SALDO_LIMITE: {
                required,
                between: between(1, 999999999999)
            },
            DATA_COBRANCA: {
                required,
                between: between(1,31)
            },
        }
    },
    mounted () {
        this.loadFormasPagamento()
        storageService.userLoginSuccess('value')
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
