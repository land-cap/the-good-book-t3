import { flatten, map, pipe, splitEvery, trim } from 'ramda'

const referencesTextToList = (referencesText: string) =>
	splitEvery(2)(referencesText.split(/(\d)\./g))
		.map((reference) => reference.join(''))
		.filter((reference) => reference !== '')

const replaceCapAbbr = (reference: string, currBookName: string) =>
	reference.replace('Cap.', currBookName)

const replaceVersAbbr = (
	reference: string,
	currBookName: string,
	currChapter: string,
) => reference.replace('Vers. ', `${currBookName} ${currChapter}:`)

const replaceBookAbbr = (
	reference: string,
	bookAbbrToName: Record<string, string>,
) => {
	const match = /(\d )?\S+\./g.exec(reference)
	const bookAbbr = match?.[0].replace(/\./g, '')
	const bookName = bookAbbr && bookAbbrToName[bookAbbr]
	if (bookAbbr && !bookName)
		throw new Error(`Book name not found for abbreviation: ${bookAbbr}`)

	return bookAbbr && bookName
		? reference.replace(bookAbbr, bookName).replace(/\./g, '')
		: reference
}

const replaceAbbrWithoutPeriod = (reference: string) =>
	reference.replace('Fapte', 'Faptele Apostolilor')

const splitSameBookReferences = (reference: string) => {
	const referenceList = reference.split('; ')
	const bookNameRegex = /^(\d )?(\S+ )+/g
	const firstReference = referenceList[0]
	const bookNameMatch = firstReference?.match(bookNameRegex)
	referenceList[0] =
		firstReference?.replace(bookNameRegex, '') ?? referenceList[0]!
	return referenceList.map((reference) => `${bookNameMatch?.[0]}${reference}`)
}

const transformReference = (
	currBookName: string,
	currChapter: string,
	bookAbbrToName: Record<string, string>,
) =>
	pipe(
		(reference: string) => replaceCapAbbr(reference, currBookName),
		(reference) => replaceVersAbbr(reference, currBookName, currChapter),
		(reference) => replaceBookAbbr(reference, bookAbbrToName),
		replaceAbbrWithoutPeriod,
		trim,
		splitSameBookReferences,
	)

export const processReferencesText = (
	currBookName: string,
	currChapter: string,
	bookAbbrToName: Record<string, string>,
) =>
	pipe(
		referencesTextToList,
		map((reference) =>
			transformReference(currBookName, currChapter, bookAbbrToName)(reference),
		),
		(referenceListList: string[][]) => flatten(referenceListList),
	)
