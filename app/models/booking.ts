export type Booking = {
    _id: string,
    hotelRoom : {
        _id: string,
        name: string,
        slug: {current: string},
        price: number,
    },
    checkInDate: string,
    checkOutDate: string,
    numberOfDays: number,
    adults: number,
    children: number,
    totalPrice: number,
    discount: number,
}

export type User = {
    _id: string,
    name: string,
    email: string,
    isAdmin: boolean,
    about: string | null,
    _createdAt: string,
    image: string,
}