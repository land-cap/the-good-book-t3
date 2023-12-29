import { defineConfig, defineUtility } from '@pandacss/dev'
import { type ShadowToken } from 'styled-system/tokens'

const fixStickyContainer = defineUtility({
	transform(value) {
		if (!value) return {}
		return {
			'-webkit-transform': 'translateZ(0)',
		}
	},
	values: { type: 'boolean' },
})

const gridColumn = defineUtility({
	transform: (value: ShadowToken) => ({
		gridColumn: value,
	}),
	values: ['fullbleed', 'content', 'margin-left', 'margin-right'],
})

const gridTemplateColumns = defineUtility({
	transform: (value: ShadowToken) => ({
		gridTemplateColumns: value,
	}),
	values: ['subgrid'],
})

export const utilities = defineConfig({
	utilities: {
		fixStickyContainer,
		gridColumn,
		gridTemplateColumns,
	},
}).utilities
