'use client'
import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '@/authcontext/Authcontext';

interface information {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmpassword: string;
    username: string;
}

const Page = () => {
    const auth = useAuth();
    const [information, setInformation] = useState<information>({
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        confirmpassword: ""
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleInformation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInformation(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        console.log(information);
        try {
            const res = await fetch("https://recipe-suggestion-app-vtq8.onrender.com/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: information.username,
                    password: information.password,
                    email: information.email
                }),
                credentials: "include"
            });

            const finalres = await res.json();
            console.log(finalres);
            console.log("Signup is successful");
            if (finalres.success == true) {
                auth.setUser(information.username);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("some error occurred", err);
        }
    }

    return (
        <div className="min-h-screen bg-amber-50">
            <NavBar />
            <div className="flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Account</h1>
                        <p className="text-slate-600">Join Recipe Hub and start your culinary journey</p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
                        <div className="space-y-5">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstname" className="block text-sm font-medium text-slate-700 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                        placeholder="John"
                                        id="firstname"
                                        name="firstname"
                                        type="text"
                                        value={information.firstname}
                                        onChange={handleInformation}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium text-slate-700 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                        placeholder="Doe"
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        value={information.lastname}
                                        onChange={handleInformation}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                    Email
                                </label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={information.email}
                                    onChange={handleInformation}
                                />
                            </div>

                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                                    Username
                                </label>
                                <input
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="johndoe"
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={information.username}
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
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmpassword" className="block text-sm font-medium text-slate-700 mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    value={information.confirmpassword}
                                    onChange={handleInformation}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            signupHandler(e as any);
                                        }
                                    }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="button"
                                disabled={loading}
                                onClick={signupHandler as any}
                                className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-slate-600 mt-6">
                        Already have an account?{' '}
                        <a href="/login" className="text-orange-600 font-semibold hover:text-orange-700 cursor-pointer">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Page;