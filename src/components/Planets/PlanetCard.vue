<script setup lang="ts">
import type { Planet } from '@/types/Planet';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
};

defineProps<{
  planet: Planet;
}>();
</script>
<template>
  <div class="rounded-2xl bg-gray-800 p-6 shadow-lg transition hover:bg-gray-700">
    <h2 class="mb-2 text-2xl font-semibold text-yellow-300">{{ planet.name }}</h2>
    <p class="text-gray-300">👥 Population: {{ planet.population }}</p>
    <p class="text-gray-300">🪐 Rotation period: {{ planet.rotation_period }}</p>
    <p class="text-gray-300">🌍 Climate: {{ planet.climate }}</p>
    <p class="text-gray-300">🌌 Gravity: {{ planet.gravity }}</p>
    <p class="text-gray-300">📅 Created: {{ formatDate(planet.created) }}</p>
    <p class="text-gray-300">🔗 URL: {{ planet.url }}</p>
  </div>
</template>
