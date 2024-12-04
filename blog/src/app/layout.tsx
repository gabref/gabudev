import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { baseUrl } from "./sitemap";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

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

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "GabuDev Blog",
		template: '%s | GabuDev Blog'
	},
	description: "A blog built with Next.js",
	openGraph: {
		title: "GabuDev Blog",
		description: "A blog built for GabuDev",
		url: baseUrl,
		siteName: "GabuDev Blog",
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		}
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-xl mx-4 lg:mx-auto`}
			>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
