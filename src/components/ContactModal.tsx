import React from 'react';
import { X, Phone, Mail, MapPin, ExternalLink, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { ASSIANO_LOGO } from '../data/products';
import { sendContactInquiry } from '../services/splitforms';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneHotline?: string;
  whatsappNumber?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  phoneHotline = '+880 1897-684273',
  whatsappNumber = '+880 1897-684273',
}) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setIsSubmitting(true);
    await sendContactInquiry({
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const cleanWaNumber = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-neutral-200 my-auto overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-3">
            <img src={ASSIANO_LOGO} alt="Assiano Logo" className="w-8 h-8 rounded-full" />
            <div>
              <h2 className="font-serif text-lg font-bold text-neutral-900">
                Contact Assiano Dhaka
              </h2>
              <span className="text-[11px] text-neutral-500 block">
                Atelier Customer Care & Styling Assistance
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close contact face"
            className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6">
          {/* Quick Connect Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${cleanWaNumber}?text=Hello%20Assiano,%20I%20would%20like%20to%20inquire%20about%20your%20collection`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xs hover:bg-emerald-50 transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-xs">
                  Instant
                </span>
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-neutral-900 block group-hover:text-emerald-700 transition-colors">
                  WhatsApp Chat
                </span>
                <span className="text-[11px] font-mono text-neutral-600 block mt-0.5">
                  {whatsappNumber}
                </span>
              </div>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${phoneHotline.replace(/[^0-9+]/g, '')}`}
              className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs hover:bg-neutral-100 transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <Phone className="w-5 h-5 text-[#E10613]" />
                <span className="text-[10px] uppercase font-bold text-neutral-700 bg-neutral-200 px-1.5 py-0.5 rounded-xs">
                  Hotline
                </span>
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-neutral-900 block group-hover:text-[#E10613] transition-colors">
                  Order by Phone
                </span>
                <span className="text-[11px] font-mono text-neutral-600 block mt-0.5">
                  {phoneHotline}
                </span>
              </div>
            </a>

            {/* Facebook Page */}
            <a
              href="https://www.facebook.com/share/1CAKiLxa7D/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-xs hover:bg-blue-50 transition-colors flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <ExternalLink className="w-5 h-5 text-[#1877F2]" />
                <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded-xs">
                  Official
                </span>
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-neutral-900 block group-hover:text-[#1877F2] transition-colors">
                  Facebook Page
                </span>
                <span className="text-[11px] text-neutral-600 block mt-0.5">
                  @AssianoOfficial
                </span>
              </div>
            </a>
          </div>

          {/* Location & Support Schedule */}
          <div className="p-4 bg-[#FAFAF8] border border-neutral-200 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#E10613] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block">Dhaka Central Atelier & Hub</strong>
                <span className="text-neutral-500">Fast courier dispatch across all 64 districts in Bangladesh</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#E10613] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-900 block">Official Email</strong>
                <span className="text-neutral-500">assiano.official@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Direct Message Form */}
          <div className="pt-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-3">
              Send an Inquiry or Order Assistance
            </span>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xs text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">
                  Message Sent to Assiano Team!
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. Our customer care representative will call you back at <strong>{phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-emerald-700 underline font-semibold cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Farhana Yasmin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 017XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Your Message / Desired Dress or Custom Sizing
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you're looking for or request custom abaya alterations..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 border border-neutral-300 text-neutral-700 text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#E10613] hover:bg-[#C80511] text-white text-xs font-bold uppercase tracking-wider rounded-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
