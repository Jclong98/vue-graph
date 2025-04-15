<script lang="ts" setup generic="T extends string | number">
import { computed } from 'vue'

const modelValue = defineModel<T>()

const inputType = computed(() => {
  if (typeof modelValue.value === 'string') return 'text'
  if (typeof modelValue.value === 'number') return 'number'
  return 'text'
})
</script>

<template>
  <input :type="inputType" v-model="modelValue" class="border px-4 py-1 rounded border-black/50" />
</template>
