"use client";
import {ReactNode} from "react";
import '../styles/global.scss';
import '../styles/style.css';
import { Montserrat } from "next/font/google";
import {usePathname} from "next/navigation";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });
export default function RootLayout({children} : {children:ReactNode}){
	const pathName = usePathname();
	const isDashboardPage = pathName.startsWith("/dashboard");
	return(
		<html lang={"en"} className={montserrat.className}>
			<body className={`min-h-screen w-full overflow-hidden ${isDashboardPage ? "bg-warm-gray" : "bg-auth"}`}>{children}</body>
		</html>
	)
}