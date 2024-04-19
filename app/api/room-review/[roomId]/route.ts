import { getRoomReviews } from "@/libs/apis";
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { roomId: string } }) {
    const { roomId } = params

    try {
        const roomReviews = await getRoomReviews(roomId);

        return NextResponse.json(roomReviews, { status: 200, statusText: "Successful" })
    } catch (error) {
        console.log(error)
        return new NextResponse("Unable to fetch reviews", { status: 400 })
    }
}