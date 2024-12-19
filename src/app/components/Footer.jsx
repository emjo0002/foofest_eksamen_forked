import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlLocationPin } from "react-icons/sl";
import { FaSpotify } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center dynamic-bg text-white p-8 gap-8">
      <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-6xl gap-12">
        {/* Newsletter Section */}
        <div className="flex-1">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4">
            Newsletter <br /> Signup
          </h2>
          <div className="flex items-center gap-4">
            <input type="email" placeholder="Your Email Address" className="w-full border-b-2 border-white bg-transparent outline-none placeholder-white text-lg py-2" />
            <button className="text-white text-3xl hover:text-blue-700">&rarr;</button>
          </div>
          <div className="flex items-center gap-6 mt-8">
            <a href="#" className="hover:text-blue-700">
              <SlSocialInstagram size={28} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <SlSocialLinkedin size={28} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <SlLocationPin size={28} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <FaSpotify size={28} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <IoPerson size={28} />
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex-1">
          <iframe title="Google Maps" className="w-full h-48 rounded-md border-0" src="https://maps.google.com/maps?q=FC%20Nordsj%C3%A6lland%20Stadium&t=&z=13&ie=UTF8&iwloc=&output=embed" allowFullScreen></iframe>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-gray-400 text-sm">
        <p>&copy; Foofest 2024</p>
      </div>
    </footer>
  );
}
