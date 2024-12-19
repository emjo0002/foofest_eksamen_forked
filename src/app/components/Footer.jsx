import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlLocationPin } from "react-icons/sl";
import { FaSpotify } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center bg-blue-950 text-white p-8 gap-6">
      <Newsletter />

      <p className="text-center max-w-md text-gray-300">Skriv dig op til vores nyhedsbrev, og bliv en del af vores fælleskab, hvor du ikke går glip af nyheder, fede events, særlige goder. Vi glæder os til at vise dig hvad Foofest 2024 byder på!</p>

      <div className="flex space-x-6">
        <SlSocialInstagram size={28} />
        <SlSocialLinkedin size={28} />
        <SlLocationPin size={28} />
        <FaSpotify size={28} />
        <IoPerson size={28} />
      </div>

      <div className="mt-4 text-gray-400 text-sm">
        <p>&copy; Foofest 2024</p>
      </div>
    </footer>
  );
}
