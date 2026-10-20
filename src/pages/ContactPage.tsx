import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Send, CheckCircle2, MessageCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { ASSIANO_LOGO } from '../data/products';

interface ContactPageProps {
  phoneHotline?: string;
  whatsappNumber?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  phoneHotline = '+880 1712-345678',
  whatsappNumber = '+880 1712-345678',
}) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [subject, setSubject] = React.useState('Order Inquiry');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'What are the delivery charges inside and outside Dhaka?',
      a: 'We deliver nationwide across all 64 districts in Bangladesh. Home delivery inside Dhaka City is ৳ 60 (takes 24 to 48 hours). Delivery outside Dhaka is ৳ 120 (takes 2 to 3 business days via Steadfast or Pathao Express).'
    },
    {
      q: 'How does Cash on Delivery (COD) work?',
      a: 'We offer hassle-free Cash on Delivery across Bangladesh. You pay the delivery rider upon inspecting the sealed parcel at your doorstep. No advance deposit is needed for standard catalog items.'
    },
    {
      q: 'Can I exchange a size if it does not fit?',
      a: 'Yes! Assiano provides an easy 7-day exchange window. Simply contact our WhatsApp or hotline within 7 days of receiving the package in its original unworn condition with tags attached.'
    },
    {
      q: 'Do you offer custom alterations for abayas and kurtis?',
      a: 'Yes, our Dhaka atelier offers complimentary sleeve and length tailoring adjustments for pre-ordered abayas. Message us directly on WhatsApp with your exact length requirement.'
    }
  ];

  return (
    <div className="bg-[#FAFAF8] text-[#141416] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <span className="text-xs uppercase tracking-[0.28em] text-[#E10613] font-semibold block">
            Direct Concierge
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif text-[#141416] tracking-tight">
            Connect with Assiano Atelier
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl mx-auto">
            Whether you need sizing advice, wholesale inquiries, or live order assistance, our Dhaka team is here to assist you.
          </p>
        </div>

        {/* 3 Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* WhatsApp Direct */}
          <a
            href={`https://wa.me/${cleanWaNumber}?text=Hello%20Assiano,%20I%20have%20an%20inquiry%20regarding%20your%20collection`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white border border-neutral-200 rounded-sm hover:border-[#25D366] transition-all hover:shadow-md flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-4">
                <MessageCircle className="w-6 h-6 fill-[#25D366]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-[#25D366] transition-colors">
                WhatsApp Live Styling
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Chat directly with our Dhaka stylists for dress recommendations and live stock checks.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-neutral-800">{whatsappNumber}</span>
              <span className="text-xs font-bold text-[#25D366]">Chat Now →</span>
            </div>
          </a>

          {/* Facebook Official Page */}
          <a
            href="https://www.facebook.com/share/1CAKiLxa7D/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white border border-neutral-200 rounded-sm hover:border-[#1877F2] transition-all hover:shadow-md flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] mb-4">
                <ExternalLink className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-[#1877F2] transition-colors">
                Official Facebook Page
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Follow our official page for live video shows, new arrival announcements, and customer reviews.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-800">@AssianoOfficial</span>
              <span className="text-xs font-bold text-[#1877F2]">Visit Page →</span>
            </div>
          </a>

          {/* Customer Hotline & Email */}
          <div className="p-6 bg-white border border-neutral-200 rounded-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#E10613]/10 flex items-center justify-center text-[#E10613] mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-neutral-900">
                Hotline & Support
              </h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Available daily from 10:00 AM to 10:00 PM for order bookings and delivery questions.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100 space-y-1.5 text-xs">
              <a href={`tel:${phoneHotline.replace(/[^0-9+]/g, '')}`} className="font-mono font-semibold text-neutral-900 hover:text-[#E10613] block">
                {phoneHotline}
              </a>
              <a href="mailto:assiano.official@gmail.com" className="text-neutral-500 hover:text-[#E10613] block truncate">
                assiano.official@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* 2-Column: Inquiry Form + Atelier Studio Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-neutral-200 rounded-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E10613] block mb-1">
              Send a Direct Message
            </span>
            <h2 className="text-2xl font-serif text-[#141416] mb-6">
              How Can We Help You?
            </h2>

            {submitted ? (
              <div className="py-10 text-center space-y-3 bg-emerald-50/70 border border-emerald-200 rounded-xs p-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-emerald-950">
                  Message Dispatched to Assiano Concierge
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. A customer representative will contact you at <strong>{phone}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-3 px-5 py-2 bg-emerald-800 text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-emerald-900 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nusrat Jahan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black cursor-pointer"
                  >
                    <option value="Order Inquiry">Order Inquiry & Tracking</option>
                    <option value="Custom Alterations">Custom Abaya Alterations / Sizing</option>
                    <option value="Exchange Request">7-Day Size Exchange</option>
                    <option value="Wholesale">Wholesale & Boutique Orders</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about the attire code or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#141416] hover:bg-[#E10613] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Atelier</span>
                </button>
              </form>
            )}
          </div>

          {/* Atelier Studio Details */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-neutral-200 rounded-sm space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E10613] block mb-1">
                Dhaka Studio
              </span>
              <h2 className="text-2xl font-serif text-[#141416]">
                Assiano Central Atelier
              </h2>
            </div>

            <div className="space-y-4 text-xs text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E10613] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-sans">Showroom & Distribution Center</strong>
                  <span>Gulshan Avenue / Banani Hub, Dhaka, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#E10613] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-sans">Operating Hours</strong>
                  <span>Saturday – Thursday: 10:00 AM – 10:00 PM</span>
                  <span className="block text-neutral-400">Friday: 2:30 PM – 10:00 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#E10613] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-sans">Official Communications</strong>
                  <span>assiano.official@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <span className="text-xs font-semibold text-neutral-800 block mb-2">
                Nationwide Delivery Partners
              </span>
              <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200 space-y-1 text-[11px] text-neutral-600">
                <p>• <strong>Dhaka City:</strong> Delivered within 24-48 hours (৳ 60)</p>
                <p>• <strong>Outside Dhaka:</strong> Dispatched via Steadfast / Pathao within 48-72 hours (৳ 120)</p>
                <p>• <strong>Cash on Delivery:</strong> Available across all 64 districts</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E10613] font-semibold block mb-1">
              Help Center
            </span>
            <h3 className="text-2xl font-serif text-[#141416]">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-xs overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-neutral-900 hover:text-[#E10613] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
