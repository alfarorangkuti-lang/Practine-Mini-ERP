'use client'

import { useAuth } from "@/app/hooks/auth";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const router = useRouter();
    const { register } = useAuth({middleware:'guest', redirectIfAuthenticated:'/verify'})

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        register({
            email, 
            name, 
            password, 
            password_confirmation,
            setErrors,
        }).then(() => setLoading(false))
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">

            {/* Email */}
            <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="bg-gray-100 text-gray-700 w-full rounded-lg px-3 py-2 focus:outline-none focus:ring"
                    required
                />
            </div>

            {/* Name */}
            <div>
                <label className="block text-sm mb-1 text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama"
                    className="bg-gray-100 text-gray-700 w-full rounded-lg px-3 py-2 focus:outline-none focus:ring"
                    required
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm mb-1 text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="bg-gray-100 text-gray-700 w-full rounded-lg px-3 py-2 focus:outline-none focus:ring"
                    required
                />
            </div>

            {/* Confirmation Password */}
            <div>
                <label className="block text-sm mb-1 text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Konfirmasi password"
                    className="bg-gray-100 text-gray-700 w-full rounded-lg px-3 py-2 focus:outline-none focus:ring"
                    required
                />
            </div>
            {errors && (<span className="text-red-500 my-2">{errors.email }</span>)}
            {errors && (<span className="text-red-500 my-2">{errors.password }</span>)}
            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Loading" : "Daftar" }
            </button>
            <a onClick={() => router.push('/login')} className="cursor-pointer underline text-gray-500 text-sm">Sudah punya akun?</a>
        </form>
    );
}
