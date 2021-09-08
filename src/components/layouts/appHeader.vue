<template>
  <div class="page-container">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title positionImage">
          <md-avatar class="md-large imageUser">
            <img :src="fotoUsuarioTmp" />
          </md-avatar>
        </span>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Opções</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>home</md-icon>
            <span class="md-list-item-text"
              ><router-link class="decorationLink" to="/home"
                >Página inicial</router-link
              ></span
            >
          </md-list-item>
          <md-list-item>
            <md-icon>paid</md-icon>
            <span class="md-list-item-text"
              ><router-link class="decorationLink" to="/despesas"
                >Despesas</router-link
              ></span
            >
          </md-list-item>
          <md-list-item>
            <md-icon>insights</md-icon>
            <span class="md-list-item-text"
              ><router-link class="decorationLink" to="/relatorios"
                >Análises</router-link
              ></span
            >
          </md-list-item>
          <md-list-item>
            <md-icon>account_circle</md-icon>
            <span class="md-list-item-text"
              ><router-link class="decorationLink" to="/view-account"
                >Sua conta</router-link
              ></span
            >
          </md-list-item>
          <md-list-item>
            <md-icon>logout</md-icon>
            <span class="md-list-item-text"
              ><router-link class="decorationLink" to="/login"
                >Sair</router-link
              ></span
            >
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <slot></slot>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import storageService from "@/services/storage.js";

export default {
  name: "app-header",
  data: () => ({
    menuVisible: false,
    fotoUsuarioTmp: "../../assets/logo-sem_fundo.png",
  }),
  mounted() {
    this.fotoUsuarioTmp = storageService.getStorage("picture");
  },
};
</script>

<style lang="css" scoped>
.positionImage {
  display: inline-block;
  position: relative;
  left: 90%;
}
.imageUser {
  width: 50px;
  background-image: url(../../assets/perfil.jpg);
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  display: none;
}
.decorationLink {
  text-decoration: none !important;
}
</style>
