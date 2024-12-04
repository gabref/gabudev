import Footer from "@/components/footer";
import { OldFooter } from "@/components/old-footer";
import { BlogPosts } from "@/components/posts";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
		<div className="my-8">
			<BlogPosts />
		</div>
      </main>
	  { /* <Footer /> */ }
	  <OldFooter />
    </div>
  );
}
