// app/api/auth/signup/route.js
import { connectDB } from "@/lib/connectDB";
import User from "@/lib/UserModel";

import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export async function POST(req) {
  const { email, password } = await req.json();

  const db = await connectDB();


  try {
		const db = await connectDB();




		const user = await User.findOne({ email: email });
		if (!user) {
			return new Response(JSON.stringify({ message: "Failed to authorize!", success: false }), { status: 400 });
		}

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
		return new Response(JSON.stringify({ message: "Failed to authorize!", success: false }), { status: 400 });
    }

		const secret = new TextEncoder().encode(process.env.SECRET_JWT);
		const token = await new SignJWT({ email: user.email })
			.setProtectedHeader({ alg: "HS256" }) // Set the algorithm (HS256 in this case)
			.setIssuedAt() // Set the issued at timestamp
			.setExpirationTime("7d") // Set the expiration time (e.g., 1 hour)
			.sign(secret);


		// cookies().set("token", token, {
		// 	httpOnly: true,
		// 	secure: true,
		// 	expires: 60 * 60 * 24 * 30,
		// 	sameSite: "lax",
		// 	path: "/",
		// });

        cookies().set("token", token)
		
		return new Response(JSON.stringify({ message: "Authorized!", success: true }), { status: 200 });

	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: "Failed to authorize!", success: false }), { status: 400 });
	}
}
