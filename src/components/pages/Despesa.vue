<template>
    <div>

        <md-dialog :md-active.sync="activeModalChild">
         
            <md-dialog-title></md-dialog-title>
                     <formDespesa @newDespesa="reloadDespesas()"></formDespesa>
            
        </md-dialog>
        <div>
            <md-toolbar class="md-accent md-dense" v-if="error">
                <h3 class="md-title">{{ msgError }}</h3>
            </md-toolbar>
        </div>
              <md-dialog-confirm
                :md-active.sync="activeDelete"
                md-title="Deletar despesa"
                md-content="Realmente deseja deletar essa Despesa?"
                md-confirm-text="Deletar"
                md-cancel-text="Cancelar"
                @md-cancel="cancelDelete"
                @md-confirm="confirmDelete()" />
        <div>

        </div>
        
        <md-table>
        
            <md-button class="md-icon-button md-raised" @click="activeModal">
                <md-icon>add</md-icon>
            </md-button>

            <md-table-row>
                <md-table-head md-numeric>CÓDIGO</md-table-head>
                <md-table-head>VALOR DESPESA</md-table-head>
                <md-table-head>TOTAL PARCELAS</md-table-head>
                <md-table-head>FORNECEDOR</md-table-head>
                <md-table-head>CARTÃO</md-table-head>
                <md-table-head>AÇÕES</md-table-head>
            </md-table-row>

            <md-table-row v-for="(despesa,index) in despesasMain" :key="index">
                <md-table-cell md-numeric>{{ despesa['id'] }}</md-table-cell>
                <md-table-cell>{{ despesa['VALOR_DESPESA'] | toConvertFloat | currencyBRL }}</md-table-cell>
                <md-table-cell>{{ despesa['TOTAL_PARCELAS'] }}</md-table-cell>
                <md-table-cell>{{ despesa['fornecedor'] ? despesa['fornecedor'].RAZAO_SOCIAL : "sem fornecedor" }}</md-table-cell>
                <md-table-cell>{{ despesa['forma_pagamento'].DESCRICAO }}</md-table-cell>
                 <md-table-cell>
                    <md-button class="md-icon-button md-raised md-accent" @click="activeConfirmDelete(despesa['id'])">
                        <md-icon>delete_forever</md-icon>
                    </md-button>
                 </md-table-cell>
            </md-table-row>
        </md-table>    

    </div>
</template>

<script>
    
    import formDespesa from '@/components/pages/formAdicionarDespesas'
    import Despesa from '@/services/despesa.js'
    import storageService from '@/services/storage.js'

    export default  {
        name: 'despesas',
        components: {
            formDespesa
        },
        data() {
            return {
                msgError: "",
                error: false,
                idDelete: "",
                activeModalChild: false,
                activeDelete: false,
                despesasMain: [],
            }
        },
        methods: {
            deletarDespesa: function(index)
            {
                Despesa.deleteDespesa(index)
                .then( (response) => {
                    if (response.data?.erro)
                    {
                        this.msgError = response.data.erro + ": " + index
                        this.activeError()
                        setTimeout(() => {
                            this.activeError()
                        },2000)
                    }
                })
                .then( () => this.reloadDespesas())
            },
            confirmDelete: function()
            {
                this.deletarDespesa(this.idDelete)
                this.activeDelete = false
                this.clearIdDelete()
            },
            cancelDelete: function()
            {
                this.activeDelete = false
                this.clearIdDelete()
            },
            clearIdDelete: () => {
                this.idDelete = ""
            },
            activeModal: function()
            {
                this.activeModalChild = !this.activeModalChild
            },
            activeError: function()
            {
                this.error = !this.error    
            },
            activeConfirmDelete: function(index)
            {
                 this.activeDelete = true
                 this.idDelete = index
            },
            reloadDespesas: function()
            {
                Despesa.listDespesas()
                .then((response) => this.despesasMain = response.data.data)
            }
        },
        filters: {
            toConvertFloat: (value) => {
                return parseFloat(value).toFixed(2)
            },
            currencyBRL: (value) => {
                return 'R$ ' + value
            }
        },
        mounted() {
            this.reloadDespesas()
            storageService.userLoginSuccess('value')
        }
    }

</script>

<style scoped>

</style>
