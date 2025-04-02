"use client";

import React, {useEffect, useState} from "react";
import {login} from "@/app/services/authService";
import {setToken} from "@/app/utils/cookies";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {roles} from "@/app/api/api";


export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const isFormValid = email.trim() !== "" && password.trim() !== "";

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setEmailError("");
        setPasswordError("");

        if (!isFormValid) return;

        try {
            const data = await login(email, password);
            const token = data.data.token;
            const role = data.data.role;

            if (role != roles.admin && role != roles.superADMIN) {
                const roleError = "Your account does not have the necessary permissions to access this page.";
                toast.error(roleError);
                setEmailError(roleError);
                setPasswordError(roleError);
                return;
            }

            if (token && (role === roles.admin || role === roles.superADMIN)) {
                setToken(token);
                toast.success("Login successfully");

                setTimeout(() => router.push(`/dashboard`), 1000);
            }
        } catch (err) {
            let errorMessage = "An unexpected error occurred. Please try again later.";

            if (err instanceof Error) {
                errorMessage = err.message;
            }

            setEmailError(errorMessage);
            setPasswordError(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={'flex min-h-screen justify-center items-center'}>
            <div className="w-full max-w-lg bg-white p-12 shadow-lg rounded-xl">
                <h2 className="text-4xl font-bold text-center text-primary">Welcome Back</h2>
                <p className="text-center text-gray-500 mb-8 text-lg">Sign in to your account</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setEmailError("")
                            }}
                            required
                            placeholder="Enter your email"
                            className={`w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition ${emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-secondary"}`}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setPasswordError("")
                            }}
                            required
                            placeholder="Enter your password"
                            className={` w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${passwordError ? "border-red-500 focus:ring-red-500" : "focus:ring-secondary"}`}
                        />
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg font-semibold flex justify-center shadow-lg text-lg transition ${
                            isFormValid ? "bg-primary text-white cursor-pointer" : "bg-gray-400 cursor-not-allowed"
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