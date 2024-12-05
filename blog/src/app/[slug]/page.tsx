import { notFound } from "next/navigation";
import { formatDate, getBlogPosts } from "../utils";
import { baseUrl } from "../sitemap";
import { CustomMDX } from "@/components/mdx";
import { use } from "react";

export async function generateStaticParams() {
	let posts = getBlogPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	let post = getBlogPosts().find((post) => post.slug === slug);
	if (!post) return;
	let { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
	let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime,
			url: `${baseUrl}/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Blog({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = use(params);
	let post = getBlogPosts().find((post) => post.slug === slug);
	if (!post) notFound();

	return (
		<section className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
			{/* JSON-LD Metadata */}
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						image: post.metadata.image
							? `${baseUrl}${post.metadata.image}`
							: `/og?title=${encodeURIComponent(post.metadata.title)}`,
						url: `${baseUrl}/blog/${post.slug}`,
						author: {
							"@type": "Person",
							name: "My Portfolio",
						},
					}),
				}}
			/>

			{/* Post Header */}
			<header className="mb-6">
				<h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
					{post.metadata.title}
				</h1>
				<div className="flex items-center mt-3 text-sm text-gray-600 dark:text-gray-400">
					<p>{formatDate(post.metadata.publishedAt)}</p>
				</div>
			</header>

			{/* Cover Image */}
			{post.metadata.image && (
				<div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden shadow-lg">
					<img
						src={post.metadata.image}
						alt={`Cover image for ${post.metadata.title}`}
						className="w-full h-full object-cover"
					/>
				</div>
			)}

			{/* Metadata */}
			<div className="flex flex-row items-center text-sm text-gray-500 dark:text-gray-400 gap-4 mb-4">
				<div className="flex items-center gap-2">
					<span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
						{post.metadata.category}
					</span>
				</div>
			</div>

			{/* Content */}
			<article className="prose dark:prose-dark max-w-none">
				<CustomMDX source={post.content} />
			</article>

		</section>
	);
}
