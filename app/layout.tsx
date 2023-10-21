import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar/Navbar";
import { cn } from "@/lib/utils";
import Provider from "@/providers/provider";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

type Props = {
	children: React.ReactNode;
	session: any;
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	title: "TopicHub",
	description: "The home page for this TopicHub application.",
};

export default function RootLayout({ children, session }: Props) {
	return (
		<html lang="en">
			<body className={cn(inter.className, "min-h-screen bg-background")}>
				<Provider session={session}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar />
						<main className="container mx-auto min-h-[calc(100vh-117px)] text-black dark:text-white sm:min-h-[calc(100vh-76.8px)] px-8 py-24">
							{children}
						</main>
						<Footer />
					</ThemeProvider>
				</Provider>
			</body>
		</html>
	);
}
