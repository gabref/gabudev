'use client';

export function DarkLightSwitch() {
	return (
		<button
			onClick={() => {
				const currentTheme = localStorage.getItem("theme") || "auto";
				const newTheme = currentTheme === "dark" ? "light" : "dark";
				localStorage.setItem("theme", newTheme);
				document.documentElement.classList.toggle("dark", newTheme === "dark");
			}}
			className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
		>
			Toggle Theme
		</button>
	);
}
