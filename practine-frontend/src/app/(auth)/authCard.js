'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AuthCard({children}){
    const router = useRouter();
    return(
        <div className=" shadow-lg p-6 rounded-xl bg-white w-full sm:max-w-md">
            <div className="flex justify-center mb-4 cursor-pointer" onClick={() => {router.push('/')}}>
            <Image
                      className="justify-center"
                      src="/PractineLogoS.png"
                      alt="Practine logo"
                      width={150}
                      height={30}
                      priority
                    />
            </div>
            {children}
        </div>
    )
}