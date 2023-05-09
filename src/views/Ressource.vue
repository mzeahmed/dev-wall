<script lang="ts" setup>
import defaultImage from "@/assets/default.png";
import { useRoute } from "vue-router";
import ressourceService from "@/services/ressourceService";
import { ref } from "vue";
import Ressource from "@/interfaces/ressourceInterface";
import ContentDisplay from "@/views/ContentDisplay.vue";

const route = useRoute();

const ressourceId =
  typeof route.params.id === "object" ? route.params.id[0] : route.params.id;

const ressource = ref<Ressource>();

ressourceService.getRessourceById(ressourceId).then((result) => {
  if (result) ressource.value = result;
});
</script>

<template>
  <div v-if="ressource">
    <v-row>
      <v-col cols="12" md="5">
        <v-img :src="ressource.image || defaultImage" alt=""/>
      </v-col>
      <v-col cols="12" md="7"
      ><h1>{{ ressource.title }}</h1>

        <v-rating v-model="ressource.rating"></v-rating>

        <ContentDisplay>
          <template #ressourceTitle>{{ ressource.title }}</template>
          {{ ressource.description }}
        </ContentDisplay>

        <v-btn
          class="mt-4"
          target="blank"
          :href="ressource.url"
          color="secondary"
        >
          Voir la ressource
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
