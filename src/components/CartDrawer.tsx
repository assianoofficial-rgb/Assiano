import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountAmount: number;
  onApplyPromo: (code: string) => void;
  promoError: string;
  deliveryArea: 'dhaka' | 'outside_dhaka';
  setDeliveryArea: (area: 'dhaka' | 'outside_dhaka') => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  promoCode,
  setPromoCode,
  discountAmount,
  onApplyPromo,
  promoError,
  deliveryArea,
  setDeliveryArea,
}) => {
  const [inputCode, setInputCode] = React.useState(promoCode);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = items.length === 0 ? 0 : deliveryArea === 'dhaka' ? 60 : 120;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E10613]" />
            <h2 className="font-serif text-lg font-bold text-neutral-900">
              Shopping Bag
            </h2>
            <span className="text-xs bg-neutral-200 text-neutral-800 px-2 py-0.5 rounded-full font-mono tabular-nums">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close bag"
            className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-neutral-100">
          {items.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-neutral-300 mb-3" />
              <h3 className="text-base font-serif text-neutral-800">Your bag is empty</h3>
              <p className="text-xs text-neutral-500 max-w-xs mt-1 mb-5">
                Explore our modest and contemporary silhouettes to add items to your shopping bag.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#141416] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#E10613] transition-colors cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="pt-4 first:pt-0 flex gap-4">
                <div className="w-20 h-24 bg-neutral-100 rounded-xs overflow-hidden shrink-0 border border-neutral-200">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-neutral-900 leading-tight">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="text-neutral-400 hover:text-[#E10613] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 text-[11px] text-neutral-500 flex flex-wrap gap-2">
                      <span>Size: <strong className="text-neutral-800">{item.selectedSize}</strong></span>
                      <span>·</span>
                      <span>Color: <strong className="text-neutral-800">{item.selectedColor}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-neutral-300 rounded-xs bg-neutral-50">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="p-1 text-neutral-600 hover:text-black cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-mono font-medium text-xs tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="p-1 text-neutral-600 hover:text-black cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold font-mono text-neutral-900 tabular-nums">
                      Tk {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Calculations */}
        {items.length > 0 && (
          <div className="p-6 bg-[#FAFAF8] border-t border-neutral-200 space-y-4">
            {/* Promo Code Box */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Promo Code (e.g. ASSIANO10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                  className="w-full text-xs pl-8 pr-3 py-2 bg-white border border-neutral-300 rounded-xs uppercase font-mono tracking-wider focus:outline-none focus:border-black"
                />
              </div>
              <button
                onClick={() => onApplyPromo(inputCode)}
                className="px-3.5 py-2 bg-neutral-900 hover:bg-[#E10613] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-[11px] text-[#E10613] font-medium">{promoError}</p>
            )}
            {discountAmount > 0 && (
              <p className="text-[11px] text-emerald-700 font-medium">
                ✓ Promo code applied! Saved Tk {discountAmount.toLocaleString()}
              </p>
            )}

            {/* Delivery Destination Selector */}
            <div className="pt-2 border-t border-neutral-200/80">
              <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                Delivery Location:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setDeliveryArea('dhaka')}
                  className={`p-2 rounded-xs border text-left cursor-pointer transition-colors ${
                    deliveryArea === 'dhaka'
                      ? 'border-[#141416] bg-white font-semibold text-neutral-900 shadow-xs'
                      : 'border-neutral-300 bg-neutral-100/60 text-neutral-600'
                  }`}
                >
                  <span className="block text-[11px]">Inside Dhaka</span>
                  <span className="font-mono tabular-nums text-xs">Tk 60</span>
                </button>
                <button
                  onClick={() => setDeliveryArea('outside_dhaka')}
                  className={`p-2 rounded-xs border text-left cursor-pointer transition-colors ${
                    deliveryArea === 'outside_dhaka'
                      ? 'border-[#141416] bg-white font-semibold text-neutral-900 shadow-xs'
                      : 'border-neutral-300 bg-neutral-100/60 text-neutral-600'
                  }`}
                >
                  <span className="block text-[11px]">Outside Dhaka</span>
                  <span className="font-mono tabular-nums text-xs">Tk 120</span>
                </button>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-neutral-900 font-medium">
                  Tk {subtotal.toLocaleString()}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Voucher Discount</span>
                  <span className="font-mono tabular-nums font-medium">
                    - Tk {discountAmount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Shipping</span>
                <span className="font-mono tabular-nums text-neutral-900 font-medium">
                  {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `Tk ${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-300 text-sm font-bold text-neutral-900">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums text-base text-[#141416]">
                  Tk {grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#E10613] hover:bg-[#C80511] text-white text-xs font-bold tracking-widest uppercase rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cash on Delivery Available Across Bangladesh</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
