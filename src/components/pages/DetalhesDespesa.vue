<template>
    <div>
    <form>
        <md-card class="md-layout md-layout-item md-size-80 md-small-size-100">
        <div class="md-layout-item md-size-50 md-small-size-100">
            <md-card-content>
                <span>
                    <p>CONTA</p>
                </span>
                        <md-field>
                            <md-select name="formaPagamento" id="formaPagamento" value="1" :class="{'view': !edit}" :disabled="!edit" v-model="parcela.despesas.ID_FORMA_PAGAMENTO">
                                <md-option v-for="formaPagamento in formasPagamentoSelect" :value.sync="formaPagamento.id" :key="formaPagamento.id">{{formaPagamento.DESCRICAO}}</md-option>
                            </md-select> 
                        </md-field>
            </md-card-content>
            </div>
              <div class="md-layout-item md-size-50 md-small-size-100">
            <md-card-content>
                <span>
                    <p>FORNECEDOR</p>
                </span>
                        <md-field>
                            <md-select name="fornecedor" id="fornecedor" value="1" :class="{'view': !edit}" :disabled="!edit" v-model="parcela.despesas.ID_FORNECEDOR">
                            <md-option v-for="fornecedor in fornecedoresSelect" :value="fornecedor.id" :key="fornecedor.id">{{fornecedor.RAZAO_SOCIAL}}</md-option>
                            </md-select> 
                        </md-field>
            </md-card-content>
            </div>
              <div class="md-layout-item md-size-50 md-small-size-100">
            <md-card-content>
               <span>
                    <p>VALOR PARCELA</p>
                </span>
                    <md-field  :class="{'md-invalid': $v.parcela.VALOR_PARCELA.$error}">
                        <span :class="{'view': !edit, 'md-prefix': true}">R$</span>
                        <md-input type="number"  name="valor_parcela" id="valor_parcela" :class="{'view': !edit}" :disabled="!edit" v-model.number="$v.parcela.VALOR_PARCELA.$model"></md-input>
                        <span class="md-error" v-if="!$v.parcela.VALOR_PARCELA.required">Campo obrigatório</span>
                    </md-field>
            </md-card-content>
            </div>
               <div class="md-layout-item md-size-50 md-small-size-100">
                 <md-card-content>
               <span>
                    <p>Nº PARCELA</p>
                </span>
                        <md-field :class="{'md-invalid': $v.parcela.NUMERO_PARCELA.$erro}">
                            <md-input name="numero_parcela" id="numero_parcela" :class="{'view': true}" disabled v-model.trim="$v.parcela.NUMERO_PARCELA.$model"></md-input>
                            <span class="md-error" v-if="!$v.parcela.NUMERO_PARCELA.required">Campo obrigatório</span>
                        </md-field>
            </md-card-content>
            </div>
                 <div class="md-layout-item md-size-50 md-small-size-100">
                 <md-card-content>
               <span>
                    <p>DT VENCIMENTO</p>
                </span>
                        <md-field :class="{'md-invalid': $v.parcela.DATA_VENCIMENTO.$error}">
                            <md-datepicker name="dt_vencimento" id="dt_vencimento" :class="{'view': !edit}" :disabled="!edit" v-model="$v.parcela.DATA_VENCIMENTO.$model"/>
                            <span class="md-error" v-if="!$v.parcela.DATA_VENCIMENTO.required">Campo obrigatório</span>
                        </md-field>
            </md-card-content>
            </div>
                     <div class="md-layout-item md-size-50 md-small-size-100">
                 <md-card-content>
               <span>
                    <p>DT PAGAMENTO</p>
                </span>
                        <md-field :class="{'md-invalid': $v.parcela.DATA_PAGAMENTO.$error}">
                            <md-datepicker name="dt_pagamento" id="dt_pagamento" :class="{'view': !edit}" :disabled="!edit" v-model="$v.parcela.DATA_PAGAMENTO.$model"/>
                            <span class="md-error" v-if="!$v.parcela.DATA_PAGAMENTO.required">Campo obrigatório</span>
                        </md-field>
            </md-card-content>
            </div>
                 <div class="md-layout-item md-size-50 md-small-size-100">
                 <md-card-content>
               <span>
                    <p>JUROS</p>
                </span>
                        <md-field>
                            <span :class="{'view': !edit, 'md-prefix': true}">R$</span>
                            <md-input type="number" name="juros" id="juros" :class="{'view': !edit}" :disabled="!edit" v-model="parcela.JUROS"></md-input>
                        </md-field>
            </md-card-content>
            </div>
              <div class="md-layout-item md-size-50 md-small-size-100">
                 <md-card-content>
               <span>
                    <p>DESCONTO</p>
                </span>
                        <md-field>
                            <span :class="{'view': !edit, 'md-prefix': true}">R$</span>
                            <md-input type="number" name="desconto" id="desconto" :class="{'view': !edit}" :disabled="!edit" v-model="parcela.DESCONTO"></md-input>
                        </md-field>
            </md-card-content>
            </div>
             <div class="md-layout-item md-size-100 md-small-size-100">
            <md-card-content>
                <span>
                    <p>STATUS</p>
                </span>
                        <md-field>
                            <md-select name="status" id="status" :value="parcela.DATA_PAGAMENTO ? 1 : 2" :class="{'view': true}" disabled>
                                <md-option value="1">PAGA</md-option>
                                <md-option value="2">EM ABERTO</md-option>
                            </md-select> 
                        </md-field>
            </md-card-content>
            </div>
                <div class="md-layout-item md-size-100 md-small-size-100">
            <md-card-content>
             <md-button class="md-raised md-primary" :class="{'md-raised md-accent': !edit}" name="edit" id="edit" @click="toggleEditAndEditParcel()">{{ edit ? 'SALVAR' : 'EDITAR' }}</md-button>
            </md-card-content>
            </div>
        </md-card>
    </form>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ParcelaService from '@/services/Parcelas.js'
import FornecedorService from '@/services/Fornecedor.js'
import FormasPagamentoService from '@/services/FormasPagamento.js'
import CategoriaService from '@/services/Categoria.js'

export default {
    name: 'detalhesDespesa', 
    props: {
        despesaId: {
            type: [String, Number]
        }
    },   
    data(){
        return {
            edit: false,
            parcela: {
            },
            formasPagamentoSelect: [],
            fornecedoresSelect: [],
            categoriasSelect: [],
        }
    },
    methods: {
        reloadParcela: function () {
            ParcelaService.list(this.despesaId)
            .then((response) => {
                this.parcela = response.data.detalhes_despesa[0]
            })
        },
        toggleEditAndEditParcel: function () {
            this.toggleEdit()
            this.editParcel()
        },
         toggleEdit: function () {
            this.edit = !this.edit
        },
         editParcel: function () {
            !this.isEdit() ? this.updateParcel()  : 'APENAS LIBERA PARA EDIÇÃO'
        },
          isEdit: function () {
            return this.edit
        },
         updateParcel: function () {
            ParcelaService.update(this.parcela)
            .then((response) => {
                console.log(response)
                this.UpdatedSuccessfully()
            })
        },
         UpdatedSuccessfully: function () {
            this.$emit("recarregarTabela", { component: this });
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
        }
    },
    validations: {
        parcela: {
            VALOR_PARCELA: {
                required
            },
            NUMERO_PARCELA: {
                required
            },
            DATA_VENCIMENTO:{
                required
            },
            DATA_PAGAMENTO: {
                required
            },
        }
    },
    mounted() {
        this.reloadParcela()
        this.loadSelectFormasPagamento()
        this.loadSelectFornecedor()
        this.loadSelectCategoria()
    }
}

</script>


<style scoped>
    .view {
        background-color: #ccc;
    }
</style>

