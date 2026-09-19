"use client";

import { companyInfo } from "@/data/company";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hello Meera Enterprises! I'm interested in your furniture, home appliances, fans and lighting products. Could you please share the available products, prices and details?"
  );

  return (
    <a
      href={`https://wa.me/${companyInfo.contact.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
