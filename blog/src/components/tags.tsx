import React from "react";
import { WidgetLayout } from "./widget-layout";
import { ButtonTag } from "./button-tag";

interface Tag {
	name: string;
}

interface TagsProps {
	tags: Tag[];
	className?: string;
	style?: React.CSSProperties;
}

const COLLAPSED_HEIGHT = "7.5rem";
const COLLAPSE_THRESHOLD = 20;

export function Tags({ tags, className = "", style }: TagsProps) {
	const isCollapsed = tags.length >= COLLAPSE_THRESHOLD;

	return (
		<WidgetLayout
			name="Tags"
			id="tags"
			isCollapsed={isCollapsed}
			collapsedHeight={COLLAPSED_HEIGHT}
			className={className}
			style={style}
		>
			<div className="flex gap-2 flex-wrap">
				{tags.map((tag) => (
					<ButtonTag
						key={tag.name}
						href={`/archive/tag/${tag.name}/`}
						label={`View all posts with the ${tag.name} tag`}
					>
						{tag.name}
					</ButtonTag>
				))}
			</div>
		</WidgetLayout>
	);
};
