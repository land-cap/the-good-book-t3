'use client'

import { usePrevious } from '@mantine/hooks'
import { useAtom } from 'jotai'
import { type PrimitiveAtom } from 'jotai/index'
import { useHydrateAtoms } from 'jotai/utils'
import { useEffect } from 'react'

import { setCookie } from '~/app/action'
import {
	FONT_COOKIE,
	FONT_SIZE_OFFSET_COOKIE,
	fontAtom,
	fontSizeOffsetAtom,
	JUSTIFY_TEXT_COOKIE,
	justifyTextAtom,
	LEADING_COOKIE,
	leadingAtom,
	SHOW_NON_ORIGINAL_TEXT_COOKIE,
	SHOW_RED_LETTERS_COOKIE,
	SHOW_VERSE_DETAILS_COOKIE,
	showNonOriginalTextAtom,
	showRedLettersAtom,
	showVerseDetailsAtom,
	type TFont,
	type TFontSizeOffset,
	type TLeading,
	VERSE_BREAKS_LINE_COOKIE,
	verseBreaksLineAtom,
} from '~/state'

const useSetupClientState = <T>(
	atom: PrimitiveAtom<T>,
	savedValue: T,
	cookieName: string,
) => {
	const [value, setValue] = useAtom(atom)

	useEffect(() => {
		setValue(savedValue)
	}, [savedValue, setValue])

	const prevValue = usePrevious(value)

	useEffect(() => {
		if (prevValue !== value) {
			void setCookie(cookieName, JSON.stringify(value))
		}
	}, [cookieName, prevValue, value])

	useHydrateAtoms([[atom, savedValue]])
}

export const SetUpPreferencesMenuState = ({
	savedFontSizeOffset,
	savedLeading,
	savedFont,
	savedVerseBreaksLine,
	savedJustifyText,
	savedShowNonOriginalText,
	savedShowRedLetters,
	savedShowVerseDetailsReferences,
}: {
	savedFontSizeOffset: TFontSizeOffset
	savedLeading: TLeading
	savedFont: TFont
	savedVerseBreaksLine: boolean
	savedJustifyText: boolean
	savedShowNonOriginalText: boolean
	savedShowRedLetters: boolean
	savedShowVerseDetailsReferences: boolean
}) => {
	useSetupClientState(
		fontSizeOffsetAtom,
		savedFontSizeOffset,
		FONT_SIZE_OFFSET_COOKIE,
	)
	useSetupClientState(leadingAtom, savedLeading, LEADING_COOKIE)
	useSetupClientState(fontAtom, savedFont, FONT_COOKIE)
	useSetupClientState(
		verseBreaksLineAtom,
		savedVerseBreaksLine,
		VERSE_BREAKS_LINE_COOKIE,
	)
	useSetupClientState(justifyTextAtom, savedJustifyText, JUSTIFY_TEXT_COOKIE)
	useSetupClientState(
		showNonOriginalTextAtom,
		savedShowNonOriginalText,
		SHOW_NON_ORIGINAL_TEXT_COOKIE,
	)
	useSetupClientState(
		showRedLettersAtom,
		savedShowRedLetters,
		SHOW_RED_LETTERS_COOKIE,
	)
	useSetupClientState(
		showVerseDetailsAtom,
		savedShowVerseDetailsReferences,
		SHOW_VERSE_DETAILS_COOKIE,
	)

	return null
}
