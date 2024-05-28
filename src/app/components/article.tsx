'use client';

import { Vollkorn } from 'next/font/google';
import { Prism } from 'react-syntax-highlighter';
import Markdown from 'react-markdown';
import { oneDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// CSS imports
import './article.css';
import 'katex/dist/katex.min.css'

const vollkorn_italic = Vollkorn({
	subsets: ['latin'],
	weight: '400',
	style: 'italic',
});

export default function Article({ content }: { content: string }) {
	return (
		<Markdown
			remarkPlugins={[remarkGfm, remarkMath]}
			rehypePlugins={[rehypeRaw, rehypeKatex]}
			components={{
				h1: ({ children }) => (
					<h1
						className="text-5xl lg:text-6xl font-bold text-center"
						style={{
							color: "#B5BDFD",
						}}
					>{children}</h1>
				),
				h2: ({ children }) => (
					<h2
						className="text-3xl lg:text-4xl font-semibold"
						style={{
							color: "#76ABAE",
						}}
					><br className="m-3 block" />{children}<hr /></h2>
				),
				h3: ({ children }) => (
					<h3
						className="text-lg lg:text-2xl font-semibold"
						style={{
							color: "#76ABAE",
						}}
					>{children}</h3>
				),
				ul: ({ children }) => (
					<ul
						className="text-sm lg:text-lg list-disc ml-8"
					>{children}</ul>
				),
				ol: ({ children }) => (
					<ol
						className="text-sm lg:text-lg list-decimal ml-8"
					>{children}</ol>
				),
				li: ({ children }) => (
					<li
						className="text-sm lg:text-lg list-item"
					>{children}</li>
				),
				p: ({ children }) => (
					<p
						className="text-sm lg:text-lg text-justify"
						style={{
							color: "#dedfdf",
						}}
					><br className="m-3 block" />{children}</p>
				),
				em: ({ children }) => (
					<em
						className={`${vollkorn_italic.className} text-sm lg:text-lg font-semibold`}
						style={{
							color: "#ABE3A2",
						}}
					>{children}</em>
				),
				a: ({ children, href }) => (
					<a
						className="text-sm lg:text-lg text-[#A0DFD3] underline"
						onMouseOver={(element) => element.currentTarget.style.color = "#B5BDFD"}
						onMouseOut={(element) => element.currentTarget.style.color = "#A0DFD3"}
						href={href}
					>{children}</a>
				),
				strong: ({ children }) => (
					<strong
						className="font-bold text-sm lg:text-lg text-[#7EC6EC]"
					>{children}</strong>
				),
				hr: () => (
					<hr
						className="h-px border-0 bg-[#7EC6EC]"
					/>
				),
				code(props) {
					const { children, className, node, ...rest } = props
					const match = /language-(\w+)/.exec(className || '')
					return match ? (
						<div className="text-sm lg:text-base">
							<Prism
								PreTag="div"
								language={match[1]}
								style={dark}
							>{String(children).replace(/\n$/, '')}</Prism>
						</div>
					) : (
						<code {...rest} className="bg-[#222831] rounded text-sm lg:text-lg px-1">
							{children}
						</code>
					)
				},
			}}
		>{content}</Markdown>
	);
}
