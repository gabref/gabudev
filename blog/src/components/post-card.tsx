import { Metadata } from '@/app/utils';
import Link from 'next/link';
import React from 'react';

interface PostCardProps {
	post: {
		slug: string;
		metadata: Metadata;
		content: string;
	};
	delay: number;
}

export function PostCard({
	post
}: PostCardProps) {
	return (
		<div className="bg-gray-800 text-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4">
			{/* Image Section */}
			{post.metadata.image && (
				<div className="flex-shrink-0 w-full sm:w-32 h-32 overflow-hidden rounded-lg">
					<img
						src={post.metadata.image}
						alt={post.metadata.title}
						className="object-cover w-full h-full"
					/>
				</div>
			)}

			{/* Content Section */}
			<div className="flex-1">
				<Link
					className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition"
					href={`/${post.slug}`}
				>
					<h2 className="text-xl font-semibold mb-2">{post.metadata.title}</h2>
				</Link>

				<div className="text-sm text-gray-400 flex items-center gap-2 mb-2">
					<span className="flex items-center gap-1">
						<i className="material-symbols--edit-calendar-outline-rounded"></i> {post.metadata.publishedAt}
					</span>
					<span className="flex items-center gap-1">
						<i className="material-symbols--book-2-outline-rounded"></i> {post.metadata.category}
					</span>
				</div>
				{/*
				<div className="flex flex-wrap items-center gap-2 mb-2">
					{tags.map((tag, index) => (
						<span
							key={index}
							className="bg-gray-700 text-gray-300 text-xs py-1 px-2 rounded-full"
						>

							#{tag}
						</span>
					))}
				</div>
				*/}

				<p className="text-gray-300 mb-4">{post.metadata.description}</p>
				<div className="text-sm text-gray-400">
					{/*
					<span>{wordCount} words</span> · <span>{readingTime}</span>
					*/}
					<span>
						{post.content.split(' ').length} words
					</span>   |  <span>
						{Math.ceil(post.content.split(' ').length / 200)} minutes
					</span>
				</div>
			</div>

			{/* Arrow Section */}
			<Link
				className="flex items-center hover:text-blue-500 dark:hover:text-blue-400 transition"
				href={`/${post.slug}`}
			>
				<i className="material-symbols--chevron-right-rounded text-gray-400"></i>
			</Link>
		</div>
	);
};
