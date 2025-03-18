"use client";
import { useEffect, useState } from "react";
import AvatarDropdown from "@/app/dashboard/components/avatarDropdown";
// import Image from "next/image";

export default function Navbar({ isOpen }: { isOpen: boolean }) {
	// const UserAvatar = "/images/user/avatar.png";
	const [navStyles, setNavStyles] = useState({ left: "16rem", width: "calc(100% - 16rem)",padding: "0rem" });
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isOpen) {
			setNavStyles({ left: "16rem", width: "calc(100% - 16rem)",padding: "3rem"});
		} else {
			setNavStyles({ left: "4rem", width: "calc(100% - 4rem)",padding: "2.275rem"});
		}
	}, [isOpen]);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		},3000);
	}, []);
	return (
		<div
			className="fixed top-0 h-16 flex items-center px-6 bg-white shadow-md transition-all duration-300"
			style={navStyles}
		>
			{isLoading && (
				<div className={'absolute top-0 left-0 w-full h-1'}>
					<div className={'h-full bg-blue-500 animate-loading'}></div>
				</div>
			)}
			<div className={'ml-auto rounded-full'}>
				<AvatarDropdown />
			</div>
			{/*<Image src={UserAvatar} alt="User" width={40} height={40} className="ml-auto rounded-full cursor-pointer" />*/}
		</div>
	);
}
