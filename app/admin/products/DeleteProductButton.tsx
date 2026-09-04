// app/admin/products/DeleteProductButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({ id } : { id: string }){
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if(!confirm("Are you sure you want to delete this product?")) return;
        setLoading(true);

        try {
            const res = await fetch(`/api/products/${id}`,{
                method: "DELETE",
            });

            if(res.ok){
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    };


    return(
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 disabled:opacity-50"
        >
            {loading ? "Deleting..." : "Delete"}
        </button>
    )
}