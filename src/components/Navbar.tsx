import React from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown, Sparkles, ArrowRight, Ruler, Check } from 'lucide-react';
import { ASSIANO_LOGO, PRODUCTS } from '../data/products';
import { CategoryType, PageType, Product } from '../types';

interface NavbarProps {
  activePage: PageType;
  onNavigate: (page: PageType, category?: CategoryType) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenSizeGuide: () => void;
  onQuickView: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenSizeGuide,
  onQuickView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileShopOpen, setMobileShopOpen] = React.useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
  const megaMenuTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const featuredProduct = PRODUCTS[0]; // Shahajadi Midnight Abaya

  const handleMouseEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  const categories: { id: CategoryType; label: string; desc: string }[] = [
    { id: 'all', label: 'All Designs', desc: 'Browse complete catalog' },
    { id: 'abaya', label: 'Abayas & Borkas', desc: 'Korean Nida & Zoom Crepe' },
    { id: 'three-piece', label: 'Three-Piece Sets', desc: 'Pure Cotton & Organza' },
    { id: 'kurti', label: 'Designer Kurtis', desc: 'Hand-embroidered tunics' },
    { id: 'gown', label: 'Occasion Gowns', desc: 'Shimmer Georgette dresses' },
    { id: 'shirt', label: 'Cuban Shirts', desc: 'Relaxed linen & cotton' },
    { id: 'footwear', label: 'Footwear & Heels', desc: 'Cushioned party stilettos' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark & Emblem */}
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E10613] cursor-pointer text-left"
          >
            <img
              src={ASSIANO_LOGO}
              alt="Assiano Official Emblem"
              className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-neutral-200 group-hover:scale-105 transition-transform"
            />
            <span className="text-2xl font-bold tracking-[0.22em] text-[#141416] font-serif uppercase">
              Assiano
            </span>
          </button>

          {/* Zone 2: Navigation Links: Home, Shop (Mega Hover), About, Contact */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-wider uppercase font-medium text-neutral-700 h-full">
            {/* Home Link */}
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-[#E10613] transition-colors whitespace-nowrap shrink-0 relative py-2 cursor-pointer ${
                activePage === 'home'
                  ? 'text-[#E10613] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#E10613]'
                  : ''
              }`}
            >
              Home
            </button>

            {/* Shop Link with Mega Hover Menu */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => onNavigate('shop', 'all')}
                className={`hover:text-[#E10613] transition-colors whitespace-nowrap shrink-0 relative py-2 flex items-center gap-1 cursor-pointer ${
                  activePage === 'shop'
                    ? 'text-[#E10613] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#E10613]'
                    : ''
                }`}
              >
                <span>Shop</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#E10613]' : 'text-neutral-400'}`} />
              </button>

              {/* MEGA HOVER DROPDOWN MENU */}
              {isMegaMenuOpen && (
                <div
                  className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] bg-white border border-neutral-200 shadow-2xl rounded-b-sm p-7 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-12 gap-8 text-left">
                    
                    {/* Col 1: Categories & Silhouettes */}
                    <div className="col-span-5 border-r border-neutral-100 pr-4">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#E10613]">
                          Categories
                        </span>
                      </div>
                      <div className="space-y-1">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              onNavigate('shop', cat.id);
                              setIsMegaMenuOpen(false);
                            }}
                            className="w-full text-left p-2 rounded-xs hover:bg-neutral-50 group transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <div>
                              <span className="text-xs font-semibold text-neutral-900 group-hover:text-[#E10613] block">
                                {cat.label}
                              </span>
                              <span className="text-[11px] text-neutral-400 font-normal">
                                {cat.desc}
                              </span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#E10613] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Col 2: Advanced Features & Fabric Standards */}
                    <div className="col-span-3 border-r border-neutral-100 pr-4">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#141416]">
                          Fabric Integrity
                        </span>
                      </div>
                      <div className="space-y-2.5 text-xs text-neutral-600">
                        <div className="p-2 bg-neutral-50 rounded-xs">
                          <strong className="text-neutral-900 block text-[11px] font-sans">Korean Nida Crepe</strong>
                          <span className="text-[10px] text-neutral-500">Breathable, non-static fall</span>
                        </div>
                        <div className="p-2 bg-neutral-50 rounded-xs">
                          <strong className="text-neutral-900 block text-[11px] font-sans">100% Combed Cotton</strong>
                          <span className="text-[10px] text-neutral-500">Natural summer handloom</span>
                        </div>
                        <div className="p-2 bg-neutral-50 rounded-xs">
                          <strong className="text-neutral-900 block text-[11px] font-sans">Micro Georgette</strong>
                          <span className="text-[10px] text-neutral-500">Diamond shimmer sequin work</span>
                        </div>
                        
                        <button
                          onClick={() => {
                            onOpenSizeGuide();
                            setIsMegaMenuOpen(false);
                          }}
                          className="w-full mt-3 flex items-center gap-1.5 p-2 text-xs font-semibold text-[#E10613] hover:bg-red-50/50 rounded-xs transition-colors cursor-pointer"
                        >
                          <Ruler className="w-3.5 h-3.5" />
                          <span>Size & Fit Guide ↗</span>
                        </button>
                      </div>
                    </div>

                    {/* Col 3: Featured Spotlight Card */}
                    <div className="col-span-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#E10613]">
                            Bestseller Spotlight
                          </span>
                          <span className="text-[10px] bg-[#E10613] text-white px-2 py-0.5 rounded-xs font-bold uppercase">
                            -34% OFF
                          </span>
                        </div>

                        <div className="aspect-[4/3] rounded-xs overflow-hidden bg-neutral-100 border border-neutral-200 relative group">
                          <img
                            src={featuredProduct.image}
                            alt={featuredProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <h4 className="font-serif text-xs font-bold text-neutral-900 mt-2.5 truncate">
                          {featuredProduct.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="font-mono font-bold text-xs text-[#141416]">
                            ৳ {featuredProduct.price.toLocaleString()}
                          </span>
                          <span className="font-mono text-[11px] text-neutral-400 line-through">
                            ৳ {featuredProduct.originalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex gap-2">
                        <button
                          onClick={() => {
                            onQuickView(featuredProduct);
                            setIsMegaMenuOpen(false);
                          }}
                          className="flex-1 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-[11px] font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer text-center"
                        >
                          Quick View
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('shop', 'abaya');
                            setIsMegaMenuOpen(false);
                          }}
                          className="flex-1 py-2 bg-[#141416] hover:bg-[#E10613] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer text-center"
                        >
                          Shop Abayas
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* About Link */}
            <button
              onClick={() => onNavigate('about')}
              className={`hover:text-[#E10613] transition-colors whitespace-nowrap shrink-0 relative py-2 cursor-pointer ${
                activePage === 'about'
                  ? 'text-[#E10613] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#E10613]'
                  : ''
              }`}
            >
              About
            </button>

            {/* Contact Link */}
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-[#E10613] transition-colors whitespace-nowrap shrink-0 relative py-2 cursor-pointer ${
                activePage === 'contact'
                  ? 'text-[#E10613] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#E10613]'
                  : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances & Bag */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Search Collection"
              className="p-2 text-neutral-700 hover:text-[#E10613] hover:bg-neutral-100/70 rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Shopping Bag Primary Action */}
            <button
              onClick={onOpenCart}
              className={`flex items-center gap-2.5 px-3.5 sm:px-4 py-2 text-white text-xs font-semibold tracking-wider uppercase rounded-xs transition-all duration-200 cursor-pointer shadow-sm active:scale-95 whitespace-nowrap shrink-0 ${
                activePage === 'cart' ? 'bg-[#E10613] ring-2 ring-red-300' : 'bg-[#141416] hover:bg-[#E10613]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-black focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-6 py-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm tracking-wider uppercase font-medium py-2 border-b border-neutral-100 ${
                activePage === 'home' ? 'text-[#E10613] font-bold' : 'text-neutral-800 hover:text-[#E10613]'
              }`}
            >
              Home
            </button>

            {/* Mobile Shop with Expandable Categories */}
            <div>
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className={`w-full text-left text-sm tracking-wider uppercase font-medium py-2 border-b border-neutral-100 flex items-center justify-between ${
                  activePage === 'shop' ? 'text-[#E10613] font-bold' : 'text-neutral-800'
                }`}
              >
                <span>Shop Catalog</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileShopOpen ? 'rotate-180 text-[#E10613]' : ''}`} />
              </button>

              {mobileShopOpen && (
                <div className="pl-4 py-2 space-y-2 bg-neutral-50/70 border-b border-neutral-100">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onNavigate('shop', c.id);
                        setMobileMenuOpen(false);
                      }}
                      className="block text-left text-xs text-neutral-600 hover:text-[#E10613] py-1"
                    >
                      • {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm tracking-wider uppercase font-medium py-2 border-b border-neutral-100 ${
                activePage === 'about' ? 'text-[#E10613] font-bold' : 'text-neutral-800 hover:text-[#E10613]'
              }`}
            >
              About
            </button>

            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className={`text-left text-sm tracking-wider uppercase font-medium py-2 border-b border-neutral-100 ${
                activePage === 'contact' ? 'text-[#E10613] font-bold' : 'text-neutral-800 hover:text-[#E10613]'
              }`}
            >
              Contact
            </button>

            <div className="pt-3 flex items-center justify-between text-xs text-neutral-500">
              <a href="tel:+8801712345678" className="font-mono text-neutral-700">
                +880 1712-345678
              </a>
              <a
                href="https://www.facebook.com/share/1CAKiLxa7D/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E10613] font-medium"
              >
                Facebook Page ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
