<script lang="ts" setup>
import useAdmin from "@/composables/useAdmin";

const { ressourceStore, deleteRessourceAction, validateRessourceAction } = useAdmin();
</script>

<template>
  <h2>Validation</h2>

  <v-table>
    <thead>
    <tr>
      <th>Titre</th>
      <th>Date</th>
      <th>Opération</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="ressource in ressourceStore.invalidRessources" :key="ressource.id">
      <td>{{ ressource.title }}</td>
      <td>{{ ressource.date }}</td>
      <td>
        <v-btn color="success" @click="validateRessourceAction(ressource)">
          <v-icon icon="mdi-delete"/>
          Valider
        </v-btn>

        <v-btn class="ml-3" color="warning" @click="deleteRessourceAction(ressource)">
          <v-icon icon="mdi-delete"/>
          Supprimer
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>
