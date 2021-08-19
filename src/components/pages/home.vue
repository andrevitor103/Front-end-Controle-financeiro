<template>
    <div class="md-layout">
    <div class="md-layout md-gutter">
          <div class="md-layout-item">
        <div>
        <keep-alive>
        <transition name="fade">
            <component v-if="!filterActive" @filterTableMain="activeFilter($emit)" v-bind:is="filtro"></component>
        </transition>
        </keep-alive>
        </div>
         
         <md-dialog :md-active.sync="activeModalChild">
        
            <md-dialog-title>EDITAR</md-dialog-title>
                    <detalhesDespesa @recarregarTabela="reloadDespesas()" :despesaId="idDespesa"></detalhesDespesa>
            <md-button class="md-primary" @click="activeModal">Close</md-button>
            <md-button class="md-primary" @click="activeModal">Save</md-button>
            
          </md-dialog>

            <md-button class="md-fab md-mini md-plain" @click="activeFilter()" style="display: flex">
                <md-icon>search</md-icon>
            </md-button>
        
         <md-table md-card>
            <thead>
            <md-table-row>
                <md-table-head></md-table-head>
                <md-table-head>CONTA</md-table-head>
                <md-table-head>FORNECEDOR</md-table-head>
                <md-table-head>VALOR PARCELA</md-table-head>
                <md-table-head>Nº PARCELA</md-table-head>
                <md-table-head>DT VENCIMENTO</md-table-head>
                <md-table-head>JUROS</md-table-head>
                <md-table-head>DESCONTO</md-table-head>
                <md-table-head>DT PAGAMENTO</md-table-head>
                <md-table-head>STATUS</md-table-head>
                <md-table-head>AÇÕES</md-table-head>
            </md-table-row>
            </thead>
            <tbody  v-for="despesa in despesas" :key="despesa.id">
            <md-table-row v-for="(despesaDt,indexDt) in despesa.detalhes" :key="despesaDt.id">
                <md-table-cell>
                <md-button class="md-icon-button click"  @click="activeModal(despesaDt.id)" >
                    <md-icon>visibility</md-icon>
                </md-button>
                </md-table-cell>
                <md-table-cell>{{ despesa['forma_pagamento']['DESCRICAO'] | StrLowerCase }}</md-table-cell>
                <md-table-cell>{{ despesa['fornecedor']['RAZAO_SOCIAL'] | StrLowerCase }}</md-table-cell>
                <md-table-cell v-text="despesa['detalhes'][indexDt].VALOR_PARCELA"></md-table-cell>
                <md-table-cell>{{ despesa['TOTAL_PARCELAS'] }} / {{ despesa['detalhes'][indexDt].NUMERO_PARCELA }}</md-table-cell>
                <md-table-cell>{{ despesa['detalhes'][indexDt].DATA_VENCIMENTO }}</md-table-cell>
                <md-table-cell> {{ despesa['detalhes'][indexDt].JUROS }} </md-table-cell>
                <md-table-cell> {{ despesa['detalhes'][indexDt].DESCONTO }} </md-table-cell>
                <md-table-cell> {{  despesa['detalhes'][indexDt].DATA_PAGAMENTO  }} </md-table-cell>
                <md-table-cell :class="{'emAberto': !despesa['detalhes'][indexDt].STATUS, 'pago': despesa['detalhes'][indexDt].STATUS}">{{  despesa['detalhes'][indexDt].DATA_PAGAMENTO  == null ? 'ABERTO' : 'PAGO' }}</md-table-cell>
                <md-table-cell>
                <span>
                <md-button 
                :class="{'md-raised md-accent':  !despesa['detalhes'][indexDt].STATUS, 'md-raised md-primary': despesa['detalhes'][indexDt].STATUS }"
                @click="pagar($event, despesa['detalhes'][indexDt])">
                {{  despesa['detalhes'][indexDt].STATUS | changeTextStatus }}
                </md-button>
                </span>
                </md-table-cell>
            </md-table-row>
            </tbody> 
          </md-table>
    </div>
    </div>
    </div>
</template>

<script>
import filtro from '@/components/pages/FiltroTable'
import detalhesDespesa from '@/components/pages/DetalhesDespesa'
import Despesa from '@/services/despesa.js'
import storageService from '@/services/storage.js'

export default {
    name: 'home',
    components: {
        filtro,
        detalhesDespesa
    },
    data() {
        return {
            idDespesa: "",
            btnPagar: false,
            filterActive: true,
            activeModalChild: false,
            filtro: filtro,
            detalhesDespesa: detalhesDespesa,
            filtro2: filtro,
            despesas: {}
        }
    },
    methods: {
        teste: function () {
            if (this.filtro == this.filtro2 ) {
                this.filtro = this.detalhesDespesa
            } else {
                this.filtro = this.filtro2
            }
            alert("Aquii")
        },
        pagar: function($event, index)
        {
            Despesa.changePayment(index.id)
            .then( () => this.reloadDespesas())
        },
        activeFilter: function()
        {
            this.filterActive = !this.filterActive
        },
        activeModal: function(index)
        {    
            this.idDespesa = index
            this.activeModalChild = !this.activeModalChild
        },
        reloadDespesas: function()
        {
            Despesa.list()
            .then((response) => {
                this.despesas = response.data.detalhes_despesas
                console.log( this.despesas)
                }
            )    
        } 
    },
    filters: {
        StrLowerCase: (value) => {
                return value.toUpperCase()
        },
        changeTextStatus: (value) => {
            if (value) {
                return 'REATIVAR'
            }
            return 'PAGAR'
        }
    },
    mounted () {
            this.reloadDespesas()
            storageService.userLoginSuccess('value')
    },
    watch: {
        despesas: (value) =>{
            return value.map((valores) => {
                if (valores?.detalhes.length > 0) {
                    valores?.detalhes.map((valoresDetalhes) => {
                        if( valoresDetalhes.DATA_PAGAMENTO ){
                            valoresDetalhes['STATUS'] = true
                        }else{
                            valoresDetalhes['STATUS'] = false
                        }
                    })
                }
            })
        }
    }
}

</script>

<style scoped>
    .click {
        cursor: pointer;
        color: #f00;
    }
    .emAberto {
        color: rgba(255,0,0,1);
        font-weight: bold;
    }
    .pago {
        color: rgba(0,0,255,1);
    }
    .fade-enter-active {
    transition: all .8s ease;
    background: "#069";
    }
    .fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter, .fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0.2;
    }

</style>
