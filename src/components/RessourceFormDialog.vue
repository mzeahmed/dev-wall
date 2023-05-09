<script lang="ts" setup>
import Ressource from "@/interfaces/ressourceInterface";
import eventBus from "@/plugins/eventBus";
import { ref } from "vue";
import useRessourceStore from "@/stores/ressourceStore";

const isOpen = ref(false);

const form = ref();

const message = ref<{ color: string; text: string }>();

const ressourceStore = useRessourceStore();

const ressourceAdded = ref(false);

const itemsLang = [
  {
    text: "Français",
    value: "fr",
  },
  {
    text: "Anglais",
    value: "en",
  },
];

const itemsMedia = [
  {
    text: "Article",
    value: "post",
  },
  {
    text: "Livre",
    value: "book",
  },
  {
    text: "Vidéo",
    value: "video",
  },
];

const ressource = ref<Ressource>({
  title: "",
  url: "",
  image: "",
  description: "",
  lang: "en",
  media: "post",
  isTop: false,
  isValid: false,
  date: "",
  rating: 3,
});

eventBus.on("open-ressource-form", () => {
  isOpen.value = true;
  message.value = { text: "", color: "" };
});

// Validation du formulaire
const titleRules = [
  (v: string) => !!v || "Le titre est obligatoire",
  (v: string) => v.length >= 3 || "Le titre doit faire moins de 3 caractères",
];

const addRessourceAction = async () => {
  const validForm = await form.value.validate();

  if (validForm.valid) {
    const dateObj = new Date();
    ressource.value.date = dateObj.toISOString();
    
    const createdRessource = await ressourceStore.addRessource(ressource.value);

    if (createdRessource) {
      message.value = {
        color: "success",
        text: "Ressource ajoutée avec succès !",
      };

      ressourceAdded.value = true;
    } else {
      message.value = {
        color: "danger",
        text: "Une erreur est survenue lors de l'ajout de la ressource !",
      };
    }
  }
};
</script>

<template>
  <v-dialog v-model="isOpen" width="800">
    <v-card>
      <v-card-title> Ajout d'une nouvelle ressource</v-card-title>

      <v-card-text>

        <v-alert v-if="message?.text" :color="message.color" dismissible>{{ message.text }}</v-alert>

        <!-- La balise template ne laisse pas de trace dans le dom-->
        <template v-if="!message?.text">
          <v-form ref="form">
            <v-text-field
              v-model="ressource.title"
              name="title"
              label="Titre"
              id="title"
              :rules="titleRules"
            ></v-text-field>

            <v-text-field
              v-model="ressource.url"
              name="url"
              label="Lien"
              id="url"
            ></v-text-field>

            <v-text-field
              v-model="ressource.image"
              name="image"
              label="Adresse de l'image"
              id="image"
            ></v-text-field>

            <v-text-field
              v-model="ressource.description"
              label="Description"
              name="description"
              textarea
            ></v-text-field>

            <v-rating v-model="ressource.rating"/>

            <v-select
              v-model="ressource.lang"
              :items="itemsLang"
              item-title="text"
              item-value="value"
              label="Langue"
            ></v-select>

            <v-select
              v-model="ressource.media"
              :items="itemsMedia"
              item-title="text"
              item-value="value"
              label="Type de média"
            ></v-select>
          </v-form>
        </template>
      </v-card-text>

      <v-card-actions>
        <v-btn v-if="!ressourceAdded" @click="addRessourceAction" color="secondary">Ajouter</v-btn>
        <v-btn @click="isOpen = false">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
