import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlLocationPin } from "react-icons/sl";
import { FaSpotify } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="flex flex-col md:flex-row items-start justify-between w-full max-w-7xl mx-auto px-4 gap-8">
        {/* Newsletter Section */}
        <div className="flex-1">
          <Newsletter />
          <div className="flex items-center gap-4 mt-6">
            <a href="#" className="hover:text-blue-700">
              <SlSocialInstagram size={24} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <SlSocialLinkedin size={24} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <SlLocationPin size={24} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <FaSpotify size={24} />
            </a>
            <a href="#" className="hover:text-blue-700">
              <IoPerson size={24} />
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex-1 flex flex-col items-end">
          <iframe title="Google Maps" className="w-full h-40 rounded-md border-0" src="https://maps.google.com/maps?q=FC%20Nordsj%C3%A6lland%20Stadium&t=&z=13&ie=UTF8&iwloc=&output=embed" allowFullScreen></iframe>
          <p className="text-white mt-2 text-sm">Find vej til os</p>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-gray-400 text-xs text-center">
        <p>&copy; Foofest 2024</p>
      </div>
    </footer>
  );
}
