import { styled } from 'styled-system/jsx'
import { Button } from '~/components/atoms/Button/Button'
import { IconButton } from '~/components/atoms/Button/IconButton'
import { type SystemStyleObject } from 'styled-system/types'
import { css } from 'styled-system/css'

const chapterButtonStyles: SystemStyleObject = css.raw({
	oShadow: 'md',
	whiteSpace: 'nowrap',
	borderRightRadius: '0',
})

const ToolBarContainer = styled('div', {
	base: {
		display: 'flex',
		hideFrom: 'sm',
		gap: '2',
		placeContent: 'center',
		alignItems: 'center',
		position: 'fixed',
		bottom: 'calc(token(spacing.3) + env(safe-area-inset-bottom))',
		left: '50%',
		transform: 'translateX(-50%)',
		w: '100dvw',
	},
})

export const ToolBar = ({ chapter }: { chapter: string }) => (
	<ToolBarContainer>
		<Button
			label={chapter}
			visual="primary"
			size="xl"
			rounded
			rootStyles={chapterButtonStyles}
		/>
		<IconButton
			iconName="format_size"
			visual="primary"
			size="xl"
			rounded
			rootStyles={css.raw({ oShadow: 'md' })}
		/>
	</ToolBarContainer>
)
