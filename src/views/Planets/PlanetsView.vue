<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Planet } from '@/types/Planet';

const planets = ref<Planet[]>([]);
const itemsPerPage = 6;
const currentPage = ref(1);

const getPlanets = async () => {
  const response = await fetch('https://swapi.info/api/planets');
  const data = await response.json();
  planets.value = data;
};

const totalPages = computed(() => Math.ceil(planets.value.length / itemsPerPage));

const paginatedPlanets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return planets.value.slice(start, start + itemsPerPage);
});

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date);
};

await getPlanets();
</script>

<template>
  <div class="min-h-screen bg-gray-950 text-white px-4 py-8 md:px-12">
    <header class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-yellow-400">Star Wars Planets</h1>
      <p class="mt-2 text-gray-400">Explore a galaxy far, far away...</p>
    </header>

    <div class="text-center mb-6">
      <input type="text" placeholder="Enter planet name" />
    </div>

    <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <!-- TODO: create component -->
      <div
        v-for="planet in paginatedPlanets"
        :key="planet.name"
        class="bg-gray-800 rounded-2xl shadow-lg p-6 hover:bg-gray-700 transition"
      >
        <h2 class="text-2xl font-semibold text-yellow-300 mb-2">{{ planet.name }}</h2>
        <p class="text-gray-300 mb-1">👥 Population: {{ planet.population }}</p>
        <p class="text-gray-300 mb-1">🌍 Climate: {{ planet.climate }}</p>
        <p class="text-gray-300">🌌 Gravity: {{ planet.gravity }}</p>
        <p class="text-gray-300">📅 Created: {{ formatDate(planet.created) }}</p>
        <p class="text-gray-300">🔗 URL: {{ planet.url }}</p>
      </div>
    </section>

    <div v-if="totalPages > 1" class="mt-10 flex justify-center gap-2 flex-wrap">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="[
          'px-4 py-2 rounded-lg transition cursor-pointer',
          page === currentPage
            ? 'bg-yellow-400 text-black font-semibold'
            : 'bg-gray-700 hover:bg-gray-600',
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<style scoped>
input {
  color: white;
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  height: 30px;
  border: 0;
  background: none;
  border-bottom: 1px solid white;
  transition: box-shadow 0.3s ease-out;
  cursor: pointer;
}
input:focus {
  outline: none;
  box-shadow: 0 10px 20px -8px rgba(225, 225, 225, 0.5);
}
</style>
