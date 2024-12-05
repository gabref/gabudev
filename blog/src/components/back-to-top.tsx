'use client';

export function BackToTop() {
	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
	return (
		<button
			onClick={scrollToTop}
			className="fixed bottom-4 right-4 bg-gray-800 text-white rounded-full p-2 shadow-lg"
		>
			↑
		</button>
	);
}
