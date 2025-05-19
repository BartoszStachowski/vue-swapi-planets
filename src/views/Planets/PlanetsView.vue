<script setup lang="ts">
import { ref } from 'vue';
import type { Planet } from '@/types/Planet';

const planets = ref<Planet[] | null>(null);

const getPlanets = async () => {
  const response = await fetch('https://swapi.info/api/planets');
  const data = await response.json();
  planets.value = data;
};

await getPlanets();

// await getPlanets();
</script>
<template>
  <div class="min-h-screen bg-gray-950 text-white px-4 py-8 md:px-12">
    <header class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-yellow-400">Planety Star Wars</h1>
      <p class="mt-2 text-gray-400">Eksploruj galaktykę daleko, daleko stąd...</p>
    </header>

    <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="planet in planets"
        class="bg-gray-800 rounded-2xl shadow-lg p-6 hover:bg-gray-700 transition"
        :key="planet.name"
      >
        <h2 class="text-2xl font-semibold text-yellow-300 mb-2">{{ planet.name }}</h2>
        <p class="text-sm text-gray-300 mb-1">👥 Populacja: {{ planet.population }}</p>
        <p class="text-sm text-gray-300 mb-1">🌍 Klimat: {{ planet.climate }}</p>
        <p class="text-sm text-gray-300">🌌 Grawitacja: {{ planet.gravity }}</p>
        <p class="text-sm text-gray-300">🌌 Utworzono: {{ planet.created }}</p>
        <p class="text-sm text-gray-300">🌌 Url: {{ planet.url }}</p>
      </div>
    </section>

    <div class="mt-10 text-center">
      <button
        class="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg hover:bg-yellow-300 transition"
      >
        Załaduj więcej
      </button>
    </div>
  </div>
</template>
<style></style>
