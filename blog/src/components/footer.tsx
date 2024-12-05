import React from 'react';
import { profileConfig } from '../config'; // Adjust the path based on your folder structure
import { url } from '@/utils/url-utils';

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mx-32 my-10">
			{/* Divider Line */}
			<div className="transition border-t border-black/10 dark:border-white/15 border-dashed"></div>
			{/* Footer Content */}
			<div className="transition border-dashed border-[oklch(85%_0.01_var(--hue))] dark:border-white/15 rounded-2xl mb-12 flex flex-col items-center justify-center px-6">
				<div className="transition text-50 text-sm text-center">
					&copy; <span>{currentYear}</span> {profileConfig.name}. All Rights Reserved. /{' '}
					<a
						className="transition link text-[var(--primary)] font-medium"
						target="_blank"
						href={url('rss.xml')}
						rel="noopener noreferrer"
					>
						RSS
					</a>{' '}
					/{' '}
					<a
						className="transition link text-[var(--primary)] font-medium"
						target="_blank"
						href={url('sitemap-index.xml')}
						rel="noopener noreferrer"
					>
						Sitemap
					</a>
					<br />
					Powered by{' '}
					<a
						className="transition link text-[var(--primary)] font-medium"
						target="_blank"
						href="https://nextjs.org"
						rel="noopener noreferrer"
					>
						NextJS
					</a>{' '}
					&{' '}Inspired by{' '}
					<a
						className="transition link text-[var(--primary)] font-medium"
						target="_blank"
						href="https://github.com/saicaca/fuwari"
						rel="noopener noreferrer"
					>
						Fuwari
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
