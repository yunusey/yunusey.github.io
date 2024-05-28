import { Vollkorn } from "next/font/google";
import { promises as fs } from "fs";
import matter from "gray-matter";
import Background from "./components/background";

const vollkorn_italic = Vollkorn({
	subsets: ["latin"],
	weight: "400",
	style: "italic",
});

interface Article {
	title: string;
	date: string;
	image: string;
	filename: string;
}

const getArticleInfo = async (): Promise<Article[]> => {
	const article_files = await fs.readdir(process.cwd() + "/public/articles");
	const articles = await Promise.all(
		article_files
			.filter((article) => article.endsWith(".md") || article.endsWith(".mdx"))
			.map(async (article: string) => {
				const article_text = await fs.readFile(process.cwd() + "/public/articles/" + article, "utf-8");
				const { data } = matter(article_text);
				return {
					filename: article.substring(0, article.lastIndexOf(".")),
					title: data.title,
					date: data.date,
					image: data.image,
				};
			})
	);
	return articles;
}

export default async function Home() {
	// Sort the articles in reverse chronological order
	const articles: Article[] = await getArticleInfo();
	articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<>
			<Background />
			<div>
				<div className="flex flex-col items-center justify-center m-10">
					<div className="rounded-[50%] overflow-hidden">
						<img src="/yunusey.jpeg" alt="logo" width={150} height={150} />
					</div>
					<h1 className={`${vollkorn_italic.className} text-6xl font-bold text-center`}>@yunusey</h1>
					<h2 className={`${vollkorn_italic.className} text-1xl font-semibold text-[#ABE3A2]`}>yunus means dolphin in turkish</h2>
				</div>
				<div className="container grid grid-cols-1 m-auto sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center justify-center">
					{
						articles.map(({ title, date, image, filename }) => (
							<div key={title} className="m-2 border-2 border-[#76ABAE] rounded-3xl p-4">
								<div className="flex md:flex-none sm:flex-none lg:flex">
									<img src={image} className="rounded h-[50px] sm:h-[75px] md:h-[75px] lg:h-[75px] overflow-hidden aspect-square bg-[#31363F] p-0.5" />
									<span className="flex flex-col justify-center pl-4">
										<a
											href={`/blog/${filename}`}
											className={
												`${vollkorn_italic.className} text-lg lg:text-2xl font-bold text-left text-[#A0DFD3] underline underline-offset-2 hover:text-[#B5BDFD]`
											}
										>{title}</a>
										<h2 className={
											`${vollkorn_italic.className} text-sm sm:text-sm md:text-sm lg:text-lg font-semibold text-left text-[#ABE3A2]`
										}>{date}</h2>
									</span>
								</div>
							</div>
						))
					}
				</div>
			</div>
		</>
	);
}
