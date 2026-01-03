'use client'
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '@/authcontext/Authcontext';

interface information {
    email: string;
    password: string;
}

const Page = () => {
    const auth = useAuth();
    const [information, setInformation] = useState<information>({ email: "", password: "" });
    const [loading, setLoading] = useState<boolean>(false);

    const handleInformation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInformation(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("https://recipe-suggestion-app-vtq8.onrender.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: information.password,
                    username: information.email
                }),
                credentials: "include"
            });

            const finalRes = await res.json();
            console.log(finalRes);
            console.log("Login is successful");
            if(finalRes.success) auth.setUser(information.email);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("some error occurred while logging in", err);
        }
    }

    return (
        <div className="min-h-screen bg-amber-50">
            <NavBar />
            <div className="flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
                        <p className="text-slate-600">Log in to continue your culinary journey</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
                        <div className="space-y-5">
                            {/* Email/Username */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                    Email / Username
                                </label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={information.email}
                                    onChange={handleInformation}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    id="password"
                                    name="password"
                                    value={information.password}
                                    onChange={handleInformation}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            loginHandler(e as any);
                                        }
                                    }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                disabled={loading}
                                onClick={loginHandler as any}
                                className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-slate-600 mt-6">
                        Don't have an account?{' '}
                        <a href="/signup" className="text-orange-600 font-semibold hover:text-orange-700 cursor-pointer">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Page;