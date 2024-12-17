import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlLocationPin } from "react-icons/sl";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center p-2 bg-white text-black">
      <div className="font-genos">
        <p className="text-xl font-gajraj">FooFest</p>
      </div>
      <div className="flex-1">
        <Newsletter />
      </div>

      {/* Ikoner */}
      <div className="flex space-x-4">
        <SlSocialInstagram size={24} />
        <SlSocialLinkedin size={24} />
        <SlLocationPin size={24} />
      </div>
    </footer>
  );
}
