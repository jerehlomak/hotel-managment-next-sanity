import { checkReviewExists, createReview, getUserData, updateReview } from "@/libs/apis";
import { authOptions } from "@/libs/auth";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Authentication required", { status: 500 })
    }

    const userId = session.user.id

    try {
        const data = await getUserData(userId)
        return NextResponse.json(data, { status: 200, statusText: "Successful" })
    } catch (error) {
        return new NextResponse("Unable to fetch data" , { status: 400 })
    }
}

export async function POST(req: Request, res: Response) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse("Authentication required", { status: 500 })
    }

    const { roomId, reviewText, ratingValue } = await req.json()
    if (!roomId || !reviewText || !ratingValue) {
        return new NextResponse("All fields are required", { status: 400 })
    }

    const userId = session.user.id;

    try {
        // check if a user has created a review already
        const alreadyExists = await checkReviewExists(userId, roomId)
        let data;

        if (alreadyExists) {
            data = await updateReview({ reviewId: alreadyExists.id, reviewText, userRating: ratingValue })
        } else {
            data = await createReview({ 
                reviewText,
                userId,
                userRating: ratingValue,
                hotelRoomId: roomId,
             })
        }
        console.log(data)
        return NextResponse.json(data, { status: 200, statusText: 'Successful' })

    } catch (error) {
        console.log("Error uploading", error)
        return new NextResponse("Unable to create review" , { status: 400 })
    }

}