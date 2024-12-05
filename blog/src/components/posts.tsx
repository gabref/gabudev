import { getBlogPosts } from "@/app/utils";
import { PostCard } from "./post-card";

export function BlogPosts() {
	const allBlogs = getBlogPosts();

	return (
		<div className="flex flex-col space-y-4">
			{allBlogs
				.sort((a, b) =>
					new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
						? -1
						: 1
				)
				.map((post, index) => {
					const delay = index * 50; // Add animation delay for each post
					return (
						<PostCard
							key={post.slug}
							post={post}
							delay={delay}
						/>
					);
				})}
		</div>
	);
}
