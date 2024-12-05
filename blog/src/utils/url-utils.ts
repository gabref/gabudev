import { baseUrl } from "@/app/sitemap";

export function url(path: string): string {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`; // Ensure the path starts with a '/'
	return `${baseUrl}${normalizedPath}`;
}

