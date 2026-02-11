'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, name, password, passwordConfirmation });
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
                    className="text-gray-700 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
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
                    className="text-gray-700 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
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
                    className="text-gray-700 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
                    required
                />
            </div>

            {/* Confirmation Password */}
            <div>
                <label className="block text-sm mb-1 text-gray-700">Confirm Password</label>
                <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="text-gray-700 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
            >
                Register
            </button>
            <a onClick={() => router.push('/login')} className="cursor-pointer underline text-gray-500 text-sm">Sudah punya akun?</a>
        </form>
    );
}
