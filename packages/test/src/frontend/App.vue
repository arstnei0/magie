<template>
    <button @click="count++">{{count}}</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let count = ref(0);
</script>