"use client";
import React, {useState} from "react";
import Link from "next/link";
import {ChevronDown} from "lucide-react";
import {usePathname} from "next/navigation";


interface SidebarDropdownProps {
	label: string;
	icon: React.ReactNode;
	isOpen: boolean;
	items: { href: string; label: string }[];
}

export default function SidebarDropdown({ label, icon, isOpen, items }: SidebarDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const pathName = usePathname()

	const isActive = items.some((item) => pathName === item.href);

	return (
		<div className="relative">
			<button
				onClick={() => setIsDropdownOpen(!isDropdownOpen)}
				className={`flex items-center justify-between w-full px-4 py-2 hover:bg-hover rounded-lg transition cursor-pointer ${isActive ? "bg-sapphire-600/60" : ""}`}
			>
				<div className="flex items-center gap-3">
					{icon}
					{isOpen && <span className="font-bold">{label}</span>}
				</div>
				{isOpen && <ChevronDown size={20} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />}
			</button>

			{/* Dropdown Menu */}
			{isDropdownOpen && (
				<div className={`ml-10 mt-1 space-y-2 transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
					{items.map((item, index) => (
						<Link key={index} href={item.href} className="block px-4 py-2 text-white hover:bg-hover rounded-lg">
							{item.label}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

