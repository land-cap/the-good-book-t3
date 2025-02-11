import { cva, cx, type RecipeVariantProps } from 'styled-system/css'

export const iconRecipe = cva({
	base: {
		'--grad': 0,
		// @ts-ignore
		'-webkit-font-feature-settings': "'liga'",
		'-webkit-font-smoothing': 'antialiased',
		direction: 'ltr',
		display: 'inline-flex',
		'font-variation-settings':
			"'FILL' var(--fill,0), 'wght' var(--wght,400), 'GRAD' var(--grad,0)",
		fontFamily: 'Material Symbols Sharp',
		fontStyle: 'normal',
		fontWeight: 'var(--wght, 400)',
		letterSpacing: 'normal',
		lineHeight: '1',
		textTransform: 'none',
		whiteSpace: 'nowrap',
		wordWrap: 'normal',
	},
	variants: {
		fill: {
			false: { '--fill': 0 },
			true: { '--fill': 1 },
		},
		size: {
			10: { fontSize: 'token(sizes.10)', h: '10', w: '10' },
			12: { fontSize: 'token(sizes.12)', h: '12', w: '12' },
			3: {
				fontSize: 'token(sizes.3)',
				h: '3',
				w: '3',
			},
			4: {
				fontSize: 'token(sizes.4)',
				h: '4',
				w: '4',
			},
			5: { fontSize: 'token(sizes.5)', h: '5', w: '5' },
			6: { fontSize: 'token(sizes.6)', h: '6', w: '6' },
		},
		weight: {
			300: { '--wght': 300 },
			400: { '--wght': 400 },
			500: { '--wght': 500 },
			600: { '--wght': 600 },
			700: { '--wght': 700 },
		},
	},
	defaultVariants: {
		fill: false,
		size: 6,
		weight: 400,
	},
})

export type IconVariants = RecipeVariantProps<typeof iconRecipe>

export type IconProps = {
	name: string
	className?: string
} & IconVariants

export const Icon = ({ name, className, ...variants }: IconProps) => (
	<span className={cx(iconRecipe(variants), className)}>{name}</span>
)
