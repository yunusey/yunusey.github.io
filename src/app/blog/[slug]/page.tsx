'use client';

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import matter from "gray-matter";
import Article from "@/app/components/article";
import Background from "@/app/components/background";

const getArticle = async (slug: string) => {
	const article = await fetch(`/articles/${slug}.md`)
	if (!article.ok) {
		throw new Error("Article not found!");
	}
	return await article.text();
};

export default function Page() {
	// Get the article slug from the URL
	const params = useParams();
	const { slug } = params;
	if (typeof slug !== "string") {
		// TODO: Handle error
		notFound();
	}

	// Get the article from slug
	const [article, setArticle] = useState('');
	const [found, setFound] = useState(true);
	useEffect(() => {
		getArticle(slug).then((text) => {
			const { data, content } = matter(text);
			// TODO: Use the `data` maybe.
			setArticle(content);
			setFound(true);
		}).catch((_) => {
			// Redirect to 404
			setFound(false);
		})
	});

	if (!found) {
		notFound();
	}

	return (
		<div className="flex flex-col items-center justify-center m-10">
			<Background />
			<div className="w-full lg:w-[80%] border-2 border-[#76ABAE] rounded-3xl p-3 bg-[#31363F] opacity-[0.95]">
				<Article content={article} />
			</div>
		</div>
	);
}
