<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout">
    <header class="px-4 py-2 bg-gray-800 text-white">
      <div class="wrapper">
        <nav class="flex gap-4">
          <RouterLink active-class="underline" to="/"> Home </RouterLink>
          <RouterLink active-class="underline" to="/wand-graph"> Wand Graph </RouterLink>
          <RouterLink active-class="underline" to="/d3-graph-controller">
            d3-graph-controller
          </RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
