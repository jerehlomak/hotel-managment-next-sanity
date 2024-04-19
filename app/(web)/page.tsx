import { getFeaturedRoom } from "@/libs/apis";
import { HeroSection, PageSearch, Gallery, NewsLetter, FeaturedRooms } from "../components";

const Home = async () => {
  const featuredRoom = await getFeaturedRoom()

  return (
    <>
      <HeroSection />
      <PageSearch />
      <FeaturedRooms featuredRoom={featuredRoom} />
      <Gallery />
      <NewsLetter />
    </>
  );
}

export default Home
