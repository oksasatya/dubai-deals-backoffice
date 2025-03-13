"use client";
import React from "react";
import Image from "next/image";
import SidebarDropdown from "@/app/dashboard/components/sidebarDropdown";
import {FileBox, Users, Menu, X, Home} from "lucide-react";
import SidebarItem from "@/app/dashboard/components/sidebarItem";

export default function Sidebar({
	isOpen,
	setIsOpen,
	manualOpen,
	setManualOpen,
	}: {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	manualOpen: boolean;
	setManualOpen: (open: boolean) => void;
}) {
	const Images = "/logo.png";
	const ImagesName = "/logo-name.png";

	return (
		<div
			className={`fixed top-0 left-0 h-screen bg-sidebar z-10 shadow-lg transition-all duration-300 ${
				isOpen ? "w-64" : "w-25"
			}`}
			onMouseEnter={() => {
				if (!manualOpen) {
					setIsOpen(true);
				}
			}}
			onMouseLeave={() => {
				if (!manualOpen) {
					setIsOpen(false);
				}
			}}>

			{/*logo & toogle button */}
			<div className={'flex items-center justify-between p-4 border-b'}>
				<Image src={isOpen ? ImagesName : Images} alt="Logo" width={isOpen ? 190 : 40} height={40} />
				<button className="p-2 rounded hover:bg-hover cursor-pointer"
						onClick={() => {
							const newManualState = !manualOpen;
							setManualOpen(newManualState);
							setIsOpen(newManualState);
						}}
				>
					{isOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
			</div>
			<SidebarItem href="/dashboard" icon={<Home size={24} />} label="Dashboard" isOpen={isOpen} />

			{/* sidebar navigation */}
			<nav className="space-y-2 mt-4">
				<SidebarDropdown
					label="Products"
					icon={<FileBox size={24} />}
					isOpen={isOpen}
					items={[
						{ href: "/dashboard/products", label: "Product List" },
						{ href: "/dashboard/products/create", label: "Add Product" },
					]}
				/>

				<SidebarDropdown
					label="Users"
					icon={<Users size={24} />}
					isOpen={isOpen}
					items={[
						{ href: "/dashboard/users", label: "User List" },
						{ href: "/dashboard/users/create", label: "Add User" },
					]}
				/>
			</nav>
		</div>
	);
}