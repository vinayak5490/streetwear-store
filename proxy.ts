//middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest){
    const token = req.cookies.get("admin_token")?.value;
    const { pathname } = req.nextUrl;

    //1. Allow unauthenticated request to /admin/login
    if(pathname === "/admin/login"){
        if(token){
            try {
                const secret = new TextEncoder().encode(process.env.JWT_SECRET);
                await jwtVerify(token, secret);
                return NextResponse.redirect(new URL("/admin", req.url));
            } catch (error) {
                //Invalid token, proceed to login page
            }
        }
        return NextResponse.next();
    }

    //2. Protect all other /admin routes
    if(pathname.startsWith("/admin")){
        if(!token){
            return NextResponse.redirect(new URL("/admin/login", req.url));
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (error) {
            //Invalid/expired token -> redirect to login
            const response = NextResponse.redirect(new URL("/admin/login", req.url));
            response.cookies.delete("admin_token");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matches: ["/admin/:path"],
}