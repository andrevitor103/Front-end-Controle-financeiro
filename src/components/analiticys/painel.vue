<template>
  <div>
    {{ dadosTabela }}
    <md-table>
      <md-table-row>
        <md-table-head>CARTÃO</md-table-head>
        <md-table-head>TOTAL GASTOS</md-table-head>
        <md-table-head>ABERTO</md-table-head>
        <md-table-head>PAGOS</md-table-head>
      </md-table-row>
      <md-table-row>
        <md-table-cell>TRIG</md-table-cell>
        <md-table-cell>1200</md-table-cell>
        <md-table-cell>400</md-table-cell>
        <md-table-cell>800</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import analiseService from "@/services/Analises.js";
export default {
  name: "painel",
  data() {
    return {
      msg: "Óla mundo",
      dadosTabela: [{}],
      objetoTabela: [],
      labels: [],
    };
  },
  methods: {
    buscarDadosTabela: function() {
      analiseService
        .buscarDadosTabela()
        .then((res) => {
          console.log(res.data.Dashboard);
          this.dadosTabela = res.data.Dashboard.map((val) => {
            return {
              descricao: val.forma_pagamento,
              saldoTotal: val.despesas,
              saldoAberto: val.saldo_limite - val.despesas,
              saldoPago: val.saldo_limite,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.buscarDadosTabela();
  },
};
</script>
<style lang="css" scoped></style>
