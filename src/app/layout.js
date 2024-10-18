import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

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
        {children}
      </body>
    </html>
  );
}