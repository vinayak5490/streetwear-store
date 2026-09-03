//app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req : Request){
    try {
        const { email, password } = await req.json();
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if(email !== adminEmail || password !== adminPassword){
            return NextResponse.json(
                { error: "Invalid admin credentials"},
                { status: 401 }
            );
        }

        //Generate JWT token
        const token = jwt.sign(
            { role: "ADMIN", email },
            process.env.JWT_SECRET!,
            { expiresIn: "1d"}
        );

        //Create HTTP-Only Cookie
        const response = NextResponse.json({
            success: true,
            message: "Authenticated"
        });
        response.cookies.set({
            name:"admin_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            // secure: true,
            sameSite: "strict",
            path:"/",
            maxAge: 60 * 60 * 24, //1 day
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            error: "Authentication failed"
        },{status: 500})
    }
}