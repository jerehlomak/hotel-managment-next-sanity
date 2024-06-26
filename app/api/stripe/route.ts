import { getRoom } from "@/libs/apis";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { MetaDataDTO } from "@/app/models/room";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

type RequestData = {
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  childrens: number;
  numberOfDays: number;
  hotelRoomSlug: string;
};

export async function POST(req: Request, res: Response) {
  const {
    checkInDate,
    checkOutDate,
    adults,
    childrens,
    numberOfDays,
    hotelRoomSlug,
  }: RequestData = await req.json();

  if (
    !checkInDate ||
    !checkOutDate ||
    !adults ||
    !numberOfDays ||
    !hotelRoomSlug
  ) {
    return new NextResponse("Please all fields are required", { status: 400 });
  }

  const origin = req.headers.get("origin");

  const session = await getServerSession(authOptions);
 
  if (!session) {
    return new NextResponse("Authentication required", { status: 401 });
  }

  const userId = session.user.id;
  const formattedCheckOutDate = checkOutDate.split("T")[0];
  const formattedCheckInDate = checkInDate.split("T")[0];

  try {
    const room = await getRoom(hotelRoomSlug);
    const discountPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountPrice * numberOfDays;

    // stripe payment
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: room.name,
              images: room.images.map((image) => image.url),
            },
            unit_amount: parseInt((totalPrice * 100).toString()),
          },
        },
      ],
      payment_method_types: ["card"],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        adults,
        childrens,
        numberOfDays,
        hotelRoom: room._id,
        totalPrice,
        user: userId,
        discount: room.discount,
      },
    });

    return NextResponse.json(stripeSession, {
      status: 200,
      statusText: "Payment session created",
    });
  } catch (error: any) {
    console.log("Payment failed", error);
    return new NextResponse(error, { status: 500 });
  }
}
