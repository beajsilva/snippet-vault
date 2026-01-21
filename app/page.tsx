import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/snippets");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-black text-slate-900 mb-6">
        Organize your <span className="text-brand">Code Snippets</span>
      </h1>

      <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
        A simple, secure vault for the code you use every day. Stop searching
        through your old projects. Save it once, find it forever!
      </p>

      <div className="flex gap-4">
        <a
          href="/snippets"
          className="bg-main text-lg text-white px-5 py-3 rounded-lg font-semibold hover:bg-main/90 transition-all shadow-sm active:scale-95"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
