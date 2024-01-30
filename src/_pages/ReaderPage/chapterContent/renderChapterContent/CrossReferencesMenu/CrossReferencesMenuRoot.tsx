'use client'

import { Dialog, DialogTrigger } from '@ark-ui/react'
import { useSetAtom } from 'jotai/index'
import { useEffect, useState } from 'react'
import { css } from 'styled-system/css'
import { useIsClient } from 'usehooks-ts'

import { CrossReferencesMenu } from '~/_pages/ReaderPage/chapterContent/renderChapterContent/CrossReferencesMenu/CrossReferencesMenu'
import { isScrollLockedAtom } from '~/state'

import { type ChapterOMNode } from '../normalizeOriginalChapterHTML'
import { renderChapterContentFromOM } from '../renderChapterContentFromOM'

export const CrossReferencesMenuRoot = ({
	childrenOM,
}: {
	childrenOM: ChapterOMNode[]
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const setIsBodyScrollLocked = useSetAtom(isScrollLockedAtom)
	useEffect(
		() => setIsBodyScrollLocked(isMenuOpen),
		[isMenuOpen, setIsBodyScrollLocked],
	)

	const isClient = useIsClient()

	//@ts-ignore
	const isReference = childrenOM.length === 1 && !!childrenOM[0]?.['#text']

	//@ts-ignore
	const references = isReference ? (childrenOM[0]?.['#text'] as string) : null

	const footnote = !isReference ? renderChapterContentFromOM(childrenOM) : null

	return (
		<Dialog.Root
			preventScroll={false}
			open={isMenuOpen}
			onOpenChange={({ open }) => setIsMenuOpen(open)}
		>
			&nbsp;
			<span
				className={css({
					cursor: 'pointer',
					m: '-1',
					p: '1',
					fontFamily: 'sans',
					fontWeight: '1000',
					color: 'fg.faded',
				})}
			></span>
			<DialogTrigger
				onClick={() => setIsMenuOpen(true)}
				className={css({
					cursor: 'pointer',
					display: 'inline',
					m: '-1',
					p: '1',
					fontFamily: 'sans',
					fontWeight: '1000',
					color: 'fg.faded',
				})}
			>
				&dagger;
			</DialogTrigger>
			<span className={css({ color: 'blue' })}>{references}</span>
			<span className={css({ color: 'red' })}>{footnote}</span>
			{isClient ? (
				<CrossReferencesMenu
					references={references ?? undefined}
					footnote={footnote ?? undefined}
				/>
			) : null}
		</Dialog.Root>
	)
}
