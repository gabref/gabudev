import { profileConfig } from "@/config";
import Image from "next/image";

export function Profile() {
	return (
		<div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4">

			{/* Profile Image */}
			<a
				aria-label="Go to About Page"
				href="/about/"
				className="group block relative mx-auto mt-1 lg:mt-0 mb-4 w-full h-[12rem] lg:h-auto max-w-[12rem] lg:max-w-none overflow-hidden rounded-xl active:scale-95"
			>
				<div className="absolute transition pointer-events-none group-hover:bg-black/30 group-active:bg-black/50 w-full h-full z-50 flex items-center justify-center">
					<i className="fa6-regular--address-card transition opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-100 text-white text-5xl"></i>
				</div>
				{profileConfig.avatar && (
					<Image
						src={profileConfig.avatar}
						alt={`Profile image of ${profileConfig.name}`}
						width={192}
						height={192}
						className="w-full h-full object-cover rounded-xl"
					/>
				)}
			</a>

			{/* Profile Info */}
			<div className="px-2">
				{/* Name */}
				<div className="font-bold text-xl text-center mb-1 dark:text-neutral-50 transition">
					{profileConfig.name}
				</div>
				{/* Highlight */}
				<div className="h-1 w-5 bg-blue-500 mx-auto rounded-full mb-2 transition"></div>
				{/* Bio */}
				<div className="text-center text-neutral-400 mb-2.5 transition">
					{profileConfig.bio}
				</div>
				{/* Links */}
				<div className="flex gap-2 justify-center">
					{profileConfig.links.length >= 1 &&
						profileConfig.links.map((item) => (
							<a
								key={item.name}
								rel="me"
								aria-label={item.name}
								href={item.url}
								target="_blank"
								className="bg-gray-200 dark:bg-gray-700 rounded-lg h-10 w-10 flex items-center justify-center active:scale-90 transition"
							>
								<i className={`${item.icon} text-xl text-blue-500`}></i>
							</a>
						))}
				</div>
			</div>
		</div>
	);
}
