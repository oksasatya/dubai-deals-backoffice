"use client";

import {useEffect, useRef, useState} from "react";
import {useAppSelector} from "@/app/redux/slices/hooks";
import Image from "next/image";
import {LogOut, UserCog} from "lucide-react";
import {useRouter} from "next/navigation";
import {logout} from "@/app/services/authService";


export default function AvatarDropdown() {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const {data : userData,loading} = useAppSelector(state => state.user);
  	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/");
	}

	// click Outside Handler
	useEffect(() => {
		const handleClickOutside = (event:MouseEvent) => {
			if(dropdownRef.current && event.target instanceof Node &&
				!dropdownRef.current.contains(event.target)){
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	},[]);

	return (
		<div ref={dropdownRef} className="relative">
			<button onClick={()=>setIsOpen(!isOpen)} className="flex items-center justify-center rounded-full overflow-hidden"
			>
				<Image src={'/images/user/avatar.png'} alt={'user Avatar'} width={40} height={40} className={'rounded-full cursor-pointer'} />
				{/*<img src={userData?.avatar} alt="avatar" className="w-8 h-8 rounded-full" />*/}
			</button>

			<div className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gradient-to-b from-[#00336e] to-[#001a41] text-white z-50 transition-all duration-200 transform origin-top-right ${
				isOpen 
					? `opacity-100 scale-100`
					: `opacity-0 scale-95 pointer-events-none`}`}>
				<div className={'py-1'}>
					<div className={'px-4 py-3 border-b'}>
						{loading ? (
							<p className={'text-sm'}>Loading...</p>
						) : (
							<>
								<p className={'text-sm text-white'}>{userData?.name}</p>
								<p className={'text-xs text-gray-400'}>{userData?.email}</p>
							</>
						)}
					</div>
				</div>

				<a href={'/profile'} className={'flex item-center px-4 py-2 text-sm hover:bg-hover  text-white'}>
					<UserCog size={16} className={'mr-2'} />
					Edit Profile
				</a>

				<button className={'flex w-full items-center px-4 py-2 font-semibold cursor-pointer text-red-500  hover:bg-hover '} onClick={handleLogout}>
					<LogOut size={16} className={'mr-2'} />
					Logout
				</button>
			</div>
		</div>
	)

}