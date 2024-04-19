import axios from "axios";
import { FC } from "react"
import useSWR from "swr";

import { Review } from "@/app/models/review";
import Image from "next/image";
import Rating from "../Rating/Rating";

type Props = {
    roomId: string;
}

const RoomReview: FC<Props> = ({ roomId }) => {

    const fetchRoomReviews = async () => {
        const { data } = await axios.get<Review[]>(`/api/room-review/${roomId}`)
        
        return data
    }

    const { data: roomReviews, isLoading, error } = useSWR('/api/room-reviews', fetchRoomReviews)
    // error handler
    if (error) throw new Error("Cannot fetch data");
    if (typeof roomReviews === "undefined" && !isLoading)
        throw new Error("Cannot fetch data");

    
  return (
    <>
        {roomReviews && roomReviews.map(review => (
            <div key={review._id} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg space-y-2">
                <div className="font-semibold mb-2 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full overflow-hidden">
                        <Image 
                            src={review.user.image}
                            alt={review.user.name}
                            className="img scale-animation rounded-full"
                            width={56}
                            height={56}
                        />
                    </div>                  
                    <p>{review.user.name}</p>
                    
                </div>
                <div className="flex items-start gap-2 text-tertiary-light text-lg">
                    <Rating rating={review.userRating} />
                </div>
                <p>{review.text}</p>
            </div>
        ))}
    </>
  )
}

export default RoomReview