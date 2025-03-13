"use client";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useEffect, useState} from "react";
import LoadingSpinner from "@/app/dashboard/components/loadingSpinner";

interface ChartProps {
	data: { month:string; users: number }[];
}

export default function LineChartComponent({ data }: ChartProps) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);


	return isClient ? (
		<ResponsiveContainer width={'100%'} height={300}>
			<LineChart data={data}>
				<XAxis dataKey="month" />
				<YAxis />
				<CartesianGrid strokeDasharray={'3 3'} />
				<Tooltip/>
				<Line type={'monotone'} dataKey="users" stroke={'#4CAF50'} strokeWidth={2}/>
			</LineChart>
		</ResponsiveContainer>
	) : (
		<LoadingSpinner />
	);
}