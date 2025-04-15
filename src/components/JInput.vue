<script lang="ts" setup>
const modelValue = defineModel<string>({
  default: '',
})
</script>

<template>
  <input type="text" v-model="modelValue" class="border px-4 py-1 rounded border-black/50" />
</template>
