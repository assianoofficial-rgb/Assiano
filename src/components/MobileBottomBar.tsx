import React from 'react';
import { Home, Grid, Search, ShoppingBag, Bookmark } from 'lucide-react';
import { PageType, CategoryType } from '../types';

interface MobileBottomBarProps {
  activePage: PageType;
  onNavigate: (page: PageType, category?: CategoryType) => void;
  cartCount: number;
  onOpenSearch: () => void;
  onOpenTrack?: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenSearch,
  onOpenTrack,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-[0_-2px_12px_rgba(0,0,0,0.05)] lg:hidden">
      {/* Mobile Navigation Tabs (Home, Category, Search, Cart, Wishlist/Track) */}
      <nav className="grid grid-cols-5 py-2 px-1 text-[10px] text-neutral-500 font-medium">
        {/* Home */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className={`flex flex-col items-center justify-center py-1 gap-0.5 transition-colors cursor-pointer ${
            activePage === 'home' ? 'text-[#E10613] font-bold' : 'hover:text-black'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </a>

        {/* Category */}
        <a
          href="/shop"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('shop', 'all');
          }}
          className={`flex flex-col items-center justify-center py-1 gap-0.5 transition-colors cursor-pointer ${
            activePage === 'shop' ? 'text-[#E10613] font-bold' : 'hover:text-black'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>Category</span>
        </a>

        {/* Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex flex-col items-center justify-center py-1 gap-0.5 hover:text-black transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        {/* Cart */}
        <a
          href="/cart"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('cart');
          }}
          className={`relative flex flex-col items-center justify-center py-1 gap-0.5 transition-colors cursor-pointer ${
            activePage === 'cart' ? 'text-[#E10613] font-bold' : 'hover:text-black'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#E10613] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
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
          className="flex flex-col items-center justify-center py-1 gap-0.5 hover:text-black transition-colors cursor-pointer"
        >
          <Bookmark className="w-5 h-5" />
          <span>Wishlist</span>
        </button>
      </nav>
    </div>
  );
};
