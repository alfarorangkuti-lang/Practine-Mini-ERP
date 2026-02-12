'use client'

import { useAuth } from "../../hooks/auth"
import Script from "next/script";
export default function Dashboard() {
    const { user, getToken } = useAuth({middleware: 'auth'})

  const handlePay = async () => {
  const token = await getToken()
  console.log("TOKEN:", token)

  window.snap.pay(token, {
    onSuccess: function(result){
      console.log("SUCCESS", result)
    },
    onPending: function(result){
      console.log("PENDING", result)
    },
    onError: function(result){
      console.log("ERROR", result)
    },
    onClose: function () {
        document.body.style.overflow = "auto"
        document.body.style.removeProperty("overflow")

        const overlay = document.querySelector(".snap-overlay")
        if (overlay) overlay.remove()

        const container = document.querySelector(".snap-container")
        if (container) container.remove()
    }
  })
}


    if(!user){
        return 'loading';
    }

    return (
        <>
            <Script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key={'SB-Mid-client-pJvGHaUr5VNa-tcQ'}
                strategy="afterInteractive"
            />
            <button className="text-black cursor-pointer transition duration-200 active:scale-95 p-2 rounded-lg bg-slate-100 border border-slate-200" onClick={handlePay}>
              Bayar Sekarang
            </button>
        </>
    )
}