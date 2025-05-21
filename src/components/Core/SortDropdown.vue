<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { SortOrder } from '@/types/SortOrder';

defineProps<{
  sortOrder: SortOrder;
}>();

const emit = defineEmits<{
  (
    event: 'update:sortOrder',
    value: 'default' | 'asc' | 'desc' | 'population-asc' | 'population-desc',
  ): void;
}>();

const updateSort = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value as SortOrder;
  emit('update:sortOrder', value);
};
</script>

<template>
  <div class="mt-4 text-white">
    <label for="sort-select" class="mr-2">Sort:</label>
    <select
      id="sort-select"
      class="rounded bg-gray-800 px-2 py-1 text-white"
      :value="sortOrder"
      @change="updateSort"
    >
      <option value="default">Default</option>
      <option value="asc">Name A-Z</option>
      <option value="desc">Name Z-A</option>
      <option value="population-asc">Population ↑</option>
      <option value="population-desc">Population ↓</option>
    </select>
  </div>
</template>

<style scoped></style>
