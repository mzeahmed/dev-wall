<script lang="ts" setup>
import Ressource from "@/interfaces/ressourceInterface";
import defaultImage from "@/assets/default.png";
import frenchFlag from "@/assets/french-flag.png";
import { computed } from "vue";
import eventBus from "@/plugins/eventBus";

// On recupere les ressource de type Ressource
const props = defineProps<{ ressource: Ressource; isBookmark: boolean }>();

// Les computed doivent toujours renvoyer une valeur
const dateInFrench = computed(() => {
  const dateObj = new Date(props.ressource.date);
  return dateObj.toLocaleDateString();
});
const mediaInFrench = computed(() => {
  switch (props.ressource.media) {
    case "post":
      return "Article";
    case "video":
      return "Video";
    case "book":
      return "Livre";
    default:
      return "ressource";
  }
});

// On definit les events que l'on va emettre aux parents
const emitter = defineEmits(["add-to-bookmarks", "remove-bookmark"]);

const addToListAction = (ressource: Ressource) => {
  emitter("add-to-bookmarks", ressource);
};
const removeFromListAction = (ressource: Ressource) => {
  emitter("remove-bookmark", ressource);
};

const openVideoDialogAction = (ressource: Ressource) => {
  eventBus.emit("open-video-dialog", ressource);
};
</script>

<template>
  <v-card class="ressource" :class="ressource.isTop ? 'isTop' : ''">
    <routerLink :to="{ name: 'Ressource', params: { id: ressource.id } }">
      <v-img height="250" :src="ressource.image || defaultImage" alt=""/>
    </routerLink>

    <v-card-title class="title-ressource">
      <img src="" alt=""/>
      {{ ressource.title }}
    </v-card-title>

    <v-card-text>
      <v-img
        v-if="ressource.lang === 'fr'"
        :src="frenchFlag"
        alt="Drapeau français"
        height="20"
      />

      {{ mediaInFrench }} ajouté le {{ dateInFrench }}
    </v-card-text>

    <v-card-actions>
      <v-btn v-if="!isBookmark" @click="addToListAction(ressource)" color="secondary">
        + Liste
      </v-btn>

      <v-btn v-if="isBookmark" @click="removeFromListAction(ressource)" color="warning">
        - Liste
      </v-btn>

      <v-btn
        v-if="ressource.media === 'video'"
        color="secondary"
        icon="mdi-video-box"
        @click="openVideoDialogAction(ressource)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.isTop {
  background-color: rgb(255, 254, 224) !important;

  .title-ressource {
    font-size: 2em !important;
  }
}
</style>
