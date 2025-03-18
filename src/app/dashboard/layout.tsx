"use client";
import React, {ReactNode, useState} from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

export default function DashboardLayout({children} : {children:ReactNode}) {
	const [isOpen, setIsOpen] = useState(false);
	const [manualOpen, setManualOpen] = useState(false);
	return (
		<div className="flex h-screen relative">
			<Sidebar isOpen={isOpen} setIsOpen={setIsOpen} manualOpen={manualOpen} setManualOpen={setManualOpen} />

			<div className={`flex flex-col flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-16"}`}>
				<Navbar isOpen={isOpen} />

				<main className={`flex-1 px-19 py-6 mt-20 transition-all duration-300`}>
					{children}
				</main>
			</div>
		</div>
	);
}
