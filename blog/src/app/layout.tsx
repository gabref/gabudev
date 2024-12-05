import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { baseUrl } from "./sitemap";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { TOC } from "@/components/toc";
import { Sidebar } from "@/components/sidebar";
import { siteConfig } from "@/config";

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
	// TODO: replace with dynamic logic later
	const bannerEnabled = siteConfig.banner.enable;
	const tocEnabled = false;

	return (
		<html
			lang="en"
			className="bg-[var(--page-bg)] transition text-[14px] md:text-[16px]"
		>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
			>
				{/* Navbar */}
				<div
					id="top-row"
					className="z-50 pointer-events-none relative transition-all duration-700 max-w-[var(--page-width)] px-0 md:px-4 mx-auto"
				>
					<div
						id="navbar-wrapper"
						className="pointer-events-auto sticky top-0 transition-all backdrop-blur-md shadow-lg rounded-b-md z-20"
					>
						<Navbar />
					</div>
				</div>

				{/* Banner */}
				{bannerEnabled && (
					<div
						id="banner-wrapper"
						className={`relative w-full h-[30vh] bg-cover bg-${siteConfig.banner.position} bg-no-repeat`}
						style={{
							backgroundImage: `url('${siteConfig.banner.src}')`, // Replace with dynamic banner
						}}
					>
						{/*
						<div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full">
							Banner Credit
						</div>
						*/}
					</div>
				)}

				{/* Main Grid */}
				<div
					className="absolute w-full z-30 pointer-events-none"
					style={{ top: bannerEnabled ? "calc(30vh - 4rem)" : "5.5rem" }}
				>
					<div className="relative max-w-7xl mx-auto pointer-events-auto py-8 grid grid-cols-1 lg:grid-cols-[17.5rem_auto] gap-4 px-4">
						{/* Sidebar */}
						<aside className="hidden lg:block mb-4 row-start-2 row-end-3 lg:row-start-1 lg:row-end-2 col-span-2 lg:col-span-1 lg:max-w-[17.5rem] z-10">
							<Sidebar />
						</aside>

						{/* Main Content */}
						<main className="transition-swup-fade col-span-1 lg:col-span-1 overflow-hidden">
							<div className="content-wrapper">{children}</div>
							<Footer />
						</main>
					</div>
				</div>

				{/* TOC */}
				{tocEnabled && (
					<div className="hidden 2xl:block fixed top-16 right-4 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-50 dark:bg-gray-800 shadow-lg p-4 rounded">
						<TOC />
					</div>
				)}

				{/* Back to Top */}
				<BackToTop />
			</body>
		</html>
	);
}
