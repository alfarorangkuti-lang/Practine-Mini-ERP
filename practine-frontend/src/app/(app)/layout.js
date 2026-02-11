'use client'

import { useState } from "react"
import { Menu, Home, Users, Settings, LogOut } from "lucide-react"
import { useAuth } from "../hooks/auth"
import Image from "next/image"

export default function LayoutApp({ children }) {
    const [collapsed, setCollapsed] = useState(false)
    const [active, setActive] = useState("dashboard")
    const { logout } = useAuth({middleware: 'auth'})

    const menus = [
        { key: "dashboard", label: "Dashboard", icon: Home },
        { key: "users", label: "Users", icon: Users },
        { key: "settings", label: "Settings", icon: Settings },
    ]

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-100 to-slate-200">

            {/* SIDEBAR */}
            <aside
                className={`
                relative flex flex-col
                ${collapsed ? "w-20" : "w-64"}
                transition-all duration-300 ease-in-out
                bg-white/70 backdrop-blur-xl
                border-r border-white/30
                shadow-xl
            `}
            >

                {/* Logo + Toggle */}
                <div className="flex items-center justify-between p-4 border-b border-slate-200/60">
                    {!collapsed && (
                        <Image
                            className="justify-center"
                            src="/PractineLogoS.png"
                            alt="Practine logo"
                            width={80}
                            height={16}
                            priority
                        />
                    )}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-3 text-gray-600 rounded-lg hover:bg-slate-100 transition"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* MENU */}
                <nav className="flex-1 p-3 space-y-2">
                    {menus.map((menu) => {
                        const Icon = menu.icon
                        const isActive = active === menu.key

                        return (
                            <button
                                key={menu.key}
                                onClick={() => setActive(menu.key)}
                                className={`
                                group w-full flex ${collapsed && ('justify-center')} gap-3 p-3 rounded-xl
                                transition-all duration-300 active:scale-95
                                
                                ${isActive
                                        ? "bg-black text-white shadow-md"
                                        : "text-slate-600 hover:bg-white hover:shadow-sm"
                                    }
                            `}
                            >
                                <Icon size={20} />

                                {!collapsed && (
                                    <span className="text-sm font-medium tracking-tight">
                                        {menu.label}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </nav>

                {/* FOOTER USER */}
                <div className="p-3 border-t border-slate-200/60">
                    <button onClick={logout} className="w-full flex active:scale-95 justify-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-500 transition">
                        <LogOut size={20} />
                        {!collapsed && <span className="text-sm">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col">

                {/* TOPBAR */}
                <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-white/40 flex items-center justify-between px-6 shadow-sm">
                    <div className="font-semibold tracking-tight text-slate-600">
                        {active.charAt(0).toUpperCase() + active.slice(1)}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-sm text-slate-500">
                            Hello, Alfaro 👋
                        </div>

                        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                            A
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 p-6">
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/40">
                        {children}
                    </div>
                </main>

            </div>

        </div>
    )
}
