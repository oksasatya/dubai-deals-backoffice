"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usersData, totalStats } from "../../../../../utils/data/dashboard-data";
import StatsCard from "../../components/statsCard";
import LoadingSpinner from "@/app/dashboard/components/loadingSpinner";

const LineChartComponent = dynamic(() => import("../../components/lineChartComponent"), {
	ssr: false,
	loading: () => <LoadingSpinner />
});

export default function DashboardPage() {
	const [monthlyData] = useState(usersData);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold text-primary">Dashboard</h1>
			<p className="text-gray-500 mb-6">Welcome Admin</p>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<StatsCard title="Total Users" value={totalStats.totalUsers} growth={totalStats.usersGrowth} color="#4CAF50" data={monthlyData} />
				<StatsCard title="Total Products" value={totalStats.totalProducts} growth={totalStats.productsGrowth} color="#2196f3" data={monthlyData} />
				<StatsCard title="Total Orders" value={totalStats.totalOrders} growth={totalStats.ordersGrowth} color="#FF5722" data={monthlyData} />
			</div>

			{/* Monthly Users Growth Chart */}
			<div className="p-4 bg-white rounded-lg shadow mt-6">
				<h2 className="text-lg font-semibold mb-2">Users Growth Per Month</h2>
				{isClient && <LineChartComponent data={monthlyData} />}
			</div>
		</div>
	);
}
