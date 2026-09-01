//app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async(e : React.FormEvent)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        
        try {
            const res = await fetch("/api/admin/login",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({email,password}),
            });

            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || "Login failed");
            }

            router.push("/admin");
            router.refresh();
        } catch (error: any) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    

    return(
        <main className="flex min-h-screen items-center justify-center bg-black px-6">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950 p-8 shadow-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-black uppercase tracking-tight">
                        Admin Access
                    </h1>
                    <p className="mt-2 text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                        DRIP Control Panel
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-medium text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                            Email Address
                        </label>
                        <input
                         type="email" 
                         required
                         value={email}
                         onChange={(e)=> setEmail(e.target.value)}
                         className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
                         placeholder="admin@drip.in"
                         />
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-semibold uppercase trakcing-wider text-neutral-400">
                            Password
                        </label>
                        <input 
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white focus:border-white focus:outline-none" 
                        />
                    </div>

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-white py-4 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-neutral-200 disabled:opacity-50"
                    >
                        {loading ? "Authentication..." : "Sign In"}
                    </button>
                </form>
            </div>

        </main>
    )
}