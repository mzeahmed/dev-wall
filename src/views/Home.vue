<script lang="ts" setup>
import Ressource from "@/interfaces/ressourceInterface";
import RessourceItem from "@/components/RessourceItem.vue";
import { computed, ref } from "vue";
import useRessourceStore from "@/stores/ressourceStore";

const ressourceStore = useRessourceStore();

// L'utilisation du computed à la place ref permet d'avoir les données immediatement avec l'utilisation du store
const ressources = computed(() => ressourceStore.validRessources);

const bookmarks = ref<Ressource[]>([]);

const addToBookmarks = (ressource: Ressource) => {
  bookmarks.value.push(ressource);
};

const removeFromBookmarks = (ressourceToDelete: Ressource) => {
  // Methode i
  // bookmarks.value=  bookmarks.value.filter((ressource) => ressource.id !== ressourceToDelete.id);

  // Methode 2
  const position = bookmarks.value.indexOf(ressourceToDelete);
  bookmarks.value.splice(position, 1);
};
</script>

<template>
  <v-card v-if="bookmarks.length" class="my-6 ms-7 me-9">
    <v-card-title primary-title> Liste de lecture</v-card-title>

    <v-card-text>
      <v-row>
        <v-col
          v-for="ressource in bookmarks"
          :key="ressource.id"
          cols="12"
          md="4"
          lg="3"
        >
          <RessourceItem
            @remove-bookmark="removeFromBookmarks($event)"
            :isBookmark="true"
            :ressource="ressource"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-row>
    <v-col
      v-for="ressource in ressources"
      :key="ressource.id"
      cols="12"
      md="4"
      lg="3"
    >
      <RessourceItem
        @add-to-bookmarks="addToBookmarks($event)"
        :ressource="ressource"
        :is-bookmark="false"/>
    </v-col>
  </v-row>
</template>
