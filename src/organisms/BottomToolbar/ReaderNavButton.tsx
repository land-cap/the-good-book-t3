import Link from 'next/link'
import { button } from 'styled-system/recipes'

import { Icon } from '~/components'

export const ReaderNavButton = ({
	url,
	direction,
}: {
	url: string | null
	direction: 'left' | 'right'
}) => {
	const buttonCls = button({ icon: true, size: 'xl' })

	return (
		<Link
			prefetch
			href={url ?? ''}
			aria-disabled={url ? undefined : true}
			className={buttonCls}
		>
			<Icon size={6} code={direction === 'left' ? '&#xe5c4;' : '&#xe5c8;'} />
		</Link>
	)
}
