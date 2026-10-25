import React from 'react';
import {
  Home,
  Grid,
  Search,
  ShoppingBag,
  MessageCircle,
  Phone,
  MoreVertical,
  X,
  Send,
  ExternalLink,
  Bookmark,
  Check
} from 'lucide-react';
import { ASSIANO_LOGO } from '../data/products';
import { PageType, CategoryType } from '../types';

interface MobileBottomBarProps {
  activePage: PageType;
  onNavigate: (page: PageType, category?: CategoryType) => void;
  cartCount: number;
  onOpenSearch: () => void;
  onOpenTrack?: () => void;
  phoneHotline?: string;
  whatsappNumber?: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenSearch,
  onOpenTrack,
  phoneHotline = '+880 1712-345678',
  whatsappNumber = '+880 1712-345678',
}) => {
  const [isContactMenuOpen, setIsContactMenuOpen] = React.useState(false);
  const cleanPhone = phoneHotline.replace(/[^0-9+]/g, '');
  const cleanWa = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      {/* Contact Channels Popup / Sheet when the small icon is clicked */}
      {isContactMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-3 animate-in fade-in duration-200">
          <div
            className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-neutral-200 space-y-4 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <img
                  src={ASSIANO_LOGO}
                  alt="Assiano"
                  className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 leading-tight">Assiano Concierge</h4>
                  <p className="text-[11px] text-neutral-500">যোগাযোগ ও অর্ডার করার মাধ্যম বেছে নিন</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsContactMenuOpen(false)}
                className="p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors"
                aria-label="Close channels"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contact Options: WhatsApp, Messenger, Phone Call */}
            <div className="space-y-2.5">
              {/* 1. WhatsApp Option */}
              <a
                href={`https://wa.me/${cleanWa}?text=Hello%20Assiano,%20I%20would%20like%20to%20order%20or%20need%20assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsContactMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/80 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-950 block">হোয়াটসঅ্যাপ চ্যাট (WhatsApp)</span>
                    <span className="text-[11px] text-emerald-700">তাৎক্ষণিক অর্ডার ও সাইজ পরামর্শ</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* 2. Messenger Option */}
              <a
                href="https://www.facebook.com/share/1CAKiLxa7D/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsContactMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/80 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0084FF] text-white flex items-center justify-center shadow-xs">
                    <Send className="w-4 h-4 fill-current -rotate-45" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-950 block">ফেসবুক মেসেঞ্জার (Messenger)</span>
                    <span className="text-[11px] text-blue-700">অফিসিয়াল ফেসবুক পেজে মেসেজ দিন</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* 3. Direct Phone Call Option */}
              <a
                href={`tel:${cleanPhone}`}
                onClick={() => setIsContactMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                    <Phone className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-neutral-900 block">সরাসরি ফোন কল (Direct Call)</span>
                    <span className="text-[11px] text-neutral-500 font-mono">{phoneHotline}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <p className="text-[11px] text-center text-neutral-400 pt-1">
              সকাল ৯:০০ - রাত ১১:০০ পর্যন্ত কাস্টমার সার্ভিস চালু রয়েছে
            </p>
          </div>
        </div>
      )}

      {/* Fixed Bottom Container for Mobile (Navigation + Sticky Contact Bar) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden">
        {/* Tier 1: Mobile Navigation Tabs (Home, Category, Search, Cart, Wishlist/Track) */}
        <nav className="grid grid-cols-5 py-2 px-1 border-b border-neutral-100 text-[10px] text-neutral-500 font-medium">
          {/* Home */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className={`flex flex-col items-center justify-center py-0.5 gap-0.5 transition-colors cursor-pointer ${
              activePage === 'home' ? 'text-[#E10613] font-bold' : 'hover:text-black'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </a>

          {/* Category */}
          <a
            href="/shop"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('shop', 'all');
            }}
            className={`flex flex-col items-center justify-center py-0.5 gap-0.5 transition-colors cursor-pointer ${
              activePage === 'shop' ? 'text-[#E10613] font-bold' : 'hover:text-black'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Category</span>
          </a>

          {/* Search */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex flex-col items-center justify-center py-0.5 gap-0.5 hover:text-black transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>

          {/* Cart */}
          <a
            href="/cart"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('cart');
            }}
            className={`relative flex flex-col items-center justify-center py-0.5 gap-0.5 transition-colors cursor-pointer ${
              activePage === 'cart' ? 'text-[#E10613] font-bold' : 'hover:text-black'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#E10613] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </a>

          {/* Wishlist / Track */}
          <button
            type="button"
            onClick={() => {
              if (onOpenTrack) {
                onOpenTrack();
              } else {
                onNavigate('contact');
              }
            }}
            className="flex flex-col items-center justify-center py-0.5 gap-0.5 hover:text-black transition-colors cursor-pointer"
          >
            <Bookmark className="w-4 h-4" />
            <span>Wishlist</span>
          </button>
        </nav>

        {/* Tier 2: Sticky Brand Profile & WhatsApp / Options Action (Exact replica of user screenshot) */}
        <div className="flex items-center justify-between px-3 py-2 bg-white gap-2">
          {/* Brand Thumbnail & Hotline */}
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={ASSIANO_LOGO}
              alt="Assiano"
              className="w-9 h-9 rounded-full object-cover border border-neutral-200 shrink-0"
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-neutral-900 truncate leading-tight">
                Assiano
              </h4>
              <p className="text-[11px] text-neutral-500 font-mono truncate">
                {phoneHotline.replace('+880 ', '0')}
              </p>
            </div>
          </div>

          {/* WhatsApp Button + Small Icon button revealing WhatsApp, Messenger, and Calls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Direct WhatsApp Call-to-Action Button */}
            <a
              href={`https://wa.me/${cleanWa}?text=Hello%20Assiano,%20I%20would%20like%20to%20place%20an%20order`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#075E54] hover:bg-[#064e46] active:bg-[#053d37] text-white text-xs font-bold py-2 px-3.5 rounded-lg shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Small icon button that reveals options for WhatsApp, Messenger, and calls */}
            <button
              type="button"
              onClick={() => setIsContactMenuOpen(true)}
              aria-label="Open contact channels"
              title="Reveal WhatsApp, Messenger & Call options"
              className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-700 transition-colors cursor-pointer flex items-center justify-center"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
