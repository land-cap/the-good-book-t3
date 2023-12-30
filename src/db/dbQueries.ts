import { dbClient } from '~/db/dbClient'
import {
	createFileSystemCache,
	createMemoryCache,
	withCacheAsync,
} from '~/helpers'

const useMemoryCache = process.env.USE_MEMORY_CACHE === 'true'

const getBook = async (bookCode: string) =>
	dbClient.book.findFirst({
		include: { book_name: true },
		where: { code: bookCode },
	})

export const getBookList = async () =>
	dbClient.book.findMany({
		include: { book_name: true },
	})

export const getBookWithCache = withCacheAsync(
	getBook,
	useMemoryCache ? createMemoryCache() : createFileSystemCache(),
)

export type TBook = Awaited<ReturnType<typeof getBookList>>[0]

const getChapter = async (bookCode: string, chapter: number) => {
	const book = await dbClient.book.findFirst({
		where: { code: bookCode },
	})
	return dbClient.chapter.findFirst({
		where: { book_id: book?.id, chapter },
	})
}

export const getChapterWithCache = withCacheAsync(
	getChapter,
	useMemoryCache ? createMemoryCache() : createFileSystemCache(),
)
