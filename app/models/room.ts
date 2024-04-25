type CoverImage = {
    url: string;
}

export type Image = {
    _key: string;
    url: string;
}

type Amenity = {
    _key: string;
    amenity: string;
    icon: string;
}

type Slug = {
    _type: string;
    current: string;
}

export type Room  = {
    _id: string;
    coverImage: CoverImage;
    description: string;
    dimension: string;
    discount: number;
    images: Image[];
    isBooked: boolean;
    isFeatured: boolean;
    name: string;
    numberOfBeds: number;
    offeredAmenities: Amenity[];
    price: number;
    slug: Slug;
    specialNote: string;
    type: string;
}

export type CreateBookingDTO = {
    user: string;
    hotelRoom: string;
    checkInDate: string;
    checkOutDate: string;
    numberOfDays: number;
    adults: number;
    childrens: number;
    totalPrice: number;
    discount: number;
}

export type MetaDataDTO = {
    checkInDate: string,
    checkOutDate: string,
    adults: string,
    children: string,
    numberOfDays: string,
    hotelRoom: string,
    totalPrice: string,
    user: string,
    discount: string,
}

