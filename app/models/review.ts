export type UpdateReviewDTO = {
    reviewId: string;
    reviewText: string;
    userRating: number;
}

export type CreateReviewDTO = {
    hotelRoomId: string;
    reviewText: string;
    userRating: number;
    userId: string;
}

export type Review = {
    user: {
        name: string;
        image: string;
    },
    userRating: number;
    text: string;
    _createdAt: Date;
    _id: string;
}