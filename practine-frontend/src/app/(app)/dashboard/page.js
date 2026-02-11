'use client'

import { useAuth } from "../../hooks/auth"
export default function Dashboard() {
    const { user } = useAuth({middleware: 'auth'})

    if(!user){
        return 'loading';
    }

    return (
        <>
            <div className="text-slate-600">Selamat datang {user.name}</div>
        </>
    )
}