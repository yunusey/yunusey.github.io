import { notFound, useParams } from "next/navigation";
import matter from "gray-matter";
import { promises as fs } from "fs";
import Article from "@/app/components/article";
import Background from "@/app/components/background";
import { promises } from "fs";

export async function generateStaticParams() {
	const files = await fs.readdir(process.cwd() + "/public/articles");

	return files.map((file) => ({
		slug: file.replace(".md", ""),
	}));
}

const getArticle = async (slug: string) => {
	const article = await fs.readFile(process.cwd() + `/public/articles/${slug}.md`, "utf-8");
	const { content, data } = matter(article);
	return content;
};

export default async function Page(
	{ params } : { params: { slug: string } }
) {
	const { slug } = params;
	const article = await getArticle(slug);
	return (
		<div className="flex flex-col items-center justify-center m-10">
			<Background />
			<div className="w-full lg:w-[80%] border-2 border-[#76ABAE] rounded-3xl p-3 bg-[#31363F] opacity-[0.95]">
				<Article content={article} />
			</div>
		</div>
	);
}
