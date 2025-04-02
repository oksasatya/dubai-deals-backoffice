"use client";

import {useEffect, useState} from "react";
import dynamic from "next/dynamic";

import StatsCard from "@/app/dashboard/components/statsCard";
import LoadingSpinner from "@/app/dashboard/components/loadingSpinner";
import {getToken} from "@/app/utils/cookies";
import {getStats} from "@/app/services/statService";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {fetchUserProfile} from "@/app/redux/slices/userSlice";
import {AppDispatch} from "@/app/redux/slices/store";
import {useAppSelector} from "@/app/redux/slices/hooks";
import toast from "react-hot-toast";

const LineChartComponent = dynamic(() => import("@/app/dashboard/components/lineChartComponent"), {
    ssr: false,
    loading: () => <LoadingSpinner/>
});

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUsers: 0,
        usersGrowth: "0",
        totalProducts: 0,
        productsGrowth: "0",
        totalOrders: 0,
        ordersGrowth: "0",
    });

    const [monthlyData, setMonthlyData] = useState<{ month: string; users: number }[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const {data: userData} = useAppSelector(state => state.user);


    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/");
            toast.error("Your session has expired. Please log in again to continue.");
            return;
        }

        (async () => {
            try {
                const data = await getStats();
                setStats(data.totalStats);
                setMonthlyData(Array.isArray(data.usersData) ? data.usersData : []);
                dispatch(fetchUserProfile());
            } catch (e) {
                console.error("Failed To Fetch Data", e);
            } finally {
                setLoading(false);
            }
        })();
        setIsClient(true);
    }, [router, dispatch]);
    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (loading && showLoading) return <LoadingSpinner/>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            <p className="text-gray-500 mb-6">Welcome, {userData?.name || 'User'}</p>


            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCard title="Total Users" value={stats.totalUsers} growth={stats.usersGrowth} color="#4CAF50"
                           data={monthlyData}/>
                <StatsCard title="Total Products" value={stats.totalProducts} growth={stats.productsGrowth}
                           color="#2196f3" data={monthlyData}/>
                <StatsCard title="Total Orders" value={stats.totalOrders} growth={stats.ordersGrowth} color="#FF5722"
                           data={monthlyData}/>
            </div>

            {/* Monthly Users Growth Chart */}
            <div className="p-4 bg-white rounded-lg shadow mt-6">
                <h2 className="text-lg font-semibold mb-2">Users Growth Per Month</h2>
                {isClient && <LineChartComponent data={monthlyData}/>}
            </div>
        </div>
    );
}
