import ClientComponent from "./ClientComponent";
import { section1, heading1 } from "./ServerComponent";

const HeroSection = () => {
  return (
    <ClientComponent heading1={heading1} section1={section1} />
  );
};

export default HeroSection;
