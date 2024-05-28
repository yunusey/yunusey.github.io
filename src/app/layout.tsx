import type { Metadata } from "next";
import { Vollkorn } from "next/font/google";
import "./globals.css";

const font = Vollkorn({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "@yunusey",
	description: "@yunusey",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${font.className}`}>{children}</body>
		</html>
	);
}
