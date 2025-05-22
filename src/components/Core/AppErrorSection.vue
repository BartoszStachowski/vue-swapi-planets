<script setup lang="ts">
import { useErrorStore } from '@/stores/error';
import { ref } from 'vue';
const errorStore = useErrorStore();

const error = ref(errorStore.activeError);
</script>
<template>
  <div class="mx-auto min-h-[90vh] p-10 text-center text-red-500">
    <div class="text-3xl">😔</div>
    <p class="text-primary text-3xl font-extrabold">{{ error }}</p>
  </div>
</template>
