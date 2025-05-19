<script setup lang="ts">
import PlanetsView from '@/views/Planets/PlanetsView.vue';
</script>

<template>
  <Suspense>
    <PlanetsView />
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>

<style scoped></style>
