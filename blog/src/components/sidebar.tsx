import { Categories } from "./categories";
import { Profile } from "./profile";
import { Tags } from "./tags";

const categories = [
	{ name: "Low Level", count: 4 },
	{ name: "Development", count: 1 },
	{ name: "Uncategorized", count: 2 },
];

const tags = [
	{ name: "C" },
	{ name: "dynamic" },
	{ name: "libraries" },
	{ name: "linking" },
	{ name: "static" },
	{ name: "thoughts" },
];

export function Sidebar({ className }: { className?: string }) {
	return (
		<div id="sidebar" className={`w-full ${className}`}>
			{/* Profile Section */}
			<div className="flex flex-col w-full gap-4 mb-4">
				<Profile />
			</div>

			{/* Sticky Section */}
			<div
				id="sidebar-sticky"
				className="transition-all duration-700 flex flex-col w-full gap-4 sticky top-4"
			>
				<Categories
					className="onload-animation"
					categories={categories}
					style={{ animationDelay: "150ms" }}
				/>
				<Tags
					tags={tags}
					className="onload-animation"
					style={{ animationDelay: "200ms" }}
				/>
			</div>
		</div>
	);
}
