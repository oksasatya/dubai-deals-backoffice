import {usePathname} from "next/navigation";
import Link from "next/link";
import React from "react";

interface SidebarItemProps {
	href: string;
	icon: React.ReactNode;
	label: string;
	isOpen: boolean;
}


export default function SidebarItem({ href, icon, label, isOpen }: SidebarItemProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link href={href} className={`flex px-4 py-4 cursor-pointer hover:bg-hover rounded-lg transition
        ${isActive ? "bg-sapphire-600/60" : ""}`}>
			<div className="flex items-center gap-3">
				{icon}
				{isOpen && <span className="font-bold">{label}</span>}
				{!isOpen && (
					<span
						className="absolute left-14 bg-sapphire-800 text-white px-2 py-1 rounded-md text-sm opacity-0 transition-opacity
          				duration-300 group-hover:opacity-100"
					>
					  {label}
					</span>
				)}
			</div>
		</Link>
	);
}