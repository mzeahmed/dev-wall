<script lang="ts" setup>
import eventBus from "@/plugins/eventBus";
import { ref, computed } from "vue";
import Ressource from "@/interfaces/ressourceInterface";

const isOpen = ref(false);
const ressource = ref<Ressource>();

// Le computed permet de calculer une valeur a partir d'une autre
const embedUrl = computed(() => {
  return ressource.value?.url.replace("/watch?v=", "/embed/");
});

// L'event bus permet de communiquer entre composant dans toute l'application
eventBus.on("open-video-dialog", (ressourceFromEvent) => {
  isOpen.value = true;

  ressource.value = ressourceFromEvent as Ressource;
});
</script>

<template>
  <v-dialog v-if="ressource" width="700" v-model="isOpen">
    <v-card>
      <v-card-title> {{ ressource.title }}</v-card-title>

      <v-card-text>
        <!-- Les deux points avant src permettent de faire un binding, afficher le contenu de la variable au lieu de la chaine de caractere-->
        <iframe
          width="560"
          height="315"
          :src="embedUrl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="isOpen=false">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
