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
			className={`fixed top-0 left-0 h-screen bg-sidebar z-10 shadow-lg transition-transform duration-500 ease-in-out ${
				isOpen ? "w-64" : "w-25 transform-gpu"
			}`}
			style={{
				transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)"
			}}
			onMouseEnter={() => !manualOpen && setIsOpen(true)}
			onMouseLeave={() => !manualOpen && setIsOpen(false)}
			>

			{/*logo & toogle button */}
			<div className="flex items-center justify-between p-4 border-b transition-all duration-300 ease-in-out">
				<div className="transition-all duration-300 ease-in-out overflow-hidden" style={{width: isOpen ? '190px' : '40px'}}>
					<Image
						src={isOpen ? ImagesName : Images}
						alt="Logo"
						width={isOpen ? 190 : 40}
						height={40}
						className="transition-transform duration-300 ease-in-out"
					/>
				</div>
				<button
					className="p-2 rounded hover:bg-hover cursor-pointer transition-all duration-300 ease-in-out"
					onClick={() => {
						const newManualState = !manualOpen;
						setManualOpen(newManualState);
						setIsOpen(newManualState);
					}}
				>
					<div className="relative h-6 w-6">
						  <span className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
							<X size={24} />
						  </span>
						<span className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
							<Menu size={24} />
						</span>
					</div>
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