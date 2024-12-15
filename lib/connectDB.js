import mongoose from "mongoose";



export async function connectDB() {
   try {
    const db = await mongoose.connect(process.env.MONGO_URI)
    console.log('connected to mongodb')
    return db;
   } catch (error) {
    console.log(error)
   }
}


