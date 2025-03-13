import Login from "./auth/login";
import {Metadata} from "next";

export const metadata:Metadata ={
	title: "Dubai Deals",
	description: "Dubai Deals is a platform that offers the best deals in Dubai",
}

export default function Home() {
	return <Login/>;
}
