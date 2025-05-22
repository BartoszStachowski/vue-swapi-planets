<script setup lang="ts">
import type { Planet } from '@/types/Planet';
import { formatDate } from '@/utils/formatDate';

defineProps<{
  planet: Planet;
}>();
</script>
<template>
  <div
    class="mx-auto max-w-xs rounded-2xl bg-gray-800 p-6 shadow-lg transition hover:bg-gray-700 md:max-w-none"
  >
    <h2 class="mb-2 text-2xl font-semibold text-yellow-300">{{ planet.name }}</h2>
    <p class="card-paragraph">👥 Population: {{ planet.population }}</p>
    <p class="card-paragraph">🪐 Rotation period: {{ planet.rotation_period }}</p>
    <p class="card-paragraph">🌍 Climate: {{ planet.climate }}</p>
    <p class="card-paragraph">🌌 Gravity: {{ planet.gravity }}</p>
    <p class="card-paragraph">📅 Created: {{ formatDate(planet.created) }}</p>
    <p class="card-paragraph">🔗 URL: {{ planet.url }}</p>
  </div>
</template>

<style>
@reference "@/assets/main.css";

.card-paragraph {
  @apply truncate overflow-hidden whitespace-nowrap text-gray-300;
}
</style>
