<script setup>
import { ref, watch } from 'vue'
import { useApiStore } from '../stores/apiStore'
import SearchResults from './SearchResults.vue'

const apiStore = useApiStore();
const searchTerm = ref(null);

watch(searchTerm, newSearchTerm => {
    if (newSearchTerm && newSearchTerm.length > 1) {
        apiStore.getSearchTerm(newSearchTerm);
    }
})

function clearSearch() {
    searchTerm.value = null;
    apiStore.clearSearch();
}
</script>
<template>
    <div class="flex flex-col basis-full items-center justify-center">
        <div class="px-1 relative">
            <span class="material-symbols-outlined icon-color" id="searchIcon">search</span>
            <input type="text" class="p-4 pl-8 m-2 border rounded-lg" placeholder="Search for securities" v-model="searchTerm"/>
            <span v-if="searchTerm" class="material-symbols-outlined icon-color cursor-pointer rounded-full hover:bg-lightgrey" id="closeIcon" @click="clearSearch">close</span>
        </div>
        <div class="px-3" v-show="apiStore.apiData.results">
            <SearchResults :term="searchTerm" />
        </div>
    </div>
</template>
<style>
* {
    font-family: "Roboto";
}

#searchIcon {
    top: 25px;
    left: 15px;
    position: absolute;
}

#closeIcon {
    position: absolute;
    top: 25px;
    right: 25px;
}

.icon-color {
    color: #5E5E5E;
}

.hover-color {
    color: #E9EFFF;
}

</style>