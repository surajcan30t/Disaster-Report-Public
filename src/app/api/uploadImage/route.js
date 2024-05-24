import db from "@/utils/connect";
import Photo from "@/models/Photo";
import { NextResponse } from "next/server";


export async function POST(req, res) {
    await db();
    try {

        const body = await req.json();

        const nv = await Photo.create(body);

        return NextResponse.json(nv,{
            message:"Photo added successfully!"
        }, {
            status: 200
        })

    }catch (e) {
        console.log(e)
        return NextResponse.json(
            { message: "Server error, please try again!" },
            { status: 500 }
        )
    }
}
export const GET = async() =>{
    await db();
    try {
        const events = await Photo.find()
        return NextResponse.json(events,{success : true})
    } catch (error) {
        return NextResponse.json({message:"Something went wrong"},{success:false})
    }
}