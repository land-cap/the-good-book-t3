import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const ReaderNavButton = ({
	href,
	direction,
}: {
	href: string
	direction: 'left' | 'right'
}) => (
	<Link
		prefetch
		href={href}
		className="flex h-14 w-14 place-content-center place-items-center text-fg transition duration-quick ease-in-out hover:bg-bgSubtle active:text-fgSubtle"
	>
		{direction === 'left' ? (
			<ChevronLeft size={40} strokeWidth={2} absoluteStrokeWidth />
		) : (
			<ChevronRight size={40} strokeWidth={2} absoluteStrokeWidth />
		)}
	</Link>
)
