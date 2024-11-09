import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Emoji Icons Favicon Generator',
  description: 'Create favicons, emojis, and icons using the Emoji Icons Collection.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/grinning cat with smiling eyes_16.ico" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="/grinning cat with smiling eyes_32.ico" sizes="32x32" type="image/x-icon" />
        <link rel="icon" href="/grinning cat with smiling eyes_48.ico" sizes="48x48" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/grinning cat with smiling eyes_180.png" sizes="180x180" />
      </head>
      <body className={inter.className}>
        <header className="fixed top-0 right-0 bg-white rounded-full shadow-md z-50 p-4 m-4">
          <a href="/" className="text-2xl font-bold">{metadata.title}</a>
        </header>

        <main className="pt-20 min-h-screen"> {/* Adjust the pt value to match header height */}
          {children}
        </main>

        <footer className="bg-gray-200 py-6 mt-10">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2023 Topazly. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}