import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProductModal } from './components/ProductModal';
import { OrderTrackModal } from './components/OrderTrackModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { PRODUCTS } from './data/products';
import { CartItem, CategoryType, OrderDetails, PageType, Product } from './types';
import { MessageCircle } from 'lucide-react';

// Contact hotline constants (user can update their mobile and WhatsApp numbers here)
const ASSIANO_HOTLINE = '+880 1712-345678';
const ASSIANO_WHATSAPP = '+880 1712-345678';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = React.useState<PageType>('home');
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState<Product>(PRODUCTS[0]);

  // Cart State with LocalStorage persistence
  const [cartItems, setCartItems] = React.useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('assiano_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  const [deliveryArea, setDeliveryArea] = React.useState<'dhaka' | 'outside_dhaka'>('dhaka');
  const [promoCode, setPromoCode] = React.useState('');
  const [discountAmount, setDiscountAmount] = React.useState(0);
  const [promoError, setPromoError] = React.useState('');

  // Orders State with LocalStorage persistence
  const [orders, setOrders] = React.useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('assiano_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  // Modal States
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = React.useState(false);
  const [isTrackOpen, setIsTrackOpen] = React.useState(false);
  const [activeTrackingId, setActiveTrackingId] = React.useState('');
  const [quickViewProduct, setQuickViewProduct] = React.useState<Product | null>(null);

  // Toast Notification State
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  // Persist cart
  React.useEffect(() => {
    try {
      localStorage.setItem('assiano_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  // Persist orders
  React.useEffect(() => {
    try {
      localStorage.setItem('assiano_orders', JSON.stringify(orders));
    } catch (e) {
      // ignore
    }
  }, [orders]);

  const addToast = (type: 'cart' | 'wishlist' | 'info', title: string, subtitle?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, subtitle }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleNavigate = (page: PageType, category?: CategoryType) => {
    setActivePage(page);
    if (category) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open separate product page
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate('product');
  };

  // Add to Bag handler
  const handleAddToCart = (product: Product, size: string, color: string, qty: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
      }
    });

    addToast(
      'cart',
      `Added to Bag (${qty})`,
      `${product.name} · Size: ${size}`
    );
  };

  // Instant Buy Now handler (adds to cart and navigates directly to separate checkout page)
  const handleInstantBuy = (product: Product, size: string, color: string, qty: number = 1) => {
    handleAddToCart(product, size, color, qty);
    handleNavigate('checkout');
  };

  // Cart operations
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    addToast('info', 'Item removed from bag');
  };

  // Promo code validation
  const handleApplyPromo = (code: string) => {
    setPromoError('');
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ASSIANO10' || cleanCode === 'EID2026') {
      const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setPromoCode(cleanCode);
      addToast('info', '10% Voucher Applied', `You saved ৳ ${discount.toLocaleString()}`);
    } else if (cleanCode === '') {
      setDiscountAmount(0);
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try "ASSIANO10" for 10% off.');
    }
  };

  // Order calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = cartItems.length === 0 ? 0 : deliveryArea === 'dhaka' ? 60 : 120;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleOrderSuccess = (order: OrderDetails) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setDiscountAmount(0);
    setPromoCode('');
  };

  const handleOpenTracking = (orderId: string) => {
    setActiveTrackingId(orderId);
    setIsTrackOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#141416] flex flex-col font-sans">
      {/* Top Navigation Bar: Home, Shop (Mega Hover), About, Contact */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => handleNavigate('cart')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onQuickView={(p) => handleOpenProduct(p)}
      />

      {/* Specific Pages View */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePage
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onNavigateShop={(cat) => handleNavigate('shop', cat)}
            onOpenProduct={handleOpenProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p, s, c) => handleAddToCart(p, s, c, 1)}
            onInstantBuy={(p, s, c) => handleInstantBuy(p, s, c, 1)}
          />
        )}

        {activePage === 'shop' && (
          <ShopPage
            products={PRODUCTS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenProduct={handleOpenProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p, s, c) => handleAddToCart(p, s, c, 1)}
            onInstantBuy={(p, s, c) => handleInstantBuy(p, s, c, 1)}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigateShop={() => handleNavigate('shop', 'all')}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            phoneHotline={ASSIANO_HOTLINE}
            whatsappNumber={ASSIANO_WHATSAPP}
          />
        )}

        {activePage === 'product' && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            onBackToShop={() => handleNavigate('shop')}
            onSelectProduct={handleOpenProduct}
            onAddToCart={(p, s, c, q) => handleAddToCart(p, s, c, q || 1)}
            onInstantBuy={(p, s, c, q) => handleInstantBuy(p, s, c, q)}
            onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
            onNavigateCategory={(cat) => handleNavigate('shop', cat)}
          />
        )}

        {activePage === 'cart' && (
          <CartPage
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onProceedToCheckout={() => handleNavigate('checkout')}
            onContinueShopping={() => handleNavigate('shop')}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            discountAmount={discountAmount}
            onApplyPromo={handleApplyPromo}
            promoError={promoError}
            deliveryArea={deliveryArea}
            setDeliveryArea={setDeliveryArea}
          />
        )}

        {activePage === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            subtotal={subtotal}
            shippingFee={shippingFee}
            discount={discountAmount}
            total={grandTotal}
            deliveryArea={deliveryArea}
            setDeliveryArea={setDeliveryArea}
            onBackToCart={() => handleNavigate('cart')}
            onOrderSuccess={handleOrderSuccess}
            onOpenTracking={handleOpenTracking}
            onContinueShopping={() => handleNavigate('shop')}
          />
        )}
      </main>

      {/* Streamlined Compact Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTrack={() => {
          setActiveTrackingId('');
          setIsTrackOpen(true);
        }}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Single Global Floating WhatsApp Order & Chat Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${ASSIANO_WHATSAPP.replace(/[^0-9]/g, '')}?text=Hello%20Assiano,%20I%20would%20like%20to%20order`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-bold py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-black/5"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
          <span className="tracking-wide">হোয়াটসঅ্যাপে অর্ডার দিন</span>
        </a>
      </div>

      {/* Modals: Quick View, Order Tracking, Sizing & Search */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onViewFullPage={handleOpenProduct}
      />

      <OrderTrackModal
        isOpen={isTrackOpen}
        onClose={() => setIsTrackOpen(false)}
        orders={orders}
        initialOrderId={activeTrackingId}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={quickViewProduct?.category || selectedCategory}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => {
          handleOpenProduct(p);
        }}
        onSearchSubmit={(q) => {
          setSearchQuery(q);
          handleNavigate('shop');
        }}
      />

      {/* Action Notification Toasts */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
        onOpenCart={() => handleNavigate('cart')}
      />
    </div>
  );
}
