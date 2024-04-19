import { groq } from "next-sanity"

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured ==true][0] {
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage,
}`

export const getRoomsQuery = groq`*[_type == "hotelRoom"] {
    _id,
    coverImage,
    description,
    dimension,
    images,
    isFeatured,
    name,
    price,
    slug,
    type,
}`

export const getRoomQuery = groq`*[_type == "hotelRoom" && slug.current == $slug][0] {
    _id,
    coverImage,
    description,
    dimension,
    images,
    isFeatured,
    name,
    price,
    slug,
    type,
    discount,
    isBooked,
    numberOfBeds,
    offeredAmenities,
    specialNote,
}`

export const getUserBookingQuery = groq`*[_type == "booking" && user._ref == $userId] {
    _id,
    hotelRoom -> {
        _id,
        name,
        slug,
        price,
    },
    checkInDate,
    checkOutDate,
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount,
}`

export const getUserDataQuery = groq`*[_type == "user" && _id == $userId][0] {
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image,
}`

export const getRoomReviewsQuery = groq`*[_type == "review" &&  hotelRoom._ref == $roomId] {
    _id,
    _createdAt,
    user -> {
        name,
        image,
    },
    userRating,
    text,
}`