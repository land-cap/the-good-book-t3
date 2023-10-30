import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { capdUiPreset } from '~/capd-ui-preset'

export default defineConfig({
	presets: ['@pandacss/dev/presets', pandaPreset, capdUiPreset],

	jsxFramework: 'react',

	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: [
		'./src/components/**/*.{ts,tsx,js,jsx}',
		'./src/app/**/*.{ts,tsx,js,jsx}',
	],

	// Files to exclude
	exclude: [],

	// The output directory for your css system
	outdir: 'styled-system',
})
