import { defineConfig, presetWind4, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetWind4()],
  transformers: [transformerVariantGroup()],
  shortcuts: {
    btn: 'px-6 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
  },
})
