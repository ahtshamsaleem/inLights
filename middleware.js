import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("token");

  console.log(token)

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }


  try {
    const secret = new TextEncoder().encode(process.env.SECRET_JWT);
    const isTokenValid = await jwtVerify(token.value, secret);

    if (!isTokenValid) {
      return NextResponse.redirect(new URL("/login", request.url));
    }


  } catch (error) {
      console.log(error)
  }








}




export const config = {
  matcher: ["/ig-posts/:path*", "/"]
};


