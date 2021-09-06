import Vue from "vue";
import Router from "vue-router";

import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/login/login";
import Home from "@/components/pages/home";
import filtro from "@/components/pages/FiltroTable";
import DetalhesDespesa from "@/components/pages/DetalhesDespesa";
import modal from "@/components/tools/Modal";
import despesas from "@/components/pages/Despesa";
import formDespesa from "@/components/pages/formAdicionarDespesas";
import createAccount from "@/components/login/createAccount";
import viewAccount from "@/components/login/viewAccount";
import main from "@/components/main/";
import FormFornecedores from "@/components/pages/formFornecedores";
import FormCategorias from "@/components/pages/formCategorias";
import FormFormasPagamento from "@/components/pages/formFormasPagamento";
import AppHeader from "@/components/layouts/appHeader";
import Dashboard from "@/components/dashboard/dashboardPanel";
import Painel from "@/components/analiticys/painel";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "mainPage",
      component: main,
      meta: {
        showHeaderMenu: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        showHeaderMenu: true,
      },
    },
    {
      path: "/create-account",
      name: "createAccount",
      component: createAccount,
      meta: {
        showHeaderMenu: true,
      },
    },
    {
      path: "/view-account",
      name: "viewAccount",
      component: viewAccount,
    },
    {
      path: "*",
      name: "hello-home",
      component: HelloWorld,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/filter",
      name: "filtro",
      component: filtro,
    },
    {
      path: "/detalhes",
      name: "detalhes",
      component: DetalhesDespesa,
    },
    {
      path: "/modal",
      name: "modal",
      component: modal,
    },
    {
      path: "/despesas",
      name: "despesas",
      component: despesas,
    },
    {
      path: "/create-despesa",
      name: "formDespesa",
      component: formDespesa,
    },
    {
      path: "/create-fornecedor",
      name: "formFornecedores",
      component: FormFornecedores,
    },
    {
      path: "/create-categoria",
      name: "formCategorias",
      component: FormCategorias,
    },
    {
      path: "/create-forma-pagamento",
      name: "formFormasPagamento",
      component: FormFormasPagamento,
    },
    {
      path: "/app-header",
      name: "appHeader",
      component: AppHeader,
    },
    {
      path: "/relatorios",
      name: "dashboard-panel",
      component: Dashboard,
    },
    {
      path: "/painel",
      name: "painel",
      component: Painel,
    },
  ],
});
