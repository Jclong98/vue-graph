import { defineConfig, presetWind4, transformerVariantGroup } from 'unocss'

const colors = ['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'gray', 'cyan']
const colorValues = ['100', '200', '300', '400', '500', '600', '700', '800', '900']
const safeList = colors.flatMap((color) =>
  colorValues.flatMap((value) => [
    `fill-${color}-${value}`,
    `hover:fill-${color}-${value}`,
    `active:fill-${color}-${value}`,
    `stroke-${color}-${value}`,
    `focus-visible:stroke-${color}-${value}`,
  ]),
)

export default defineConfig({
  presets: [presetWind4()],
  transformers: [transformerVariantGroup()],
  shortcuts: {
    btn: 'px-6 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700',
  },
  safelist: [...safeList],
})
