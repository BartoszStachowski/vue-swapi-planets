<script setup lang="ts">
import PlanetsView from '@/views/Planets/PlanetsView.vue';
</script>

<template>
  <Suspense>
    <PlanetsView />
    <template #fallback>
      <!-- TODO: add loader -->
      <h1 class="text-white">Loading...</h1>
    </template>
  </Suspense>
</template>

<style scoped></style>
