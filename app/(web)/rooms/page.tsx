"use client";

import Search from "@/app/components/PageSearch/Search";
import RoomCard from "@/app/components/RoomCard/RoomCard";
import { Room } from "@/app/models/room";
import { getRooms } from "@/libs/apis";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get("searchQuery");
    const roomType = searchParams.get("roomType");

    if (roomType) setRoomTypeFilter(roomType);
    if (searchQuery) setSearchQuery(searchQuery);
  }, [searchParams]);

  async function fetchData() {
    return getRooms();
  }
  //get data using swr
  const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);

  // error handler
  if (error) throw new Error("Cannot fetch data");
  if (typeof data === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  // a function that will filter our rooms based on queries
  const filterRooms = (rooms: Room[]) => {
    return rooms.filter((room) => {
      // apply room type filter
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false
      }

      // apply search query filter
      if (searchQuery && !room.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true
    });
  };

  const filteredRooms = filterRooms(data || [])


  return (
    <div className="container mx-auto pt-10">
        <Search 
            roomTypeFilter={roomTypeFilter}
            searchQuery={searchQuery}
            setRoomTypeFilter={setRoomTypeFilter}
            setSearchQuery={setSearchQuery}
        />

        <div className="grid mt-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
            {filteredRooms.map(room => (
                <RoomCard key={room._id} room={room} />
            ))}
        </div>
    </div>
  )
};

export default Rooms;
