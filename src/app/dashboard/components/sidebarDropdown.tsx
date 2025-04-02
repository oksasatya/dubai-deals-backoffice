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


export default function SidebarDropdown({label, icon, isOpen, items}: SidebarDropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathName = usePathname();
    const isActive = items.some((item) => pathName === item.href);

    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center justify-between w-full px-3 py-2 hover:bg-hover rounded-lg transition-colors cursor-pointer ${isActive ? "bg-sapphire-600/60" : ""}`}
            >
                <div className="flex items-center gap-3">
                    {icon}
                    {isOpen && <span className="font-bold">{label}</span>}
                </div>
                {isOpen && <ChevronDown size={20}
                                        className={`transition-transform duration-500 ${isDropdownOpen ? "rotate-180" : ""}`}/>}
            </button>

            <div
                style={{
                    maxHeight: isDropdownOpen ? `${items.length * 40}px` : "0px",
                    transition: "max-height 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease",
                    opacity: isDropdownOpen ? 1 : 0,
                    overflow: isDropdownOpen ? "visible" : "hidden"
                }}
                className={`ml-10 mt-1 space-y-2 ${!isOpen && "hidden"}`}
            >
                {items.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="flex items-center w-full px-3 py-2 hover:bg-hover rounded-lg transition-colors overflow-visible"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

