// app/api/auth/signup/route.js
import { connectDB } from "@/lib/connectDB";
import User from "@/lib/UserModel";

import bcrypt from "bcrypt"

export async function POST(req) {
  const { email, password, name } = await req.json();

  const db = await connectDB();


  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists!" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hashedPassword,
    name
  })

  const res = await user.save()

  return new Response(JSON.stringify({ message: "User registered successfully!" }), { status: 201 });
}
