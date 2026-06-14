"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-outfit text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          PriceAI
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/trending" className="hover:text-white transition-colors">Trending</Link>
          <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
        </nav>
        <div className="flex gap-4 items-center">
          {status === "loading" ? (
            <div className="w-20 h-8 bg-slate-800 animate-pulse rounded-full" />
          ) : session ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
                  <User className="w-4 h-4" />
                </div>
                <span className="hidden sm:inline">{session.user?.name}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 rounded-full text-sm font-medium bg-white text-slate-950 hover:bg-slate-200 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
