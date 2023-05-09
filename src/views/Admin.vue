<script lang="ts" setup></script>

<template>
  <h1>Administration</h1>

  <div>
    <v-btn :to="{name: 'Management'}" color="secondary">Gestion</v-btn>
    <v-btn :to="{name: 'Validation'}" color="secondary" class="ml-2">Validation</v-btn>
  </div>

  <RouterView/>
</template>
