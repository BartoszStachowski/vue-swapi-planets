<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Planet } from '@/types/Planet';
// components
import PaginationComponent from '@/components/Core/PaginationComponent.vue';
import PlanetCard from '@/components/Planets/PlanetCard.vue';
// composables
import { useDebounce } from '@/composables/useDebounce';

const planets = ref<Planet[]>([]);
const search = ref<string>('');
const debouncedSearch = useDebounce(search, 400);
const currentPage = ref<number>(1);
const itemsPerPage = 6;
const sortOrder = ref<'default' | 'asc' | 'desc' | 'population-asc' | 'population-desc'>('default');

const getPlanets = async () => {
  try {
    const response = await fetch('https://swapi.info/api/planets');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Planet[] = await response.json();
    planets.value = data;
  } catch (error) {
    console.error('Error fetching planets:', error);
  }
};

const filteredPlanets = computed<Planet[]>(() => {
  const query = debouncedSearch.value.toLowerCase();
  const filtered = planets.value.filter((planet) => planet.name.toLowerCase().includes(query));

  if (sortOrder.value === 'asc') {
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder.value === 'desc') {
    return [...filtered].sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOrder.value === 'population-asc') {
    return [...filtered].sort((a, b) => {
      const popA = isNaN(Number(a.population)) ? Number.MAX_SAFE_INTEGER : Number(a.population);
      const popB = isNaN(Number(b.population)) ? Number.MAX_SAFE_INTEGER : Number(b.population);
      return popA - popB;
    });
  } else if (sortOrder.value === 'population-desc') {
    return [...filtered].sort((a, b) => {
      const popA = isNaN(Number(a.population)) ? -1 : Number(a.population);
      const popB = isNaN(Number(b.population)) ? -1 : Number(b.population);
      return popB - popA;
    });
  }

  return filtered;
});

const paginatedPlanets = computed<Planet[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredPlanets.value.slice(start, start + itemsPerPage);
});

watch(debouncedSearch, () => {
  currentPage.value = 1;
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
        v-model="search"
      />

      <div class="mt-4">
        <label class="mr-2 text-white">Sort:</label>
        <select v-model="sortOrder" class="rounded bg-gray-800 px-2 py-1 text-white">
          <option value="default">default</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="population-asc">population-asc</option>
          <option value="population-desc">population-desc</option>
        </select>
      </div>
    </section>

    <section v-if="paginatedPlanets.length" class="mb-10">
      <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="planet in paginatedPlanets" :key="planet.name">
          <PlanetCard :planet="planet" />
        </li>
      </ul>
    </section>

    <PaginationComponent
      v-if="paginatedPlanets.length"
      :itemsPerPage="itemsPerPage"
      :numberOfElements="filteredPlanets.length"
      :currentPage="currentPage"
      @pageChanged="(value) => (currentPage = value)"
    />
  </main>
</template>

<style scoped></style>
