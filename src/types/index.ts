export type CategoryType = 'all' | 'abaya' | 'kurti' | 'three-piece' | 'gown' | 'shirt' | 'footwear';
export type PageType = 'home' | 'shop' | 'about' | 'contact' | 'product' | 'cart' | 'checkout';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryType;
  categoryLabel: string;
  price: number; // in BDT (৳)
  originalPrice: number;
  discountPercent: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  fabric: string;
  colors: string[];
  sizes: string[];
  description: string;
  features: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export type PaymentMethod = 'cod' | 'bkash' | 'nagad' | 'card';

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  district: string;
  deliveryAddress: string;
  deliveryArea: 'dhaka' | 'outside_dhaka';
  paymentMethod: PaymentMethod;
  bkashTrxId?: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: 'confirmed' | 'processing' | 'dispatched' | 'delivered';
  estimatedDelivery: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verifiedPurchase: boolean;
}
