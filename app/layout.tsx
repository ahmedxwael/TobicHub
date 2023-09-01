import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar/Navbar";
import Provider from "@/components/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

type Props = {
	children: React.ReactNode;
	session: any;
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "TopicHub",
	description: "The home page for this TopicHub application.",
};

export default function RootLayout({ children, session }: Props) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Provider session={session}>
					<Navbar />
					<main className="min-h-[calc(100vh-117px)] sm:min-h-[calc(100vh-76.8px)] px-8 py-24">
						{children}
					</main>
					<Footer />
				</Provider>
			</body>
		</html>
	);
}
