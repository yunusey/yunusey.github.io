import Article from "./components/article";

const ERROR_MESSAGE = `
# 404: Page not found
`

export default function Message404() {
	return (
		<div className="flex flex-col items-center justify-center m-10">
			<div style={{
				width: "80%",
				border: "2px solid #76ABAE",
				borderRadius: "10px",
				padding: "10px",
				backgroundColor: "#31363F",
			}}>
				<Article content={ERROR_MESSAGE} />
			</div>
		</div>
	);
}
