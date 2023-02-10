<script setup>
import { useApiStore } from '../stores/apiStore'

const props = defineProps(['term'])

const apiStore = useApiStore();

function boldElement(element) {
    if (!props.term || props.term.length < 2) {
        return element;
    }
    if (element.toLowerCase().includes(props.term.toLowerCase())) {
        const matchedIndex = element.toLowerCase().indexOf(props.term.toLowerCase());
        const matched = "<b>" + element.substring(matchedIndex, matchedIndex + props.term.length) + "</b>";
        return element.substring(0, matchedIndex) + matched + element.substring(matchedIndex + props.term.length, element.length);
    }
    return element;
};
</script>
<template>
<div class="overflow-hidden border border-secondarygrey rounded-lg py-3 shadow-xl" id="searchResults">
    <div class="grid px-4">
        <div class="grid grid-cols-4 border-b-4">
            <div class="col-span-2 secondary-text">
                Name
            </div>
            <div class="col-span-1 secondary-text">
                Ticker
            </div>
            <div class="col-span-1 secondary-text">
                Exchange
            </div>
        </div>
        <div v-for="result in apiStore.apiData.results" @click="apiStore.selectResult(result.id, result)" class="grid grid-cols-4 border-b-2 hover:bg-lightgrey cursor-pointer primary-text">
            <div class="col-span-2 text-ellipsis" v-html="boldElement(result.name)">
            </div>
            <div class="col-span-1" v-html="boldElement(result.ticker)">
            </div>
            <div class="col-span-1" v-html="boldElement(result.exchange)">
            </div>
        </div>
    </div>
</div>
</template>
<style>
#searchResults {
    height: 300px;
    overflow: scroll;
}

.primary-text {
    color: #000000;
}

.secondary-text {
    color: #5E5E5E;
}
</style>