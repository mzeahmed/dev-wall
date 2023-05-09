<script lang="ts" setup>
import VideoDialog from "@/components/VideoDialog.vue";
import RessourceFormDialog from "@/components/RessourceFormDialog.vue";
import useRessourceStore from "@/stores/ressourceStore";
import eventBus from "@/plugins/eventBus";

// LA LOGIQUE DE COMPOSANT DOIT RESTER DANS LE COMPOSANT,
// S'IL Y A DU CODE QUI SE REPETE DANS DES COMPOSANTS ON LE DEPLACE DANS UN COMPOSABLE

const ressourceStore = useRessourceStore();

ressourceStore.loadRessources();

const openFormRessourceAction = () => {
  eventBus.emit("open-ressource-form");
};
</script>

<template>
  <v-app>
    <v-app-bar color="primary" :elevation="2">
      <v-app-bar-title>
        <router-link class="title-site" :to="{ name: 'Home' }">
          DevWall
        </router-link>
      </v-app-bar-title>

      <v-btn :to="{ name: 'About' }">A propos</v-btn>
      <v-btn :to="{ name: 'Admin' }">Administration</v-btn>
      <v-btn @click="openFormRessourceAction">+ Ajouter</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>

    <VideoDialog />
    <RessourceFormDialog />
  </v-app>
</template>

<style>
.title-site {
  color: white;
  text-decoration: none;
}
</style>
