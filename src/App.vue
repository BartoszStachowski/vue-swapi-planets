<script setup lang="ts">
import { useErrorStore } from './stores/error';
import PlanetsView from '@/views/Planets/PlanetsView.vue';
import AppErrorSection from '@/components/Core/AppErrorSection.vue';

const errorStore = useErrorStore();
</script>

<template>
  <AppErrorSection v-if="errorStore.activeError" />
  <Suspense v-else>
    <PlanetsView />
    <template #fallback>
      <!-- TODO: add loader -->
      <h1 class="text-white">Loading...</h1>
    </template>
  </Suspense>
</template>

<style scoped></style>
