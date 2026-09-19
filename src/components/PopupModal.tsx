"use client";
import { Globe, Mail, Phone, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative rounded-3xl max-w-2xl w-full p-6 animate-in fade-in zoom-in duration-300 overflow-hidden flex flex-col items-center text-white">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full transition-colors z-10 shadow-lg cursor-pointer"
        >
          <X size={14} />
        </button>

        {/* Small Heading */}
        <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4">
          We are starting new businesses
        </h3>

        {/* Image Section */}
        <div className="relative w-full h-auto min-h-[250px] mb-6 overflow-hidden rounded-2xl">
          <Image
            src="/images/Popup-Banner.png"
            alt="New Business Project"
            width={800}
            height={450}
            className="w-full h-full object-contain"
            priority
          />
        </div>

        {/* Call Now / Details Section */}
        <div className="w-full border-t border-gray-100 pt-6">
          {/* <h4 className="font-bold text-center mb-4 text-white">Contact at:</h4> */}

          <div className="flex flex-wrap justify-center gap-16 mb-6">
            {" "}
            
            <a
              href="tel:+919030048871"
              className="flex items-center gap-2 px-16 py- bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-colors text-base"
            >
              <Phone size={20} /> Call Now
            </a>
            <a
              href="mailto:rajendrakushwaha366@gmail.com"
             className="flex items-center gap-2 px-16 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-bold transition-colors text-base"
            >
             <Mail size={20} /> Email
    </a>
            <a
              href="https://www.radiatechfire.in"
              className="flex items-center gap-2 px-16 py-4 bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl hover:scale-105 text-white rounded-full font-bold transition-all duration-300 text-base"
            >
             <Globe size={20} /> Fire & Safety
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
