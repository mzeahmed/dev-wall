<template>
  <div class="content-display">
    <h3>Description "
      <slot name="ressourceTitle"/>
      "
    </h3>
    <slot/>
  </div>
</template>

<style scoped>
.content-display {
  border: 1px grey solid;
  padding: 5px;
}
</style>
