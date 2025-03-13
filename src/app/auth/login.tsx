"use client";

import React, { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const isFormValid = email.trim() !== "" && password.trim() !== "";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		if(!isFormValid) return;

		try {
			const response = await fetch("/api/users/login", {
				method: "POST",
				body: JSON.stringify({ email, password }),
				headers: { "Content-Type": "application/json" },
			});

			const data = await response.json();
			if (!response.ok) {
				setError(data.message || "An unexpected error occurred");
			}

			console.log("Login successful", data);
			// Redirect or store token here

		} catch (err: unknown) {
			if(err instanceof Error){
				setError(err.message);
			}else{
				setError("An unexpected error occurred");
			}
		}finally {
			setLoading(false);
		}
	};

	return (
		<div className={'flex min-h-screen justify-center items-center'}>
			<div className="w-full max-w-lg bg-white p-12 shadow-lg rounded-xl">
				<h2 className="text-4xl font-bold text-center text-primary">Welcome Back</h2>
				<p className="text-center text-gray-500 mb-8 text-lg">Sign in to your account</p>

				{error && <p className="text-red-500 text-center mb-4">{error}</p>}

				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block text-sm font-medium text-gray-700">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="Enter your email"
							className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Enter your password"
							className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
						/>
					</div>

					<button
						type="submit"
						className={`w-full py-3 rounded-lg font-semibold flex justify-center shadow-lg text-lg transition ${
							isFormValid ? "bg-primary cursor-pointer" : "bg-gray-400 cursor-not-allowed"
						}`}
						disabled={!isFormValid || loading}
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
}
