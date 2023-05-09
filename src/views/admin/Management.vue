<script lang="ts" setup>
import useAdmin from "@/composables/useAdmin";

const { ressourceStore, deleteRessourceAction } = useAdmin();
</script>

<template>
  <h2>Gestion</h2>

  <v-table>
    <thead>
    <tr>
      <th>Titre</th>
      <th>Date</th>
      <th>Opération</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="ressource in ressourceStore.validRessources" :key="ressource.id">
      <td>{{ ressource.title }}</td>
      <td>{{ ressource.date }}</td>
      <td>
        <v-btn color="warning" @click="deleteRessourceAction(ressource)">
          <v-icon icon="mdi-delete"/>
          Supprimer
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>
