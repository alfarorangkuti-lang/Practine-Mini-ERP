'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/PractineLogoS.png"
          alt="Next.js logo"
          width={200}
          height={40}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Tingkatkan manajemen dengan Practine, Ayo bergabung sekarang
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Aplikasi Web ini dibuat untuk para pelaku UMKM dengan fitur-fitur yang membantu manajemen
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            onClick={() => router.push('auth/login')}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert rotate-90"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Masuk
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            onClick={() => router.push('auth/register')}
            target="_blank"
            rel="noopener noreferrer"
          >
            Daftar
          </a>
        </div>
      </main>
    </div>
  );
}
