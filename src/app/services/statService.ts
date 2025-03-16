import { usersData, totalStats } from "@/app/utils/data/dashboard-data";



export const getStats = async ():Promise<{
	totalStats: {
		totalUsers: number;
		totalProducts: number;
		totalOrders: number;
		usersGrowth: string;
		productsGrowth: string;
		ordersGrowth: string
	};
	usersData: { month: string; users: number }[]
}> => {
	try {
		return {
			totalStats,
			usersData
		};
	} catch (e) {
		console.error("Failed to fetch stats",e);
		return {
			totalStats: {
				totalUsers: 0,
				usersGrowth: "0",
				totalProducts: 0,
				productsGrowth: "0",
				totalOrders: 0,
				ordersGrowth: "0",
			},
			usersData: [],
		};
	}
}