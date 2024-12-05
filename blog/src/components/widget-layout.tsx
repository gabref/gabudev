'use client';

import React, { useState } from "react";

interface WidgetLayoutProps {
	id: string;
	name?: string;
	isCollapsed?: boolean;
	collapsedHeight?: string;
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
}

export function WidgetLayout({
	id,
	name,
	isCollapsed = false,
	collapsedHeight = "7.5rem",
	className = "",
	style,
	children,
}: WidgetLayoutProps) {
	const [collapsed, setCollapsed] = useState(isCollapsed);

	const handleExpand = () => {
		setCollapsed(false);
	};

	return (
		<div
			data-id={id}
			data-is-collapsed={String(collapsed)}
			className={`pb-4 bg-white dark:bg-gray-800 shadow-md rounded-xl ${className}`}
			style={style}
		>
			{/* Title */}
			<div className="font-bold text-lg text-neutral-900 dark:text-neutral-100 relative ml-8 mt-4 mb-2">
				<span
					className="before:w-1 before:h-4 before:rounded-md before:bg-blue-500
                      before:absolute before:left-[-16px] before:top-[5.5px]"
				>
					{name}
				</span>
			</div>

			{/* Collapsible Content */}
			<div
				id={id}
				className={`px-4 overflow-hidden transition-all ${collapsed ? "h-[7.5rem]" : "h-auto"
					}`}
				style={collapsed ? { height: collapsedHeight } : {}}
			>
				{children}
			</div>

			{/* Expand Button */}
			{collapsed && (
				<div className="px-4 -mb-2">
					<button
						onClick={handleExpand}
						className="w-full h-9 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center gap-2 text-blue-500 active:scale-95 transition"
					>
						<i className="material-icons text-lg text-gray-50">Show More</i>
					</button>
				</div>
			)}
		</div>
	);
};
