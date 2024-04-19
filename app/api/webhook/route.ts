import { createBooking, updateHotelRoom } from "@/libs/apis";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ,${error.message}`, {
      status: 500,
    });
  }

  // load events
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;

      // create a booking
      const {
        //@ts-ignore
        metadata: {
          checkInDate,
          checkOutDate,
          adults,
          children,
          numberOfDays,
          hotelRoom,
          totalPrice,
          user,
          discount,
        },
      } = session;

      await createBooking({
        checkInDate,
        checkOutDate,
        adults: Number(adults),
        children: Number(children),
        numberOfDays: Number(numberOfDays),
        hotelRoom,
        totalPrice: Number(totalPrice),
        user,
        discount: Number(discount),
      });

      // update hotel room
      await updateHotelRoom(hotelRoom)

      return NextResponse.json("Booking successful", {
        status: 200,
        statusText: "Booking Successful",
      });

      defualt: console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}
