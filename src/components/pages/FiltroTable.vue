<template>
    <div>
    <form  @submit.prevent="filtrarTable">
        <md-card class="md-layout-item md-size-100 md-small-size-100">
            <md-card-content>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-33 md-small-size-100">
                        <md-field>
                            <label for="fornecedor">Fornecedores</label>
                            <md-select name="fornecedor" id="fornecedor" multiple v-model="filter.fornecedor">
                                <md-option value=""></md-option>
                                <md-option v-for="fornecedor in fornecedoresSelect" :value="fornecedor.id" :key="fornecedor.id">{{fornecedor.RAZAO_SOCIAL}}</md-option>
                            </md-select> 
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-33 md-small-size-100">
                        <md-field>
                            <label for="formaPagamento">Forma pagamentos</label>
                            <md-select name="formaPagamento" id="formaPagamento" multiple v-model="filter.forma_pagamento">
                                <md-option value=""></md-option>
                                <md-option v-for="formaPagamento in formasPagamentoSelect" :value.sync="formaPagamento.id" :key="formaPagamento.id">{{formaPagamento.DESCRICAO}}</md-option>
                            </md-select> 
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-33 md-small-size-100">
                        <md-field>
                            <label for="formaPagamento">Categorias</label>
                            <md-select name="categoria" id="categoria" multiple v-model="filter.categoria">
                                <md-option value=""></md-option>
                                <md-option v-for="categoria in categoriasSelect" :value.sync="categoria.id" :key="categoria.id">{{categoria.DESCRICAO}}</md-option>
                            </md-select> 
                        </md-field>
                    </div>
                </div>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-100 md-small-size-100">
                        <md-field>
                            <label for="status">Status</label>
                            <md-select name="status" id="status">
                                <md-option value="PAGA">PAGA</md-option>
                                <md-option value="EM_ABERTO">EM ABERTO</md-option>
                            </md-select> 
                        </md-field>
                    </div>
                </div>
                <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-50 md-small-size-100">
                        <label>PERÍODO VENCIMENTO DE</label>
                        <md-field>
                             <md-datepicker name="dt_vencimento_inicial" id="dt_vencimento_inicial" v-model="filter.data_vencimento" />
                        </md-field>
                        </div>
                        <div class="md-layout-item md-size-50 md-small-size-100">
                        <label>PERÍODO VENCIMENTO ATÉ</label>
                        <md-field>
                            <md-datepicker name="dt_vencimento_final" id="dt_vencimento_final" v-model="filter.data_vencimento_ate" />
                        </md-field>
                    </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50 md-small-size-100">
                            <label>PERÍODO PAGAMENTO DE</label>
                            <md-field>
                                <md-datepicker name="dt_pagamento_inicial" id="dt_pagamento_inicial" v-model="filter.data_pagamento"/>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-50 md-small-size-100">
                            <label>PERÍODO PAGAMENTO ATÉ</label>
                            <md-field>
                                <md-datepicker name="dt_pagamento_final" id="dt_pagamento_final" v-model="filter.data_pagamento_ate" />
                            </md-field>
                        </div>
                </div>
                    <md-button type="submit" class="md-raised md-accent" name="filtrar" id="filtrar">Filtrar</md-button>
            </md-card-content>
        </md-card>
    </form>
    </div>
</template>

<script>
import FornecedorService from '@/services/Fornecedor.js'
import FormasPagamentoService from '@/services/FormasPagamento.js'
import CategoriaService from '@/services/Categoria.js'

export default {
    name: 'filtro',
    data() {
        return {
            msg: 'Óla mundo',
            filter: {
                fornecedor: [],
                forma_pagamento: [],
                categoria: [],
                data_vencimento: null,
                data_vencimento_ate: null,
                data_pagamento: null,
                data_pagamento_ate: null
            },
            formasPagamentoSelect: [],
            fornecedoresSelect: [],
            categoriasSelect: [],
        }
    },
    methods: {
        filtrarTable: function () {
             this.$emit("filterTableMain", { component: this });
        },
         loadSelectFormasPagamento: function () {
            FormasPagamentoService.list()
            .then((response) => this.formasPagamentoSelect = response.data.formas_de_pagamento)
        },
        loadSelectFornecedor: function () {
            FornecedorService.list()
            .then((response) => this.fornecedoresSelect = response.data.fornecedores)
        },
        loadSelectCategoria: function () {
            CategoriaService.list()
            .then((response) => this.categoriasSelect = response.data.categorias)
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