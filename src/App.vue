<script setup lang="ts">
import { useErrorStore } from './stores/error';
import PlanetsView from '@/views/Planets/PlanetsView.vue';
import AppErrorSection from '@/components/Core/AppErrorSection.vue';
import LoaderComponent from '@/components/Core/LoaderComponent.vue';

const errorStore = useErrorStore();
</script>

<template>
  <AppErrorSection v-if="errorStore.activeError" />
  <Suspense v-else>
    <PlanetsView />
    <template #fallback>
      <LoaderComponent />
    </template>
  </Suspense>
</template>

<style scoped></style>
