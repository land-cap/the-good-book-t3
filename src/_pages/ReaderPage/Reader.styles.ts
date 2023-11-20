import { css } from 'styled-system/css'
import { styled } from 'styled-system/jsx'

export const ChapterTitle = styled('h1', {
	base: {
		my: { base: '12', md: '16' },
		textStyle: { base: '4xl', md: '5xl' },
		fontWeight: 'blacker',
	},
})

const bodyStyles = {
	textStyle: { base: 'md', md: 'lg' },
	lineHeight: { base: '2.25em', md: '2.5em' },
}

export const readerStyles = css({
	...bodyStyles,
	color: { _osDark: 'fg.muted' },

	'& *:where(.note, .chapter > .label, .cl)': { display: 'none' },

	'& .r': {
		my: { base: '4', md: '5' },
		fontSize: { base: 'xs', md: 'sm' },
		fontWeight: 'bold',
		color: 'fg.subtle',
	},

	'& .p': {
		display: 'inline',
	},

	'& [class^="q"]': { mt: { base: '4', md: '5' }, fontFamily: 'mono' },

	'& [class^="q"] + [class^="q"]': { mt: '0' },

	'& [class^="q"] + :not([class^="q"])': { mt: { base: '4', md: '5' } },

	'& .wj': { color: { base: 'red.600', _osDark: 'red.400' } },

	'& *:where([class^="ms"], .mr)': {
		display: 'flex',
	},

	'& *:where([class^="ms"], .mr) .heading': {
		display: 'inline',
		textStyle: { base: 'xs', md: 'sm' },
		fontWeight: 'black',
		letterSpacing: '0.05em',
		lineHeight: bodyStyles.lineHeight,
		color: 'fg.subtle',
	},

	'& *:not(*:where([class^="ms"], .mr)) + *:where([class^="ms"], .mr)': {
		mt: { base: '4', md: '5' },
	},

	'& *:where([class^="ms"], .mr) + *:not(*:where([class^="ms"], .mr))': {
		mb: { base: '4', md: '5' },
	},

	'& [class^="s"] .heading': {
		display: 'block',
		my: { base: '4', md: '5' },
		textStyle: { base: 'xl', md: '2xl' },
		fontWeight: 'bold',
	},

	'& .verse .label': {
		fontFamily: 'sans',
		fontWeight: 'black',

		'&:after': {
			content: '"\\00a0"',
			...bodyStyles,
		},
	},
})
