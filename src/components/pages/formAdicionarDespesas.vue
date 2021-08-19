<template>
    <div>
        <div>
            <md-toolbar :class="{'md-accent md-dense': error, 'md-primary md-dense': !error}" v-if="msgForm">
                <h3 class="md-title">{{ msgForm }}</h3>
            </md-toolbar>
        </div>
        
        <form name="formData" action="" method="POST" @submit.prevent="registerDespesa()">
            <md-card class="md-layout-item md-size-100 md-small-size-100">
                <md-card-header>
                    <div class="md-title">NOVA DESPESA</div>
                </md-card-header>
                <div v-if="loadForm">
                    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
                </div>
                <md-card-content>
                    
                    <div class="md-layout md-gutter">
                    
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="{'md-invalid': $v.despesa.ID_FORMA_PAGAMENTO.$error}">
                                <label for="ID_FORMA_PAGAMENTO">PAGAMENTO</label>
                                <md-select name="ID_FORMA_PAGAMENTO" id="ID_FORMA_PAGAMENTO" v-model="$v.despesa.ID_FORMA_PAGAMENTO.$model">
                                    <md-option v-for="formaPagamento in formasPagamentoSelect" :value.sync="formaPagamento.id" :key="formaPagamento.id">{{formaPagamento.DESCRICAO}}</md-option></md-select>
                                <md-button class="md-icon-button md-primary" to="/create-forma-pagamento" target= '_blank'>
                                    <md-icon>add</md-icon>
                                </md-button>
                                <md-button class="md-icon-button md-primary" @click="loadSelectFormasPagamento">
                                    <md-icon>cached</md-icon>
                                </md-button>
                                <span class="md-error" v-if="!$v.despesa.ID_FORMA_PAGAMENTO.required">Campo obrigatório</span>
                            </md-field>
                        </div> 
                        
                        <div class="md-layout-item md-small-size-100">
                            <md-field  :class="{'md-invalid': $v.despesa.ID_FORNECEDOR.$error}">
                                <label for="ID_FORNECEDOR">FORNECEDOR</label>
                                <md-select name="ID_FORNECEDOR" id="ID_FORNECEDOR" v-model="$v.despesa.ID_FORNECEDOR.$model">
                                    <md-option value=""></md-option>
                                    <md-option v-for="fornecedor in fornecedoresSelect" :value="fornecedor.id" :key="fornecedor.id">{{fornecedor.RAZAO_SOCIAL}}</md-option>
                                </md-select>
                                <md-button class="md-icon-button md-primary" to="/create-fornecedor" target= '_blank'>
                                    <md-icon>add</md-icon>
                                </md-button>
                                <md-button class="md-icon-button md-primary" @click="loadSelectFornecedor">
                                    <md-icon>cached</md-icon>
                                </md-button>  
                                <span class="md-error" v-if="!$v.despesa.ID_FORNECEDOR.required">Campo obrigatório</span> 
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                    
                        <div class="md-layout-item md-small-size-100">
                            <md-field  :class="{'md-invalid': $v.despesa.VALOR_DESPESA.$error}">
                                <label for="VALOR_DESPESA">VALOR</label>
                                <span class="md-prefix">R$</span>
                                 <md-input type="number" id="VALOR_DESPESA" name="VALOR_DESPESA" autocomplete="off" v-model.number="$v.despesa.VALOR_DESPESA.$model" />
                                 <span class="md-error" v-if="!$v.despesa.VALOR_DESPESA.required">Campo obrigatório</span> 
                            </md-field>
                        </div> 
                        
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                               <label for="DESCONTO">DESCONTO</label>
                                <span class="md-prefix">R$</span>
                                    <md-input type="number" id="DESCONTO" name="DESCONTO" autocomplete="off" v-model.number="despesa.DESCONTO" />
                            </md-field>
                        </div> 

                    </div>

                     <div class="md-layout md-gutter">
                    
                        <div class="md-layout-item md-small-size-100">
                            <md-field>
                              <label for="ID_CATEGORIA">CATEGORIA</label>
                                <md-select  name="ID_CATEGORIA" id="ID_CATEGORIA" v-model="despesa.ID_CATEGORIA">
                                    <md-option v-for="(categoria, index) in categoriasSelect" :value.sync="index" :key="categoria.id">{{categoria.DESCRICAO}}</md-option>
                                </md-select>
                                <md-button class="md-icon-button md-primary" to="/create-categoria" target= '_blank'>
                                    <md-icon>add</md-icon>
                                </md-button>
                                <md-button class="md-icon-button md-primary" @click="loadSelectCategoria">
                                    <md-icon>cached</md-icon>
                                </md-button>
                            </md-field>
                        </div> 
                        
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="{'md-invalid': $v.despesa.TOTAL_PARCELAS.$error}">
                               <label for="TOTAL_PARCELAS">TOTAL PARCELAS</label>
                                    <md-input type="number" id="TOTAL_PARCELAS" name="TOTAL_PARCELAS" autocomplete="off" v-model.number="$v.despesa.TOTAL_PARCELAS.$model" min="1" />
                                    <span class="md-error" v-if="!$v.despesa.TOTAL_PARCELAS.required">Campo obrigatório</span> 
                            </md-field>
                        </div> 

                    </div>

                    <div class="md-layout md-gutter">
                    
                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="{'md-invalid': $v.despesa.DATA_COMPRA.$error}">
                                 <md-datepicker name="DATA_COMPRA" id="DATA_COMPRA" v-model="$v.despesa.DATA_COMPRA.$model">
                                    <label>DT COMPRA</label>
                                </md-datepicker>
                                <span class="md-error" v-if="!$v.despesa.DATA_COMPRA.required">Campo obrigatório</span> 
                            </md-field>
                        </div>
                    </div>
                        <md-button type="submit" class="md-raised md-primary" v-if="!loadForm" :disabled="!($v.$dirty && !$v.$invalid)">SALVAR</md-button>
                </md-card-content>
            </md-card>
        </form>
    </div>
</template>

<script>
    import { required } from 'vuelidate/lib/validators'
    import DespesaService from '@/services/despesa.js'
    import FornecedorService from '@/services/Fornecedor.js'
    import FormasPagamentoService from '@/services/FormasPagamento.js'
    import CategoriaService from '@/services/Categoria.js'

    export default {
        name: 'formDespesa',
        data() {
            return {
            msgForm: '',
            error: false,
            loadForm: false,
            formasPagamentoSelect: [],
            fornecedoresSelect: [],
            categoriasSelect: [],
            despesa: {
                ID_FORMA_PAGAMENTO: "",
                ID_FORNECEDOR: "",
                VALOR_DESPESA: "",
                DESCONTO: "",
                ID_CATEGORIA: "",
                TOTAL_PARCELAS: "",
                DATA_COMPRA:new Date(),
                JUROS_ATRASO: "",
            }
        }
        },
        methods: {
                registerDespesa: function()
                {
                    this.toggleLoad()
                    this.despesa.DATA_COMPRA = this.formatDate(this.despesa.DATA_COMPRA)

                    this.despesa.DESCONTO = this.despesa.DESCONTO != "" ? this.despesa.DESCONTO : 0

                    this.despesa.TOTAL_PARCELAS = this.despesa.TOTAL_PARCELAS != "" ? this.despesa.TOTAL_PARCELAS : 1

                    if (this.formIsValidated()) {
                        DespesaService.createDespesa(this.despesa)
                        .then((response) => {
                            console.log(response)
                            if(this.isTrue(response.data, 'Despesa_main'))
                            {
                                this.changeErrorAndChangeMsgForm('Cadastrado com sucesso', false)
                                this.$emit("newDespesa", {despesa: this.despesa})
                            }else{
                                this.changeErrorAndChangeMsgForm('Houve algum problema, por favor verifique os seus dados e tente novamente', true)
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            this.changeErrorAndChangeMsgForm('Houve algum problema, por favor verifique os seus dados e tente novamente', true)
                        })
                    } else {
                        this.changeErrorAndChangeMsgForm('Houve algum problema, por favor verifique os seus dados e tente novamente', true)
                    }
                    this.changeErrorAndChangeMsgForm('', false)
                    this.toggleLoad()
                },
                toggleLoad: function() {
                    this.loadForm = !this.loadForm
                },
                formatDate: function (dateFormat) {
                   if (dateFormat) {
                    typeof dateFormat == 'object' ? dateFormat = `${dateFormat.getFullYear()}-${dateFormat.getMonth()+1}-${dateFormat.getDate()}` : ''
                    return dateFormat
                   }else if (typeof dateFormat == 'string') {
                       return dateFormat
                   }
                   return new Date()
                },
                formIsValidated: function () {
                    return (this.$v.$dirty && !this.$v.$invalid)
                },
                isTrue: function (response, check) {
                if(check in response) {
                    return true
                }
                return false
                },
                loadSelectFormasPagamento: function() {
                    FormasPagamentoService.list()
                    .then((response) => this.formasPagamentoSelect = response.data.formas_de_pagamento)
                },
                loadSelectFornecedor: function() {
                    FornecedorService.list()
                    .then((response) => this.fornecedoresSelect = response.data.fornecedores)
                },
                loadSelectCategoria: function() {
                    CategoriaService.list()
                    .then((response) => this.categoriasSelect = response.data.categorias)
                },
                changeErrorAndChangeMsgForm: function (message, statusError) {
                    this.msgForm = message
                    this.error = statusError
                }
            },
            validations: {
                despesa: {
                    ID_FORMA_PAGAMENTO: {
                        required
                    },
                    ID_FORNECEDOR: {
                        required
                    },
                    VALOR_DESPESA: {
                        required
                    },
                    TOTAL_PARCELAS: {
                        required
                    },
                    DATA_COMPRA: {
                        required,

                    },
            }
            },
            mounted() {
                this.loadSelectFormasPagamento()
                this.loadSelectFornecedor()
                this.loadSelectCategoria()
            }
    }
    
</script>

<style scoped>

</style>
