import React from 'react';
import { MessageCircle, Phone, Send, X, Headphones } from 'lucide-react';

interface FloatingContactSpeedDialProps {
  phoneHotline?: string;
  whatsappNumber?: string;
  facebookUrl?: string;
}

export const FloatingContactSpeedDial: React.FC<FloatingContactSpeedDialProps> = ({
  phoneHotline = '+880 1712-345678',
  whatsappNumber = '+880 1712-345678',
  facebookUrl = 'https://www.facebook.com/share/1CAKiLxa7D/',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const cleanPhone = phoneHotline.replace(/[^0-9+]/g, '');
  const cleanWa = whatsappNumber.replace(/[^0-9]/g, '');

  // Close when clicked outside
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    // Only auto-open on hover for desktop (screens with hover pointer)
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(false);
    }
  };

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <aside
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-18 lg:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end select-none pointer-events-auto"
      aria-label="Contact options"
    >
      {/* 3 Rising Speed-Dial Circular Option Buttons */}
      <div
        className={`flex flex-col items-end space-y-3 mb-3 transition-all duration-300 ease-out origin-bottom ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-75 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Option 1 (Top): Phone Call Option (কল অপশন) */}
        <div className="flex items-center gap-2.5 group">
          <span className="bg-white/95 text-neutral-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md border border-neutral-200/90 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
            সরাসরি কল (Call: {phoneHotline.replace('+880 ', '0')})
          </span>
          <a
            href={`tel:${cleanPhone}`}
            aria-label="Direct Phone Call"
            className="w-12 h-12 rounded-full bg-[#141416] hover:bg-[#E10613] text-white flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 ring-2 ring-white cursor-pointer"
          >
            <Phone className="w-5 h-5 fill-current" />
          </a>
        </div>

        {/* Option 2 (Middle): Facebook Messenger (মেসেঞ্জার ফেসবুকের) */}
        <div className="flex items-center gap-2.5 group">
          <span className="bg-white/95 text-neutral-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md border border-neutral-200/90 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
            ফেসবুক মেসেঞ্জার (Messenger)
          </span>
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on Facebook Messenger"
            className="w-12 h-12 rounded-full bg-[#0084FF] hover:bg-[#0070dc] text-white flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 ring-2 ring-white cursor-pointer"
          >
            <Send className="w-5 h-5 fill-current -rotate-45" />
          </a>
        </div>

        {/* Option 3 (Bottom): WhatsApp (হোয়াটসঅ্যাপ) */}
        <div className="flex items-center gap-2.5 group">
          <span className="bg-white/95 text-neutral-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md border border-neutral-200/90 whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
            হোয়াটসঅ্যাপে অর্ডার (WhatsApp)
          </span>
          <a
            href={`https://wa.me/${cleanWa}?text=Hello%20Assiano,%20I%20would%20like%20to%20place%20an%20order`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
            className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 ring-2 ring-white cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 fill-white" />
          </a>
        </div>
      </div>

      {/* Main Trigger Floating Action Button */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close contact menu' : 'Open WhatsApp, Messenger & Call options'}
        aria-expanded={isOpen}
        className={`group relative flex items-center justify-center transition-all duration-300 rounded-full shadow-2xl cursor-pointer ring-4 ring-black/5 active:scale-95 ${
          isOpen
            ? 'w-13 h-13 sm:w-14 sm:h-14 bg-neutral-900 text-white rotate-90'
            : 'h-12 sm:h-13 px-4 sm:px-4.5 bg-[#25D366] hover:bg-[#20ba5a] text-white gap-2'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            {/* Live active pulsing indicator dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <MessageCircle className="w-5 h-5 fill-white shrink-0" />
            <span className="text-xs font-bold tracking-wide whitespace-nowrap hidden sm:inline">
              যোগাযোগ ও অর্ডার
            </span>
            <span className="text-xs font-bold tracking-wide whitespace-nowrap sm:hidden">
              অর্ডার
            </span>
          </>
        )}
      </button>
    </aside>
  );
};
