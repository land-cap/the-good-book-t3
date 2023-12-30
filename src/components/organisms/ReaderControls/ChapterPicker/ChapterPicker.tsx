'use client'

import { Dialog, Portal, Tabs } from '@ark-ui/react'
import { useParams } from 'next/navigation'
import { range, splitWhen } from 'ramda'
import { useEffect, useMemo, useRef, useState } from 'react'
import { css, cx } from 'styled-system/css'
import { macrogrid } from 'styled-system/patterns'

import type { TReaderPageParams } from '~/_pages/ReaderPage/ReaderPage.types'
import type { getBookList, TBook } from '~/db'

import { BookList_ChapterPicker } from './BookList_ChapterPicker'
import { BookListItem_ChapterPicker } from './BookListItem_ChapterPicker'
import { BookListSectionHeader_ChapterPicker } from './BookListSectionHeader_ChapterPicker'
import { ChapterList_ChapterPicker } from './ChapterList_ChapterPicker'
import { ChapterListHeader_ChapterPicker } from './ChapterListHeader_ChapterPicker'
import { ChapterListItem_ChapterPicker } from './ChapterListItem_ChapterPicker'
import { Container_ChapterPicker } from './Container_ChapterPicker'
import { Header_ChapterPicker } from './Header_ChapterPicker'
import { Trigger_ChapterPicker } from './Trigger_ChapterPicker'

const tabsContentCss = macrogrid({
	'&[data-state=closed]': {
		display: 'none',
	},
	fixStickyContainer: true,
	gridColumn: 'fullbleed',
	h: 'full',
	overflowY: 'scroll',
})

export const ChapterPicker = ({
	currBook,
	currChapter,
	bookList,
}: {
	currChapter: number
	currBook: TBook
	bookList: TBook[]
}) => {
	const { readerMode } = useParams<TReaderPageParams>()

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		setIsOpen(false)
	}, [currBook, currChapter])

	const [tab, setTab] = useState<string | null>('book')

	const [selectedBook, setSelectedBook] =
		useState<Awaited<ReturnType<typeof getBookList>>[0]>(currBook)

	useEffect(() => {
		setSelectedBook(currBook)
	}, [currBook])

	const [oldTestamentBookList, newTestamentBookList] = useMemo(
		() => splitWhen((book: TBook) => book.code === 'mat')(bookList),
		[bookList],
	)

	const chapterList = useMemo(
		() => range(1)(selectedBook.chapter_count + 1),
		[selectedBook],
	)

	const chapterListItemRef = useRef<HTMLLIElement>()

	const [chapterListItemHeight, setChapterListItemHeight] = useState<number>(0)

	useEffect(() => {
		const handleWindowResize = () => {
			chapterListItemRef.current &&
				setChapterListItemHeight(
					chapterListItemRef.current?.getBoundingClientRect().height,
				)
		}
		window.addEventListener('resize', handleWindowResize)
		return () => window.removeEventListener('resize', handleWindowResize)
	}, [])

	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={({ open }) => setIsOpen(open)}
			unmountOnExit
			onExitComplete={() => {
				setTab('book')
				Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
			}}
		>
			<Trigger_ChapterPicker>
				{currBook.book_name?.name} {currChapter}
			</Trigger_ChapterPicker>
			<Portal>
				<Container_ChapterPicker>
					<Tabs.Root
						value={tab}
						onValueChange={(e) => setTab(e.value)}
						className={macrogrid({
							gridColumn: 'fullbleed',
							gridTemplateRows: 'auto minmax(auto,1fr)',
							h: 'full',
							overflowY: 'hidden',
						})}
					>
						<Header_ChapterPicker
							onTabsTriggerClick={() => setSelectedBook(currBook)}
						/>
						<Tabs.Content
							value="book"
							className={cx(
								tabsContentCss,
								css({
									pb: 'calc(token(spacing.4) + token(spacing.safe_area_bottom))',
								}),
							)}
						>
							<BookList_ChapterPicker>
								<BookListSectionHeader_ChapterPicker>
									Vechiul Testament
								</BookListSectionHeader_ChapterPicker>
								{oldTestamentBookList.map((book) => (
									<BookListItem_ChapterPicker
										key={book.code}
										isCurrBook={
											book.book_name?.name === currBook.book_name?.name
										}
										onClick={() => {
											setSelectedBook(book)
											setTab('chapter')
										}}
									>
										{book.book_name?.name}
									</BookListItem_ChapterPicker>
								))}
							</BookList_ChapterPicker>
							<BookList_ChapterPicker>
								<BookListSectionHeader_ChapterPicker>
									Noul Testament
								</BookListSectionHeader_ChapterPicker>
								{newTestamentBookList.map((book) => (
									<BookListItem_ChapterPicker
										isCurrBook={book.code === currBook.code}
										key={book.code}
										onClick={() => {
											setSelectedBook(book)
											setTab('chapter')
										}}
									>
										{book.book_name?.name}
									</BookListItem_ChapterPicker>
								))}
							</BookList_ChapterPicker>
						</Tabs.Content>
						<Tabs.Content value="chapter" className={tabsContentCss}>
							<ChapterList_ChapterPicker
								chapterListItemHeight={chapterListItemHeight}
							>
								<ChapterListHeader_ChapterPicker
									chapterListItemHeight={chapterListItemHeight}
								>
									{selectedBook.book_name?.name}
								</ChapterListHeader_ChapterPicker>
								{chapterList?.map((chapter) => {
									const isCurrChapter =
										selectedBook.id === currBook.id && chapter === currChapter

									return (
										<ChapterListItem_ChapterPicker
											key={chapter}
											ref={
												chapter === 1
													? (el) => {
															if (el) {
																chapterListItemRef.current = el
																const height = el.getBoundingClientRect().height
																setChapterListItemHeight(height)
															}
													  }
													: undefined
											}
											href={`/${readerMode}/${selectedBook.code}/${chapter}`}
											isCurrChapter={isCurrChapter}
										>
											{chapter}
										</ChapterListItem_ChapterPicker>
									)
								})}
							</ChapterList_ChapterPicker>
						</Tabs.Content>
					</Tabs.Root>
				</Container_ChapterPicker>
			</Portal>
		</Dialog.Root>
	)
}
