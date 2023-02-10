import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useApiStore = defineStore('api', () => {
    const apiData = reactive({results: null});

    async function getAllApiData() {
        const response = await fetch('http://localhost:3000/api/v1/funds');
        apiData.results = await response.json();
    }

    async function getSearchTerm(term) {
        const response = await fetch('http://localhost:3000/api/v1/funds?term=' + term);
        apiData.results = await response.json();
    }

    function clearSearch() {
        apiData.results = null;
    }

    return {
        apiData,
        getAllApiData,
        getSearchTerm,
        clearSearch
    }
});