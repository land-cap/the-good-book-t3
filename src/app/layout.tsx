import { Crimson_Pro } from 'next/font/google'
import { Footer } from '~/components/molecules/Footer'
import '~/index.css'

const dmSans = Crimson_Pro({
	variable: '--font-sans',
	subsets: ['latin-ext'],
})

const dmMono = Crimson_Pro({
	variable: '--font-mono',
	subsets: ['latin-ext'],
	weight: ['300', '400', '500'],
	style: ['italic', 'normal'],
})

export const metadata = {
	title: 'The Good Book',
	description: 'Read the Bible without distractions.',
	icons: [{ rel: 'icon', url: '/favicon.png' }],
}

const appShellCls =
	'relative flex-col h-fit min-h-screen text-base bg-bgSurface font-normal text-fg dark:text-fgMuted'

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
		<body className={appShellCls}>
			{children}
			<Footer />
		</body>
	</html>
)

export default RootLayout
