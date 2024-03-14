import { defineSemanticTokens } from '@pandacss/dev'

export const border = defineSemanticTokens.colors({
	DEFAULT: {
		value: {
			base: '{colors.neutral.200}',
			_osDark: '{colors.neutral.700}',
			_themeSepia: {
				base: '{colors.sepia.300}',
				_osDark: '{colors.sepia.700}',
			},
		},
	},
	emphasized: {
		value: {
			base: '{colors.fg}',
		},
	},
	onBgMuted: {
		value: {
			base: '{colors.neutral.300}',
			_osDark: '{colors.neutral.500}',
			_themeSepia: {
				base: '{colors.sepia.400}',
				_osDark: '{colors.sepia.600}',
			},
		},
	},
})
