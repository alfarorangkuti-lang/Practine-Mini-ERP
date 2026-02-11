'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/auth";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const router = useRouter();

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: './dashboard',
    })

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        login({
            email,
            password,
            remember: false,
            setErrors,
            setStatus,
        }).then(() => setLoading(false))
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4 w-full">

            <div>
                <label className="block text-sm mb-1 text-slate-600">Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-gray-100 inset-shadow-sm shadow-sm rounded-lg px-3 py-2 focus:outline-none text-slate-600"
                    required
                />
            </div>

            <div>
                <label className="block text-sm mb-1 text-slate-600">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-gray-100 inset-shadow-sm shadow-sm rounded-lg px-3 py-2 focus:outline-none text-slate-600"
                    required
                />
            </div>

            {errors?.email && (
                <p className="text-red-500 text-sm">{errors.email[0]}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="active:scale-95 transition-all duration-200 w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
            >
                {loading ? "Loading..." : "Masuk"}
            </button>

            <div className="flex justify-between gap-2">
                <a onClick={() => router.push('/forgot-password')} className="cursor-pointer underline text-gray-500 text-sm">Lupa password?</a>
                <a onClick={() => router.push('/register')} className="cursor-pointer underline text-gray-500 text-sm">Belum punya akun?</a>
            </div>
        </form>
    );
}
