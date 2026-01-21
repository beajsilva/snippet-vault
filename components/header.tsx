import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { SquareCode } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 max-w-5xl">
        {/* Name */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-opacity hover:opacity-80"
        >
          <div className="w-9 h-9 bg-main rounded-lg flex items-center justify-center">
            {/* <span className="text-white font-black text-sm italic">SV</span> */}
             <SquareCode className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-main">
            Snippet<span className="text-brand"> Vault</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {/* <Link
              href="/"
              className="text-sm font-medium text-slate-500 hover:text-main transition-colors"
            >
              Collection
            </Link> */}
            {/* <Link
              href="/snippets/new"
              className="bg-main text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-main/90 transition-all active:scale-95 border border-main/90"
            >
              + New
            </Link> */}
          </nav>
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-brand/90 transition-all active:scale-95 border border-brand/90 cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
