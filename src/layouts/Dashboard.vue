<template>
  <v-app-bar rounded>
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
    </template>
    <v-toolbar-title
      ><a href="/" class="text-decoration-none text-primary font-weight-bold">Econet</a></v-toolbar-title
    >
  </v-app-bar>

  <v-navigation-drawer v-model="sidebar" permanent>
    <v-list-item :active="route.name == 'Listagem'" link href="/">
      <v-list-item-title>Empresas</v-list-item-title>
    </v-list-item>
    <v-list-item :active="route.name == 'Criar Empresa'" link href="/new">
      <v-list-item-title>Cadastrar Empresa</v-list-item-title>
    </v-list-item>
  </v-navigation-drawer>

  <v-container
    max-width="900"
    height="100%"
    class="d-flex justify-center align-start"
  >
    <router-view />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const sidebar = ref(false);
const route = useRoute();
</script>
