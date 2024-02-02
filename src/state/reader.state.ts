import { atom } from 'jotai'

export const prevChapterURLAtom = atom<string>('')

export const nextChapterURLAtom = atom<string>('')

export const isFirstChapterAtom = atom(false)

export const isLastChapterAtom = atom(false)

/**
 * VERSE DETAILS STATE
 */

export const verseDetailsMenuCurrVerseAtom = atom<number | null>(null)

/**
 * PREFERENCES STATE
 */

export type TFontSizeOffset = -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export const FONT_SIZE_OFFSET_COOKIE = 'fontSizeOffset'
export const fontSizeOffsetDefaultValue = 0
export const fontSizeOffsetAtom = atom<TFontSizeOffset>(
	fontSizeOffsetDefaultValue,
)

export type TLeading = 1.5 | 1.75 | 2 | 2.25 | 2.5
export const LEADING_COOKIE = 'leading'
export const leadingDefaultValue = 2
export const leadingAtom = atom<TLeading>(leadingDefaultValue)

export const VERSE_BREAKS_LINE_COOKIE = 'verseBreaksLine'
export const verseBreaksLineDefaultValue = true
export const verseBreaksLineAtom = atom(verseBreaksLineDefaultValue)

export const SHOW_NON_ORIGINAL_TEXT_COOKIE = 'showNonOriginalText'
export const showNonOriginalTextDefaultValue = true
export const showNonOriginalTextAtom = atom(showNonOriginalTextDefaultValue)

export const SHOW_RED_LETTERS_COOKIE = 'showRedLetters'
export const showRedLettersDefaultValue = true
export const showRedLettersAtom = atom(showRedLettersDefaultValue)

export const SHOW_VERSE_DETAILS_COOKIE = 'showVerseDetails'
export const showVerseDetailsDefaultValue = true
export const showVerseDetailsAtom = atom(showVerseDetailsDefaultValue)
