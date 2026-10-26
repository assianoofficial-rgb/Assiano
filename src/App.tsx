import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { FloatingContactSpeedDial } from './components/FloatingContactSpeedDial';
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
import { parseCurrentUrl, navigateTo, updatePageTitle, getProductUrl } from './utils/navigation';
import { MessageCircle } from 'lucide-react';

// Contact hotline constants (Business Number: 01897684273, bKash: 01758976677)
const ASSIANO_HOTLINE = '+880 1897-684273';
const ASSIANO_WHATSAPP = '+880 1897-684273';

export default function App() {
  // Initialize route from current browser URL
  const initialRoute = React.useMemo(() => parseCurrentUrl(), []);

  // Navigation State
  const [activePage, setActivePage] = React.useState<PageType>(initialRoute.page);
  const [selectedCategory, setSelectedCategory] = React.useState<CategoryType>(initialRoute.category || 'all');
  const [searchQuery, setSearchQuery] = React.useState(initialRoute.searchQuery || '');
  
  // Find initial product if URL is /product/:id
  const [selectedProduct, setSelectedProduct] = React.useState<Product>(() => {
    if (initialRoute.productId) {
      const found = PRODUCTS.find(
        (p) =>
          p.id.toLowerCase() === initialRoute.productId?.toLowerCase() ||
          p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === initialRoute.productId?.toLowerCase()
      );
      if (found) return found;
    }
    return PRODUCTS[0];
  });

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

  // Sync routing on browser Back / Forward buttons and URL changes
  React.useEffect(() => {
    const handlePopState = () => {
      const route = parseCurrentUrl();
      setActivePage(route.page);
      if (route.category) {
        setSelectedCategory(route.category);
      }
      if (route.searchQuery !== undefined) {
        setSearchQuery(route.searchQuery);
      }
      if (route.page === 'product' && route.productId) {
        const found = PRODUCTS.find(
          (p) =>
            p.id.toLowerCase() === route.productId?.toLowerCase() ||
            p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === route.productId?.toLowerCase()
        );
        if (found) {
          setSelectedProduct(found);
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync Document Title based on active page
  React.useEffect(() => {
    switch (activePage) {
      case 'home':
        updatePageTitle('');
        break;
      case 'about':
        updatePageTitle('About Assiano Atelier');
        break;
      case 'contact':
        updatePageTitle('Contact & Concierge');
        break;
      case 'shop':
        updatePageTitle(selectedCategory !== 'all' ? `${selectedCategory.toUpperCase()} Collection` : 'Shop All Designs');
        break;
      case 'product':
        updatePageTitle(`${selectedProduct.name} (TK. ${selectedProduct.price.toLocaleString()})`);
        break;
      case 'cart':
        updatePageTitle('Shopping Bag');
        break;
      case 'checkout':
        updatePageTitle('Express Checkout');
        break;
    }
  }, [activePage, selectedCategory, selectedProduct]);

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

  // URL-driven navigation handler without hash (#)
  const handleNavigate = (page: PageType, category?: CategoryType) => {
    setActivePage(page);
    if (category) {
      setSelectedCategory(category);
    }

    let targetPath = '/';
    if (page === 'home') {
      targetPath = '/';
    } else if (page === 'about') {
      targetPath = '/about';
    } else if (page === 'contact') {
      targetPath = '/contact';
    } else if (page === 'cart') {
      targetPath = '/cart';
    } else if (page === 'checkout') {
      targetPath = '/checkout';
    } else if (page === 'shop') {
      targetPath = category && category !== 'all' ? `/shop/${category}` : '/shop';
    } else if (page === 'product') {
      targetPath = getProductUrl(selectedProduct.id);
    }

    navigateTo(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open separate product page with direct URL (/product/:id)
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product');
    navigateTo(getProductUrl(product.id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      `${product.name} · TK. ${product.price.toLocaleString()}`
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
      addToast('info', '10% Voucher Applied', `You saved TK. ${discount.toLocaleString()}`);
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

      {/* Specific Pages View (Padding bottom for mobile bottom navigation bar) */}
      <main className="flex-grow pb-16 lg:pb-0">
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

      {/* Speed Dial Floating Contact: On hover (desktop) or click (mobile), 3 circular buttons rise up: WhatsApp, Messenger, Call */}
      <FloatingContactSpeedDial
        phoneHotline={ASSIANO_HOTLINE}
        whatsappNumber={ASSIANO_WHATSAPP}
      />

      {/* Mobile Bottom Navigation Tabs (Home, Category, Search, Cart, Wishlist) */}
      <MobileBottomBar
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTrack={() => {
          setActiveTrackingId('');
          setIsTrackOpen(true);
        }}
      />

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
