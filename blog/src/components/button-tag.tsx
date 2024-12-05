import React from "react";

interface ButtonTagProps {
	size?: string; // Reserved for future use if size-based styling is needed
	dot?: boolean;
	href?: string;
	label?: string;
	children: React.ReactNode;
}

export function ButtonTag({ dot = false, href = "#", label, children }: ButtonTagProps) {
	return (
		<a
			href={href}
			aria-label={label}
			className="
				inline-flex items-center h-8 
				text-sm px-3 rounded-lg 
				bg-gray-100 dark:bg-gray-700 
				hover:bg-gray-200 dark:hover:bg-gray-500 
				active:bg-gray-300 dark:active:bg-gray-600 
				transition-all
			"
		>
			{dot && (
				<div className="h-1 w-1 bg-gray-800 dark:bg-gray-100 transition rounded-md mr-2"></div>
			)}
			{children}
		</a>
	);
};
