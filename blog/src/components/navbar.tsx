import { navBarConfig, siteConfig } from "@/config";
import { LinkPresets } from "@/constants/link-presets";
import { LinkPreset } from "@/types/config";
import React from "react";

interface NavBarLink {
	name: string;
	url: string;
	external?: boolean;
}

interface NavbarProps {
	className?: string;
}

let links = navBarConfig.links.map((item: NavBarLink | LinkPreset): NavBarLink => {
	if (typeof item === 'number')
		return LinkPresets[item];
	return item;
});

export function Navbar({ className = "" }: NavbarProps) {
	return (
		<div id="navbar" className="z-50">
			{/* Background for animation */}
			<div className="absolute h-8 left-0 right-0 -top-8 bg-gray-100 dark:bg-gray-800 transition"></div>

			{/* Navbar Container */}
			<div
				className={`bg-white dark:bg-gray-900 shadow-md max-w-screen-xl mx-auto h-[4.5rem] flex items-center justify-between px-4 rounded-b-md ${className}`}
			>
				{/* Logo and Title */}
				<a
					href="/"
					className="
						rounded-lg h-[3.25rem] px-5 
						flex items-center text-blue-500 dark:text-blue-400 font-bold text-md hover:underline active:scale-95 transition
					"
				>
					<span className="
						material-symbols--home-outline-rounded material-icons text-2xl mb-1 mr-2
					"></span>
					{siteConfig.title}
				</a>

				{/* Navigation Links */}
				<div className="hidden md:flex">
					{links.map((link) => (
						<a
							key={link.name}
							href={link.url}
							target={link.external ? "_blank" : undefined}
							rel={link.external ? "noopener noreferrer" : undefined}
							aria-label={link.name}
							className="px-5 py-2 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:text-blue-500 dark:hover:text-blue-400 active:scale-95 transition"
						>
							<div className="flex items-center">
								{link.name}
								{link.external && (
									<span className="fa6-solid--arrow-up-right-from-square material-icons text-sm text-gray-400 ml-1"> </span>
								)}
							</div>
						</a>
					))}
				</div>

				{/* Right-Side Controls */}
				<div className="flex items-center gap-2">
					{/* Placeholder for Search */}
					{/*
					<button
						aria-label="Search"
						className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-90 transition"
					>
						<span className="material-icons text-gray-600 dark:text-gray-300">
							search
						</span>
					</button>
					*/}

					{/* Theme Toggle */}
					{/*
					<button
						aria-label="Toggle Theme"
						className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-90 transition"
					>
						<span className="material-icons text-gray-600 dark:text-gray-300">
							light_mode
						</span>
					</button>
					*/}

					{/* Mobile Menu Toggle */}
					{/*
					<button
						aria-label="Open Menu"
						className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center md:hidden hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-90 transition"
					>
						<span className="material-icons text-gray-600 dark:text-gray-300">
							menu
						</span>
					</button>
					*/}
				</div>
			</div>
		</div>
	);
};
