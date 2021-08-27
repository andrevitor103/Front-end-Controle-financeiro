<template>
    <div>
    <div class="md-layout md-gutter" style="max-width: 100%">
          <div class="md-layout-item">
        <div>
        <transition name="fade">
            <keep-alive>
                <component v-if="!filterActive" @filterTableMain="toggleFilter($event)" v-bind:is="filtro"></component>
            </keep-alive>
        </transition>
        </div>
         
         <md-dialog :md-active.sync="activeModalChild">
        
            <md-dialog-title>EDITAR</md-dialog-title>
                    <detalhesDespesa @recarregarTabela="reloadDespesas()" :despesaId="idDespesa"></detalhesDespesa>
            <md-button class="md-primary" @click="activeModal">Close</md-button>
            <md-button class="md-primary" @click="activeModal">Save</md-button>
            
          </md-dialog>
            <div>
                <md-button class="md-fab md-mini md-plain" @click="toggleFilter($event)" style="display: flex">
                    <md-icon>search</md-icon>
                </md-button>
            </div>
        
         <md-table style="max-width: 100%; margin-bottom: 20px">
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
            <tbody>
            <md-table-row v-for="despesa in despesas" :key="despesa.id">
                <md-table-cell>
                <md-button class="md-icon-button click"  @click="activeModal(despesa.id)" >
                    <md-icon>visibility</md-icon>
                </md-button>
                </md-table-cell>
                <md-table-cell>{{ despesa["DESCRICAO"] | StrLowerCase }}</md-table-cell>
                <md-table-cell>{{ despesa['RAZAO_SOCIAL'] | StrLowerCase }}</md-table-cell>
                <md-table-cell v-text="despesa['VALOR_PARCELA']"></md-table-cell>
                <md-table-cell> {{ despesa['NUMERO_PARCELA'] }}</md-table-cell>
                <md-table-cell>{{ despesa['DATA_VENCIMENTO'] }}</md-table-cell>
                <md-table-cell> {{ despesa['JUROS'] }} </md-table-cell>
                <md-table-cell> {{ despesa['DESCONTO'] }} </md-table-cell>
                <md-table-cell> {{  despesa['DATA_PAGAMENTO']  }} </md-table-cell>
                <md-table-cell :class="{'emAberto': !despesa['STATUS'], 'pago': despesa['STATUS']}">{{  despesa['DATA_PAGAMENTO']  == null ? 'ABERTO' : 'PAGO' }}</md-table-cell>
                <md-table-cell>
                <span>
                <md-button 
                :class="{'md-raised md-accent':  !despesa['STATUS'], 'md-raised md-primary': despesa['STATUS'] }"
                @click="pagar($event, despesa)">
                {{  despesa['STATUS'] | changeTextStatus }}
                </md-button>
                </span>
                </md-table-cell>
            </md-table-row>
            <md-table-row>
                <md-table-cell>TOTAL</md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell class='total totalParcelas'>{{ total }}</md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell class='total totalJuros'>{{ totalJuros }}</md-table-cell>
                <md-table-cell class='total totalDesconto'>{{ totalDesconto }}</md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell></md-table-cell>
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
        pagar: function($event, index)
        {
            Despesa.changePayment(index.id)
            .then( () => this.reloadDespesas())
        },
		toggleFilter: function($event) {
            this.filterActive = !this.filterActive  
            this.clearAndGetDatasTable($event)
        },
		clearAndGetDatasTable: async function($event) {
            /*await this.clearTable()*/
            this.reloadDespesas($event)    
        },
		clearTable: function() {
            this.despesas = []
        },
        activeModal: function(index)
        {    
            this.idDespesa = index
            this.activeModalChild = !this.activeModalChild
        },
         reloadDespesas: function($event)
        {
			if ($event?.component?.filter) {
			
            Despesa.filter($event.component.filter)
            .then((response) => {
                this.despesas = response.data.detalhes_despesas
                console.log( this.despesas)
                }
            )
			return "";
		}			
	
		Despesa.list()
            .then((response) => {
                this.despesas = response.data.detalhes_despesas
                console.log( this.despesas)
                }
            )   
    }
	}
	,
    computed: {
        total: function () {
            let total = 0;
            let diferenca = 0;
            this.despesas.map((despesa) => {
                total += parseFloat(despesa.VALOR_PARCELA)
                  diferenca += (parseFloat(despesa.DESCONTO) ?? 0) - ( parseFloat(despesa.JUROS) ?? 0 )
            })
            if (diferenca < 0) {
                return eval(total + diferenca).toFixed(2)
            }
            return eval(total - diferenca).toFixed(2)
        },
        totalJuros: function () {
            let totalJuros = 0;
            this.despesas.map((despesa) => {
                totalJuros += parseFloat(despesa.JUROS)
            })
            return totalJuros.toFixed(2)
        },
        totalDesconto: function () {
            let totalDesconto = 0;
            this.despesas.map((despesa) => {
                totalDesconto += parseFloat(despesa.DESCONTO)
            })
            return totalDesconto.toFixed(2)
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
			/*this.clearAndGetDatasTable()*/
            storageService.userLoginSuccess('value')
    },
    watch: {
        despesas: (value) =>{
            return value.map((valores) => {
                    if( valores.DATA_PAGAMENTO ){
                        valores['STATUS'] = true
                    }else{
                        valores['STATUS'] = false
                    }
            })
        }
    }
}
</script>

<style scoped>

    .total {
        font-size: 14px;
        font-weight: bold;
    }

    .totalParcelas {
        color: blue;
    }
    .totalJuros {
        color: red;
    }
    .totalDesconto {
        color: green;
    }
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