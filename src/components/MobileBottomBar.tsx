import React from 'react';
import { Home, Grid, Phone, ShoppingBag } from 'lucide-react';
import { PageType, CategoryType } from '../types';

interface MobileBottomBarProps {
  activePage: PageType;
  onNavigate: (page: PageType, category?: CategoryType) => void;
  cartCount: number;
  phoneHotline?: string;
  whatsappNumber?: string;
  facebookUrl?: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  phoneHotline = '+880 1897-684273',
  whatsappNumber = '+880 1897-684273',
  facebookUrl = 'https://www.facebook.com/share/1CAKiLxa7D/',
}) => {
  const cleanPhone = phoneHotline.replace(/[^0-9+]/g, '');
  const cleanWa = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] lg:hidden"
      style={{
        paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom, 0px))',
      }}
    >
      {/* 6 Bottom Action Tabs: Home, Category, Call, WhatsApp, Messenger, Cart */}
      <nav className="grid grid-cols-6 items-center py-1.5 px-0.5 text-center text-[9.5px] text-neutral-600 font-medium">
        
        {/* 1. Home */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className={`flex flex-col items-center justify-center py-1 gap-0.5 transition-colors cursor-pointer ${
            activePage === 'home' ? 'text-[#E10613] font-bold' : 'hover:text-black'
          }`}
          title="Home"
        >
          <Home className="w-4.5 h-4.5 stroke-[1.8]" />
          <span className="leading-none tracking-tight">Home</span>
        </a>

        {/* 2. Category */}
        <a
          href="/shop"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('shop', 'all');
          }}
          className={`flex flex-col items-center justify-center py-1 gap-0.5 transition-colors cursor-pointer ${
            activePage === 'shop' ? 'text-[#E10613] font-bold' : 'hover:text-black'
          }`}
          title="Categories"
        >
          <Grid className="w-4.5 h-4.5 stroke-[1.8]" />
          <span className="leading-none tracking-tight">Category</span>
        </a>

        {/* 3. Call Hotline (Direct phone dialer) */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center py-1 gap-0.5 text-neutral-800 hover:text-[#E10613] active:text-[#E10613] transition-colors cursor-pointer group"
          title={`Call Hotline ${phoneHotline}`}
          aria-label="Call Hotline"
        >
          <div className="w-4.5 h-4.5 flex items-center justify-center transition-transform group-active:scale-90">
            <Phone className="w-4.5 h-4.5 stroke-[2.2] text-[#E10613]" />
          </div>
          <span className="leading-none tracking-tight font-semibold text-[#141416] group-hover:text-[#E10613]">Call</span>
        </a>

        {/* 4. WhatsApp (Direct WhatsApp chat) */}
        <a
          href={`https://wa.me/${cleanWa}?text=Hello%20Assiano,%20I%20would%20like%20to%20place%20an%20order`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 gap-0.5 text-neutral-800 hover:text-[#25D366] transition-colors cursor-pointer group"
          title={`WhatsApp ${whatsappNumber}`}
          aria-label="WhatsApp Order"
        >
          <div className="w-4.5 h-4.5 flex items-center justify-center transition-transform group-active:scale-90">
            {/* Authentic WhatsApp SVG */}
            <svg
              viewBox="0 0 24 24"
              className="w-4.5 h-4.5 fill-[#25D366]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.188 8.188 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.182 8.182 0 012.41 5.83c0 4.54-3.7 8.23-8.25 8.23zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.18-.47-.3z" />
            </svg>
          </div>
          <span className="leading-none tracking-tight font-medium text-neutral-700 group-hover:text-[#25D366]">WhatsApp</span>
        </a>

        {/* 5. Messenger (Direct Facebook Messenger chat) */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 gap-0.5 text-neutral-800 hover:text-[#0084FF] transition-colors cursor-pointer group"
          title="Facebook Messenger"
          aria-label="Facebook Messenger"
        >
          <div className="w-4.5 h-4.5 flex items-center justify-center transition-transform group-active:scale-90">
            {/* Authentic Messenger SVG */}
            <svg
              viewBox="0 0 24 24"
              className="w-4.5 h-4.5 fill-[#0084FF]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.15.16.14.26.35.26.57l-.07 1.78c-.03.73.74 1.22 1.38.87l1.99-1.09c.17-.09.37-.12.56-.07.88.24 1.8.37 2.74.37 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1.19 13.06l-2.61-2.79c-.19-.2-.5-.2-.69 0l-3.57 2.72c-.4.31-.91-.17-.67-.62l2.91-5.46c.18-.34.66-.35.86-.02l2.58 2.75c.19.2.5.2.69 0l3.63-2.73c.4-.3.91.17.67.62l-2.91 5.49c-.18.34-.66.36-.89.04z" />
            </svg>
          </div>
          <span className="leading-none tracking-tight font-medium text-neutral-700 group-hover:text-[#0084FF]">Messenger</span>
        </a>

        {/* 6. Cart */}
        <a
          href="/cart"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('cart');
          }}
          className={`relative flex flex-col items-center justify-center py-1 gap-0.5 transition-colors cursor-pointer ${
            activePage === 'cart' ? 'text-[#E10613] font-bold' : 'hover:text-black'
          }`}
          title="Shopping Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#E10613] text-white text-[8.5px] font-bold min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center shadow-xs font-mono">
                {cartCount}
              </span>
            )}
          </div>
          <span className="leading-none tracking-tight">Cart</span>
        </a>

      </nav>
    </div>
  );
};
