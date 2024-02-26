'use client'

import { useAtomValue } from 'jotai'
import { type ReactNode } from 'react'
import { css, cx } from 'styled-system/css'
import { caption } from 'styled-system/patterns'

import {
	showNonOriginalTextAtom,
	showRedLettersAtom,
	verseBreaksLineAtom,
} from '~/state'

const makeNonOriginalTextHideable =
	<P extends NonNullable<unknown>>(Component: (props: P) => ReactNode) =>
	//eslint-disable-next-line react/display-name
	(props: P) => {
		const showNonOriginalText = useAtomValue(showNonOriginalTextAtom)

		if (!showNonOriginalText) {
			return null
		}

		return <Component {...props} />
	}

export const JesusWords = ({ children }: { children: ReactNode }) => {
	const showRedLetters = useAtomValue(showRedLettersAtom)

	return (
		<span
			data-component="JesusWords"
			className={cx(showRedLetters && css({ color: 'fg.jesus_words' }))}
		>
			{children}
		</span>
	)
}

export const LargeSectionTitle = makeNonOriginalTextHideable(
	({ children }: { children: ReactNode }) => (
		<h2
			data-component="LargeSectionTitle"
			className={caption({
				fontSize: '0.75em',
				lineHeight: 'inherit',
				sm: { fontSize: '0.75em' },
			})}
		>
			{children}
		</h2>
	),
)

export const LargeSectionReference = makeNonOriginalTextHideable(
	({ children }: { children: ReactNode }) => (
		<h3
			data-component="LargeSectionReference"
			className={caption({
				fontSize: '0.75em',
				lineHeight: 'inherit',
				sm: { fontSize: '0.75em' },
			})}
		>
			({children})
		</h3>
	),
)

export const LargeSectionCrossReference = makeNonOriginalTextHideable(
	({ children }: { children: ReactNode }) => (
		<h4
			data-component="LargeSectionCrossReference"
			className={caption({
				fontSize: '0.75em',
				lineHeight: 'inherit',
				sm: { fontSize: '0.75em' },
			})}
		>
			{children}
		</h4>
	),
)

export const SectionTitle = makeNonOriginalTextHideable(
	({ children }: { children: ReactNode }) => (
		<h2
			data-component="SectionTitle"
			className={css({
				color: 'fg.subtle',
				fontSize: '1.25em',
				textAlign: 'left',
			})}
		>
			{children}
		</h2>
	),
)

export const VerseLabel = ({ verseNumber }: { verseNumber: ReactNode }) => {
	const verseBreaksLine = useAtomValue(verseBreaksLineAtom)

	const LabelTag = verseBreaksLine ? 'span' : 'sup'

	return (
		<span
			data-component="VerseLabel"
			className={cx(
				css({
					display: 'inline-block',
					textIndent: 0,
					color: 'fg.subtle',
					textDecoration: 'none',
				}),
				verseBreaksLine &&
					css({
						left: '-2',
						pos: 'absolute',
						sm: { left: '-3' },
						top: 0,
						transform: 'translateX(-100%)',
					}),
			)}
		>
			{!verseBreaksLine && ' '}
			<LabelTag
				className={cx(
					css({ fontFamily: 'mono', fontStyle: 'normal' }),
					verseBreaksLine &&
						css({
							fontSize: '0.625em',
							sm: { fontSize: '0.75em' },
						}),
				)}
			>
				{verseNumber}
			</LabelTag>
			{!verseBreaksLine && <>&nbsp;</>}
		</span>
	)
}
