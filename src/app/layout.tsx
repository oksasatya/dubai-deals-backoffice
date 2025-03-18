"use client";
import React, {ReactNode} from "react";
import '@/app/styles/global.scss';
import '@/app/styles/style.css';
import { Montserrat } from "next/font/google";
import {usePathname} from "next/navigation";
import {Toaster} from "react-hot-toast";
import {ReduxProvider} from "@/app/redux/slices/provider";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["300", "400", "600", "700"] });
export default function RootLayout({children} : {children:ReactNode}){
	const pathName = usePathname();
	const isDashboardPage = pathName.startsWith("/dashboard");
	return(
		<html lang={"en"} className={montserrat.className}>
			<body className={`min-h-screen w-full overflow-hidden ${isDashboardPage ? "bg-warm-gray" : "bg-auth"}`}>
				<Toaster position={"top-center"} reverseOrder={false} />
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	)
}