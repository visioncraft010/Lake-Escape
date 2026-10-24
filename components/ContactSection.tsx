"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { MessageSquare, Calendar, Users, Home, Mail, User, Phone } from "lucide-react";
import { rooms } from "@/lib/data";
import { useLanguage } from "@/providers/LanguageProvider";

interface ContactFormInput {
  name: string;
  contact: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  room: string;
  notes: string;
}

export function ContactSection() {
  const { t, locale } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset } = useForm<ContactFormInput>({
    defaultValues: {
      guests: 2,
      room: "lake-view-suite"
    }
  });

  const onSubmit = (data: ContactFormInput) => {
    console.log("Enquiry Data:", data);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 6000);
  };

  const copy = {
    en: {
      eyebrow: "Reservations",
      title: "Plan your escape.",
      desc: "Connect with our concierge to secure dates, schedule private buyouts, or coordinate special culinary arrangements.",
      direct: "Direct Concierge",
      directSub: "Available 8:00 AM - 10:00 PM IST",
      email: "Email Enquiries",
      whatsapp: "Chat with Concierge",
      submit: "Submit Enquiry",
      successTitle: "Enquiry Received",
      successMsg: "Thank you for reaching out. Our concierge is checking availability and will connect with you via email or phone within the next 2 hours.",
      contactLabel: "Email / Phone",
      contactPlaceholder: "E.g. devendra@email.com or +91 99999 99999",
      specialRequests: "Special Requests",
      requestsPlaceholder: "Dietary requests, airport transits, celebrations...",
      entireBoat: "Entire Boat Buyout"
    },
    hi: {
      eyebrow: "आरक्षण",
      title: "अपनी यात्रा की योजना बनाएं।",
      desc: "तिथियों को सुरक्षित करने, निजी नौका बुकिंग, या विशेष भोजन व्यवस्था के लिए हमारे पटल से जुड़ें।",
      direct: "सीधे संपर्क करें",
      directSub: "सुबह 8:00 से रात 10:00 बजे तक उपलब्ध",
      email: "ईमेल द्वारा पूछताछ",
      whatsapp: "आरक्षण पटल से चैट करें",
      submit: "पूछताछ भेजें",
      successTitle: "पूछताछ प्राप्त हुई",
      successMsg: "हमसे संपर्क करने के लिए धन्यवाद। हमारा कार्यालय अगले 2 घंटों के भीतर आपसे ईमेल या फोन द्वारा संपर्क करेगा।",
      contactLabel: "ईमेल / फ़ोन नंबर",
      contactPlaceholder: "उदा. devendra@email.com या +91 99999 99999",
      specialRequests: "विशेष अनुरोध",
      requestsPlaceholder: "विशेष आहार, हवाई अड्डा ट्रांसफर, उत्सव या कोई अन्य व्यवस्था...",
      entireBoat: "पूरी नौका की बुकिंग"
    }
  };

  const c = locale === "hi" ? copy.hi : copy.en;

  return (
    <section id="contact" className="section bg-beige text-matte-black border-t border-matte-black/5 py-24 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1fr]">
          
          {/* Left Side: Contact Information */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="reveal">
              <p className="font-cursive text-3xl text-gold mb-1 select-none leading-none">{c.eyebrow}</p>
              <h2 className="font-serif text-3xl font-light tracking-wide text-matte-black md:text-4xl leading-tight">
                {c.title}
              </h2>
              <p className="mt-4 font-sans text-xs font-light text-matte-black/70 leading-relaxed">
                {c.desc}
              </p>
              <div className="h-px bg-matte-black/10 my-8" />
            </div>

            <div className="reveal space-y-6">
              <div>
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-gold">{c.direct}</p>
                <p className="font-serif text-lg font-light text-olive mt-1">+91 97629 85044</p>
                <p className="font-sans text-[10px] text-matte-black/45 mt-0.5">{c.directSub}</p>
              </div>

              <div>
                <p className="font-poppins text-[9px] font-bold uppercase tracking-widest text-gold">{c.email}</p>
                <p className="font-serif text-lg font-light text-olive mt-1">stay@lakeescape.in</p>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/919762985044?text=Hi%20Lake%20Escape,%20I%20would%20like%20to%20enquire%20about%20booking%20a%20stay."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white hover:bg-[#20ba5a] w-full sm:w-auto text-xs font-semibold tracking-wide py-3 px-6 shadow-sm transition-all"
                >
                  <MessageSquare size={15} className="fill-current" />
                  <span>{c.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Enquiry Form */}
          <div id="booking-form" className="reveal rounded-[8px] border border-matte-black/5 bg-cream/80 p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-3">
                <p className="font-serif text-2xl text-olive font-light">{c.successTitle}</p>
                <p className="font-sans text-xs font-light text-matte-black/60 leading-relaxed max-w-sm">
                  {c.successMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/60 flex items-center gap-1.5">
                    <User size={11} className="text-olive" /> {t.booking.name}
                  </label>
                  <input
                    type="text"
                    required
                    {...register("name")}
                    placeholder={locale === "hi" ? "उदा. देवेन्द्र सिंह" : "E.g. Devendra Singh"}
                    className="w-full rounded-[6px] border border-matte-black/10 bg-white/70 px-3 py-2.5 font-sans text-xs outline-none transition focus:border-olive focus:bg-white text-matte-black"
                  />
                </div>

                {/* Contact details */}
                <div className="space-y-1">
                  <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/60 flex items-center gap-1.5">
                    <Phone size={11} className="text-olive" /> {c.contactLabel}
                  </label>
                  <input
                    type="text"
                    required
                    {...register("contact")}
                    placeholder={c.contactPlaceholder}
                    className="w-full rounded-[6px] border border-matte-black/10 bg-white/70 px-3 py-2.5 font-sans text-xs outline-none transition focus:border-olive focus:bg-white text-matte-black"
                  />
                </div>

                {/* Dates */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/60 flex items-center gap-1.5">
                      <Calendar size={11} className="text-olive" /> {t.booking.checkin}
                    </label>
                    <input
                      type="date"
                      required
                      {...register("checkIn")}
                      className="w-full rounded-[6px] border border-matte-black/10 bg-white/70 px-3 py-2.5 font-sans text-xs outline-none focus:border-olive text-matte-black"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/60 flex items-center gap-1.5">
                      <Calendar size={11} className="text-olive" /> {t.booking.checkout}
                    </label>
                    <input
                      type="date"
                      required
                      {...register("checkOut")}
                      className="w-full rounded-[6px] border border-matte-black/10 bg-white/70 px-3 py-2.5 font-sans text-xs outline-none focus:border-olive text-matte-black"
                    />
                  </div>
                </div>

                {/* Guests & Room */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/60 flex items-center gap-1.5">
                      <Users size={11} className="text-olive" /> {t.booking.guests}
                    </label>
                    <select
                      {...register("guests")}
                      className="w-full rounded-[6px] border border-matte-black/10 bg-white/70 px-3 py-2.5 font-sans text-xs outline-none focus:border-olive text-matte-black appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((g) => (
                        <option key={g} value={g}>{g} {g === 1 ? t.booking.child : t.booking.guests}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/60 flex items-center gap-1.5">
                      <Home size={11} className="text-olive" /> {t.booking.cabin}
                    </label>
                    <select
                      {...register("room")}
                      className="w-full rounded-[6px] border border-matte-black/10 bg-white/70 px-3 py-2.5 font-sans text-xs outline-none focus:border-olive text-matte-black appearance-none"
                    >
                      {rooms.map((room) => (
                        <option key={room.slug} value={room.slug}>
                          {room.slug === "lake-view-suite" ? t.rooms.lakeViewSuite.name : ""}
                          {room.slug === "sunset-cabin" ? t.rooms.sunsetCabin.name : ""}
                          {room.slug === "mountain-deck-room" ? t.rooms.mountainDeck.name : ""}
                          {room.slug === "captains-residence" ? t.rooms.captainsResidence.name : ""}
                        </option>
                      ))}
                      <option value="entire-boat">{c.entireBoat}</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label className="font-poppins text-[9px] font-bold uppercase tracking-wider text-matte-black/60 flex items-center gap-1.5">
                    <Mail size={11} className="text-olive" /> {c.specialRequests}
                  </label>
                  <textarea
                    rows={2}
                    {...register("notes")}
                    placeholder={c.requestsPlaceholder}
                    className="w-full rounded-[6px] border border-matte-black/10 bg-white/70 px-3 py-2.5 font-sans text-xs outline-none focus:border-olive resize-none text-matte-black"
                  />
                </div>

                {/* Submit button */}
                <button 
                  type="submit" 
                  className="btn-brown w-full justify-center text-xs tracking-wider py-3 mt-2 shadow-md"
                >
                  {c.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
