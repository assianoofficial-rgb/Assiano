import React from 'react';
import { X, Headphones, Sparkles } from 'lucide-react';

interface FloatingContactSpeedDialProps {
  phoneHotline?: string;
  whatsappNumber?: string;
  facebookUrl?: string;
}

export const FloatingContactSpeedDial: React.FC<FloatingContactSpeedDialProps> = ({
  phoneHotline = '+880 1758-976677',
  whatsappNumber = '+880 1758-976677',
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
      aria-label="Contact channels"
    >
      {/* 3 Rising Pure Circular Buttons (Call, Messenger, WhatsApp) */}
      <div
        className={`flex flex-col items-center space-y-3 mb-3 transition-all duration-300 ease-out origin-bottom ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-75 translate-y-8 pointer-events-none'
        }`}
      >
        {/* 1. Direct Phone Call Option */}
        <a
          href={`tel:${cleanPhone}`}
          title={`Call ${phoneHotline}`}
          aria-label="Call Hotline"
          className="w-12 h-12 rounded-full bg-[#141416] hover:bg-[#E10613] text-white flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 ring-2 ring-white cursor-pointer"
        >
          {/* Official Phone Handset SVG */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>

        {/* 2. Official Facebook Messenger Option */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook Messenger"
          aria-label="Facebook Messenger"
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0064e0] via-[#0084ff] to-[#0099ff] hover:brightness-110 text-white flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 ring-2 ring-white cursor-pointer"
        >
          {/* Authentic Official Facebook Messenger SVG Logo */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.15.16.14.26.35.26.57l-.07 1.78c-.03.73.74 1.22 1.38.87l1.99-1.09c.17-.09.37-.12.56-.07.88.24 1.8.37 2.74.37 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.19 13.06l-2.61-2.79c-.19-.2-.5-.2-.69 0l-3.57 2.72c-.4.31-.91-.17-.67-.62l2.91-5.46c.18-.34.66-.35.86-.02l2.58 2.75c.19.2.5.2.69 0l3.63-2.73c.4-.3.91.17.67.62l-2.91 5.49c-.18.34-.66.36-.89.04z" />
          </svg>
        </a>

        {/* 3. Official WhatsApp Option */}
        <a
          href={`https://wa.me/${cleanWa}?text=Hello%20Assiano,%20I%20would%20like%20to%20place%20an%20order`}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp Order"
          aria-label="WhatsApp Order"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 ring-2 ring-white cursor-pointer"
        >
          {/* Authentic Official WhatsApp SVG Logo */}
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.182 8.182 0 012.41 5.83c0 4.54-3.7 8.23-8.25 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
          </svg>
        </a>
      </div>

      {/* Main Trigger Button: Luxury Concierge / Customer Support with Gentle Floating & Pulse Animation */}
      <div className={`relative ${!isOpen ? 'animate-float-gentle' : ''}`}>
        {/* Glowing Aura Ring when not open */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#E10613] via-[#ff4d58] to-[#141416] opacity-35 blur-sm animate-pulse pointer-events-none"></span>
        )}

        <button
          type="button"
          onClick={toggleOpen}
          aria-label={isOpen ? 'Close contact menu' : 'Open WhatsApp, Messenger & Call options'}
          aria-expanded={isOpen}
          title={isOpen ? 'Close' : 'Assiano Concierge & Support'}
          className={`group relative flex items-center justify-center transition-all duration-300 rounded-full shadow-2xl cursor-pointer ring-4 ring-black/5 active:scale-95 w-13 h-13 sm:w-14 sm:h-14 ${
            isOpen
              ? 'bg-neutral-900 text-white rotate-90 ring-white/20'
              : 'bg-gradient-to-tr from-[#141416] via-[#B8050F] to-[#E10613] hover:brightness-110 text-white hover:scale-105 ring-[#E10613]/20'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <div className="relative flex items-center justify-center">
              {/* Online Green Pulsing Indicator Dot */}
              <span className="absolute -top-2.5 -right-2.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white shadow-xs"></span>
              </span>

              {/* Headset / Concierge Support Icon */}
              <Headphones className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[2.2] text-white transition-transform group-hover:scale-110" />
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
