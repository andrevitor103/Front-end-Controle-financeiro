<template>
  <div>
    <div class="md-layout md-gutter" style="max-width: 100%">
      <div class="md-layout-item">
        <div>
          <transition name="fade">
            <keep-alive>
              <component
                v-if="!filterActive"
                @filterTableMain="toggleFilter($event)"
                v-bind:is="filtro"
              ></component>
            </keep-alive>
          </transition>
        </div>

        <md-dialog :md-active.sync="activeModalChild">
          <md-dialog-title>EDITAR</md-dialog-title>
          <detalhesDespesa
            @recarregarTabela="actulizeValuesToEdit($event)"
            :despesaId="idDespesa"
          ></detalhesDespesa>
          <md-button class="md-primary" @click="activeModal">Close</md-button>
          <md-button class="md-primary" @click="activeModal">Save</md-button>
        </md-dialog>
        <div>
          <md-button
            class="md-fab md-mini md-plain"
            @click="toggleFilter($event)"
            style="display: flex"
          >
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
                <md-button
                  class="md-icon-button click"
                  @click="activeModal(despesa.id)"
                >
                  <md-icon>visibility</md-icon>
                </md-button>
              </md-table-cell>
              <md-table-cell>{{
                despesa["DESCRICAO"] | StrLowerCase
              }}</md-table-cell>
              <md-table-cell>{{
                despesa["RAZAO_SOCIAL"] | StrLowerCase
              }}</md-table-cell>
              <md-table-cell v-text="despesa['VALOR_PARCELA']"></md-table-cell>
              <md-table-cell> {{ despesa["NUMERO_PARCELA"] }}</md-table-cell>
              <md-table-cell>{{ despesa["DATA_VENCIMENTO"] }}</md-table-cell>
              <md-table-cell> {{ despesa["JUROS"] }} </md-table-cell>
              <md-table-cell> {{ despesa["DESCONTO"] }} </md-table-cell>
              <md-table-cell> {{ despesa["DATA_PAGAMENTO"] }} </md-table-cell>
              <md-table-cell
                :class="{
                  emAberto: despesa['DATA_PAGAMENTO'] == null,
                  pago: despesa['DATA_PAGAMENTO'] != null,
                }"
                >{{
                  despesa["DATA_PAGAMENTO"] == null ? "ABERTO" : "PAGO"
                }}</md-table-cell
              >
              <md-table-cell>
                <span>
                  <md-button
                    :class="{
                      'md-raised md-accent': despesa['DATA_PAGAMENTO'] == null,
                      'md-raised md-primary': despesa['DATA_PAGAMENTO'] != null,
                    }"
                    @click="pagar($event, despesa)"
                  >
                    {{ despesa["DATA_PAGAMENTO"] | changeTextStatus }}
                  </md-button>
                </span>
              </md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell>TOTAL</md-table-cell>
              <md-table-cell></md-table-cell>
              <md-table-cell></md-table-cell>
              <md-table-cell class="total totalParcelas">{{
                total
              }}</md-table-cell>
              <md-table-cell></md-table-cell>
              <md-table-cell></md-table-cell>
              <md-table-cell class="total totalJuros">{{
                totalJuros
              }}</md-table-cell>
              <md-table-cell class="total totalDesconto">{{
                totalDesconto
              }}</md-table-cell>
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
import filtro from "@/components/pages/FiltroTable";
import detalhesDespesa from "@/components/pages/DetalhesDespesa";
import Despesa from "@/services/despesa.js";
import storageService from "@/services/storage.js";

export default {
  name: "home",
  components: {
    filtro,
    detalhesDespesa,
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
      filtroActive: "",
      despesas: {},
    };
  },
  methods: {
    actulizeValuesToEdit: function($event) {
      $event;
      this.reloadDespesas();
    },
    pagar: function($event, index) {
      Despesa.changePayment(index.id).then(() => {
        let positionArray = this.despesas.indexOf(index);
        if (positionArray != -1) {
          if (this.despesas[positionArray].DATA_PAGAMENTO != null) {
            this.despesas[positionArray].DATA_PAGAMENTO = null;
            return "";
          }
          let dateNow = new Date();
          const dateActual = () => {
            dateNow = `${dateNow.getFullYear()} -  ${
              dateNow.getMonth() <= 9 ? "0" : ""
            }${dateNow.getMonth() + 1} - ${
              dateNow.getDate() <= 9 ? "0" : ""
            }${dateNow.getDate()}`;
            return dateNow;
          };

          this.despesas[positionArray].DATA_PAGAMENTO = dateActual();
        }
      });
    },
    toggleFilter: function($event) {
      this.filterActive = !this.filterActive;
      this.filtroActive = $event?.component?.filter;
      this.clearAndGetDatasTable();
    },
    clearAndGetDatasTable: async function($event) {
      $event;
      this.reloadDespesas();
    },
    clearTable: function() {
      this.despesas = [];
    },
    activeModal: function(index) {
      this.idDespesa = index;
      this.activeModalChild = !this.activeModalChild;
    },
    reloadDespesas: function() {
      if (this.filtroActive != "") {
        Despesa.filter(this.filtroActive).then((response) => {
          this.despesas = response.data.detalhes_despesas;
        });
        return "";
      }

      Despesa.list().then((response) => {
        this.despesas = response.data.detalhes_despesas;
      });
    },
  },
  computed: {
    total: function() {
      let total = 0;
      let diferenca = 0;
      this.despesas.map((despesa) => {
        total += parseFloat(despesa.VALOR_PARCELA);
        diferenca +=
          (parseFloat(despesa.DESCONTO) ?? 0) -
          (parseFloat(despesa.JUROS) ?? 0);
      });
      if (diferenca < 0) {
        return eval(total + diferenca).toFixed(2);
      }
      return eval(total - diferenca).toFixed(2);
    },
    totalJuros: function() {
      let totalJuros = 0;
      this.despesas.map((despesa) => {
        totalJuros += parseFloat(despesa.JUROS);
      });
      return totalJuros.toFixed(2);
    },
    totalDesconto: function() {
      let totalDesconto = 0;
      this.despesas.map((despesa) => {
        totalDesconto += parseFloat(despesa.DESCONTO);
      });
      return totalDesconto.toFixed(2);
    },
  },
  filters: {
    StrLowerCase: (value) => {
      return value.toUpperCase();
    },
    changeTextStatus: (value) => {
      if (value) {
        return "REATIVAR";
      }
      return "PAGAR";
    },
  },
  created() {
    this.reloadDespesas();
    storageService.userLoginSuccess("value");
  },
  watch: {
    despesas: (value) => {
      return value;
    },
  },
};
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
  color: rgba(255, 0, 0, 1);
  font-weight: bold;
}
.pago {
  color: rgba(0, 0, 255, 1);
}
.fade-enter-active {
  transition: all 0.8s ease;
  background: "#069";
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0.2;
}
</style>
