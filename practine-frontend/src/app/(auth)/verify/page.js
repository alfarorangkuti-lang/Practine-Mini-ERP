'use client'
import { useAuth } from "@/app/hooks/auth"
import { useState } from "react"
export default function Verify(){
    const [status, setStatus] = useState("")
    const { user, logout, resendEmailVerification } = useAuth({middleware: 'auth', redirectIfAuthenticated:'/dashboard'})
    if(!user) return 'unauthorized'
    return(
        <>
            <span className="text-gray-600 mb-2">
                hai {user.name}, mohon klik link verifikasi yang sudah dikirim ke email yang terdaftar
            </span>
            <button onClick={logout} className="mt-2 w-full flex active:scale-95 justify-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-red-100 hover:text-red-500 transition duration-200 bg-red-50">
                Logout
            </button>

            <button onClick={() => resendEmailVerification({setStatus})} className="mt-2 w-full flex active:scale-95 justify-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-700 text-white transition duration-200 bg-slate-800">
                Kirim ulang kode
            </button>

            {status === 'verification-link-sent' && (
                <div className="my-4 font-medium text-sm text-green-600">
                    Link verifikasi terbaru sudah dikirim ke email yang terdaftar.
                </div>
            )}
        </>
    )
}