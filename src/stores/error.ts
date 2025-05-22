import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<Error | null>(null);

  const setError = (error: Error) => {
    activeError.value = error;
  };

  return {
    activeError,
    setError,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot));
}
