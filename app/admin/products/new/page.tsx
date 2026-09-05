//app/admin/products/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary"

export default function NewProductPage(){
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [form, setForm] = useState({
        name: "",
        slug:"",
        description:"",
        price:"",
        category:"hoodies",
        brand: "DRIP",
        stock:"10",
    });

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        if(images.length === 0){
            alert("Please upload at least one images");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    ...form,
                    price: parseFloat(form.price),
                    stock: parseInt(form.stock),
                    images,
                }),
            });

            if(res.ok){
                router.push("/admin/products");
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    };


    return(
        <main className="min-h-screen bg-black px-6 py-12 text-white">
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-neutral-950 p-8">
                <h1 className="mb-6 text-2xl font-black uppercase">Add New Product</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase text-neutral-400">Product Images</label>
                        <div>
                            {images.map((url, idx)=>(
                                <img 
                                    key={idx}
                                    src={url}
                                    alt="Upload preview"
                                    className="h-20 w-16 rounded-lg object-cover border border-white/20"
                                 />
                            ))}
                        </div>
                        <CldUploadButton
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                            onSuccess={(result)=>{
                                const info = result.info;
                                if (
                                    typeof info === "object" &&
                                    info !== null &&
                                    "secure_url" in info &&
                                    typeof info.secure_url === "string"
                                ) {
                                    setImages((prev) => [...prev, info.secure_url]);
                                }
                            }}
                            className="rounded-xl border border-dashed border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-300 transition hover:border-white"
                        >
                             + Upload Image 
                            </CldUploadButton>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-neutral-400">
                                Name
                            </label>
                            <input
                             type="text"
                             required
                             value={form.name}
                             onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                                })
                             }
                             className="w-full rounded-xl border border-white/10 bg-neutral-900 p-3 text-sm focus:outline-none"
                              />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-neutral-400">Slug</label>
                            <input type="text" required value={form.slug}
                            onChange={(e)=> setForm({...form, slug:e.target.value})}
                            className="w-full rounded-xl border border-white/10 bg-neutral-900 p-3 text-sm focus:outline-none" />
                        </div>                             
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-neutral-400">
                                Price(INR)
                            </label>
                            <input type="number" required value={form.price} 
                            onChange={(e) => setForm({...form, price: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-neutral-900 p-3 text-sm focus:outline-none"/>
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-neutral-400">Stock</label>
                            <input type="number" required value={form.stock}
                            onChange={(e) => setForm({...form, stock: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-neutral-900 p-3 text-sm focus: outline-none" />
                        </div>

                        <div>
                            <label className="mb-2 block text-xs font-bold uppercase text-neutral-400">Category</label>
                            <select value={form.category}
                            onChange={(e) => setForm({...form, category: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-neutral-900 p-3 text-sm focus:outline-none"
                            >

                                <option value="hoodies">Hoodies</option>
                                <option value="tshirts">T-shirts</option>
                                <option value="pants">Pants</option>
                                <option value="accessories">Accessories</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-bold uppercase text-neutral-400">Description</label>
                        <textarea rows={4} value={form.description}
                        onChange={(e) => setForm({...form, description: e.target.value})}
                        className="w-full rounded-xl borer border-white/10 bg-neutral-900 p-3 text-sm focus:outline-none"></textarea>
                    </div>

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-full bg-white py-4 text-xs font-bold uppercase text-black hover:bg-neutral-200 disabled:opacity-50"
                    >{loading? "Creating..." : "Save Product"}</button>
                </form>
            </div>

        </main>
    )
}