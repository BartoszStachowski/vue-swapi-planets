<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Planet } from '@/types/Planet';
// components
import PaginationComponent from '@/components/Core/PaginationComponent.vue';
import PlanetCard from '@/components/Planets/PlanetCard.vue';

const planets = ref<Planet[]>([]);

const getPlanets = async () => {
  const response = await fetch('https://swapi.info/api/planets');
  const data = await response.json();
  planets.value = data;
};

const itemsPerPage = 6;
const currentPage = ref(1);

const paginatedPlanets = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return planets.value.slice(start, start + itemsPerPage);
});

await getPlanets();
</script>

<template>
  <main class="min-h-screen bg-gray-950 px-4 py-8 text-white md:px-12">
    <header class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-yellow-400">Star Wars Planets</h1>
      <p class="mt-2 text-gray-400">Explore a galaxy far, far away...</p>
    </header>

    <section class="mb-6 text-center">
      <label class="sr-only" for="search">Search planets</label>
      <input
        id="search"
        name="search"
        class="h-8 cursor-pointer border-b text-center text-lg font-light text-white focus:shadow-lg focus:shadow-slate-500/50 focus:outline focus:transition-shadow focus:duration-300 focus:ease-out"
        type="text"
        placeholder="Enter planet name"
      />
    </section>

    <section class="mb-10">
      <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="planet in paginatedPlanets" :key="planet.name">
          <PlanetCard :planet="planet" />
        </li>
      </ul>
    </section>

    <PaginationComponent
      :itemsPerPage="itemsPerPage"
      :numberOfElements="planets.length"
      :currentPage="currentPage"
      @pageChanged="(value) => (currentPage = value)"
    />
  </main>
</template>

<style scoped></style>
