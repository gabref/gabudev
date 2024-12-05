import React from "react";
import { WidgetLayout } from "./widget-layout";
import { ButtonLink } from "./button-link";

interface Category {
	name: string;
	count: number;
}

interface CategoriesProps {
	categories: Category[];
	className?: string;
	style?: React.CSSProperties;
}

const COLLAPSE_THRESHOLD = 5;

export function Categories(
	{ categories, className = "", style }: CategoriesProps
) {
	const isCollapsed = categories.length >= COLLAPSE_THRESHOLD;

	return (
		<WidgetLayout
			id="categories"
			name="Categories"
			isCollapsed={isCollapsed}
			collapsedHeight="9.0rem"
			className={className}
			style={style}
		>
			<ul className="space-y-2">
				{categories.map((category) => (
					<ButtonLink
						key={category.name}
						url={`/categories/${category.name}`}
						badge={String(category.count)}
						label={`View all posts in the ${category.name} category`}
					>
						{category.name}
					</ButtonLink>
				))}
			</ul>
		</WidgetLayout>
	);
};
