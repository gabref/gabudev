import { CustomMDX } from "@/components/mdx";

export const metadata = {
	title: "About | GabuDev Blog",
	description: "Learn more about GabuDev Blog, the author, and the mission behind this platform.",
};

export default function AboutPage() {
	return (
		<section className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
			{/* Page Title */}
			<header className="mb-6">
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
					About
				</h1>
			</header>

			{/* Markdown Content */}
			<article className="prose dark:prose-dark max-w-none">
				<CustomMDX source={aboutContent} />
			</article>
		</section>
	);
}

const aboutContent = `
# Welcome to GabuDev Blog!

## About the Author

Hi! I'm Gabriel, the creator behind this blog. With a passion for technology, software development, and storytelling, I strive to bring a unique perspective to every topic.

## What You'll Find Here

- **Insights**: Deep dives into software development, design, and technology.
- **Guides**: Tutorials, tips, and best practices for developers.
- **Thoughts**: Personal reflections and stories from my journey.

## Let's Connect

Feel free to reach out or explore more about my work. Together, let's build something amazing!

  `;
