import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import Link from 'next/link';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Emoji Favicon Maker",
  description: "Make favicons with Emojis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/grinning-cat-with-smiling-eyes_16.ico" sizes="16x16" type="image/x-icon" />
        <link rel="icon" href="/grinning-cat-with-smiling-eyes_32.ico" sizes="32x32" type="image/x-icon" />
        <link rel="icon" href="/grinning-cat-with-smiling-eyes_48.ico" sizes="48x48" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/grinning-cat-with-smiling-eyes_180.png" sizes="180x180" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-white shadow-md">
          <div className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-2xl font-semibold text-gray-800">Emoji Favicon Maker</h1>
            <nav className="space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-white shadow-inner mt-4">
          <div className="container mx-auto text-center p-4">
            <p className="text-gray-600">&copy; 2023 Emoji Favicon Maker. All rights reserved.</p>
            <nav className="space-x-4">
              <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
              <Link href="/terms-of-use" className="text-gray-600 hover:text-gray-800">Terms of Use</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}