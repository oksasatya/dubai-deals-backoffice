"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart } from "recharts";
import LoadingSpinner from "@/app/dashboard/components/loadingSpinner";

interface StatsCardProps {
	title: string;
	value: number;
	growth: string;
	color: string;
	data: { month: string; users: number }[];
}

export default function StatsCard({ title, value, growth, color, data }: StatsCardProps) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="p-4 bg-white rounded-lg shadow flex flex-col">
			<h2 className="text-gray-500 text-sm">{title}</h2>
			<div className="flex justify-between items-center">
				<div>
					<p className="text-3xl font-bold">{value.toLocaleString()}</p>
					<p className={`text-sm ${growth.startsWith("-") ? "text-red-500" : "text-green-500"}`}>
						{growth} last 7 days
					</p>
				</div>
				{isClient ?  (
					<BarChart width={60} height={40} data={data}>
						<Bar dataKey="users" fill={color} />
					</BarChart>
				) : (
					<LoadingSpinner />
				)}
			</div>
		</div>
	);
}