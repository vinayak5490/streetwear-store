// app/api/products/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request){
    try {
        const body = await req.json();
        const product = await prisma.product.create({
            data:{
                name: body.name,
                slug: body.slug,
                description: body.description,
                price: body.price,
                category: body.category,
                brand: body.brand,
                stock: body.stock,
                images: body.images,
            },
        });

        return NextResponse.json(product, { status: 201});
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create product"},
        { status: 500 }
        )
    }
}