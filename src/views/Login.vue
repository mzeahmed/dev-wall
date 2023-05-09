<script lang="ts" setup>
import { ref } from "vue";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();

const router = useRouter();

const message = ref("");

const credentials = ref({ email: "admin@gmail.com", password: "12345" });

const connectAction = async () => {
  const result = await authStore.connect(credentials.value);

  if (!result) {
    message.value = "Couple login / mot de passe incorrect";
  } else {
    await router.push({ name: "Admin" });
  }
};
</script>

<template>
  <v-card>
    <v-card-title>
      <h1>Connexion</h1>
    </v-card-title>

    <v-card-text>
      <v-alert class="my-5" v-if="message" type="error">
        {{ message }}
      </v-alert>

      <v-text-field
        name="email"
        label="Adresse email"
        id="email"
        v-model="credentials.email"
      ></v-text-field>

      <v-text-field
        name="password"
        label="Mot de passe"
        id="password"
        v-model="credentials.password"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn @click="connectAction" color="secondary">Connexion</v-btn>
    </v-card-actions>
  </v-card>
</template>
