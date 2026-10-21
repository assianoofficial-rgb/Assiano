import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Truck, Banknote, Phone, MapPin, User, Copy, Check, ArrowRight } from 'lucide-react';
import { CartItem, OrderDetails, PaymentMethod } from '../types';
import { BANGLADESH_DISTRICTS, ASSIANO_LOGO } from '../data/products';

interface CheckoutPageProps {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  deliveryArea: 'dhaka' | 'outside_dhaka';
  setDeliveryArea: (area: 'dhaka' | 'outside_dhaka') => void;
  onBackToCart: () => void;
  onOrderSuccess: (order: OrderDetails) => void;
  onOpenTracking: (orderId: string) => void;
  onContinueShopping: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  subtotal,
  shippingFee,
  discount,
  total,
  deliveryArea,
  setDeliveryArea,
  onBackToCart,
  onOrderSuccess,
  onOpenTracking,
  onContinueShopping,
}) => {
  const [customerName, setCustomerName] = React.useState('');
  const [customerPhone, setCustomerPhone] = React.useState('');
  const [district, setDistrict] = React.useState('Dhaka');
  const [address, setAddress] = React.useState('');
  const [deliveryNote, setDeliveryNote] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('cod');
  const [bkashTrxId, setBkashTrxId] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [confirmedOrder, setConfirmedOrder] = React.useState<OrderDetails | null>(null);
  const [copiedOrderId, setCopiedOrderId] = React.useState(false);
  const [validationError, setValidationError] = React.useState('');

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDistrict(val);
    if (val === 'Dhaka') {
      setDeliveryArea('dhaka');
    } else {
      setDeliveryArea('outside_dhaka');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!customerName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    const cleanPhone = customerPhone.trim().replace(/[-+ ]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setValidationError('Please enter a valid active mobile number (e.g. 017XXXXXXXX).');
      return;
    }
    if (!address.trim()) {
      setValidationError('Please provide complete house, road, and area address.');
      return;
    }
    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !bkashTrxId.trim()) {
      setValidationError('Please enter the 8 to 10-character Transaction ID (TrxID) after mobile payment.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderNum = Math.floor(100000 + Math.random() * 900000);
      const generatedOrderId = `ASN-${orderNum}`;
      const estimatedDelivery = deliveryArea === 'dhaka' ? 'Within 24 to 48 Hours' : 'Within 2 to 3 Business Days';

      const newOrder: OrderDetails = {
        orderId: generatedOrderId,
        createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        district,
        deliveryAddress: address.trim(),
        deliveryArea,
        paymentMethod,
        bkashTrxId: bkashTrxId.trim() || undefined,
        items: [...items],
        subtotal,
        shippingFee,
        discount,
        total,
        status: 'confirmed',
        estimatedDelivery
      };

      setConfirmedOrder(newOrder);
      onOrderSuccess(newOrder);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  const handleCopyOrderId = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  // If order was confirmed, show full Confirmation Page
  if (confirmedOrder) {
    return (
      <div className="bg-[#FAFAF8] py-12 sm:py-16 min-h-[800px]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-6 sm:p-10 border border-neutral-200 rounded-sm shadow-sm space-y-6">
            <div className="text-center py-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-3" />
              <div className="text-xs uppercase tracking-[0.25em] text-emerald-700 font-bold mb-1">
                Order Confirmed
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900">
                Thank You for Choosing Assiano!
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
                Your order has been officially received. Our Dhaka packaging team is currently inspecting and preparing your garments.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="bg-[#FAFAF8] p-5 rounded-xs border border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
                  Your Order Tracking Code
                </span>
                <span className="text-2xl font-mono font-bold text-[#E10613] tracking-wider">
                  {confirmedOrder.orderId}
                </span>
              </div>
              <button
                onClick={handleCopyOrderId}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-neutral-300 text-xs font-semibold text-neutral-800 hover:border-black rounded-xs transition-colors cursor-pointer"
              >
                {copiedOrderId ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedOrderId ? 'Copied to Clipboard' : 'Copy Order Code'}</span>
              </button>
            </div>

            {/* Estimated Delivery Notice */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xs text-xs text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Estimated Arrival: {confirmedOrder.estimatedDelivery}</span>
              </div>
              <p className="text-emerald-800 text-[11px] pl-6">
                A confirmation SMS will be dispatched to <strong>+880 {confirmedOrder.customerPhone}</strong>. You may inspect the parcel upon delivery.
              </p>
            </div>

            {/* Order Summary & Items List */}
            <div className="border border-neutral-200 rounded-xs p-5 space-y-4">
              <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider block">
                Itemized Receipt ({confirmedOrder.items.length} items)
              </span>
              <div className="space-y-3 divide-y divide-neutral-100">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex justify-between text-xs">
                    <div>
                      <span className="font-semibold text-neutral-900 block">{item.product.name}</span>
                      <span className="text-neutral-500 text-[11px]">
                        Size: {item.selectedSize} · Color: {item.selectedColor} · Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-mono tabular-nums font-bold text-neutral-900">
                      Tk {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-neutral-200 space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-bold text-neutral-900 uppercase">
                    {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : confirmedOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Address:</span>
                  <span className="text-neutral-900 text-right max-w-xs">
                    {confirmedOrder.deliveryAddress}, {confirmedOrder.district}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-neutral-900 pt-3 border-t border-neutral-200">
                  <span>Payable at Doorstep:</span>
                  <span className="font-mono tabular-nums text-lg text-[#141416]">
                    Tk {confirmedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <button
                onClick={() => onOpenTracking(confirmedOrder.orderId)}
                className="flex-1 py-3.5 bg-[#141416] hover:bg-[#E10613] text-white text-xs font-bold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Truck className="w-4 h-4" />
                <span>Track Live Status</span>
              </button>

              <button
                onClick={onContinueShopping}
                className="py-3.5 px-6 bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xs hover:border-black transition-colors cursor-pointer"
              >
                Continue Browsing Catalog
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // Active Checkout Form View
  return (
    <div className="bg-[#FAFAF8] py-10 sm:py-14 min-h-[800px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumbs */}
        <div className="mb-8 pb-6 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#E10613] font-semibold mb-1">
              Secure Doorstep Order
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#141416]">
              Checkout & Delivery Details
            </h1>
          </div>

          <button
            onClick={onBackToCart}
            className="text-xs font-semibold text-neutral-600 hover:text-black transition-colors flex items-center gap-1 cursor-pointer uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Bag</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmitOrder} className="bg-white p-6 sm:p-8 border border-neutral-200 rounded-sm space-y-6 shadow-2xs">
              
              {validationError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
                  {validationError}
                </div>
              )}

              {/* Step 1: Customer & Address */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E10613] block">
                  1. Delivery Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Customer Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Farhana Yasmin"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Active Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 01712345678"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black font-mono"
                      />
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 block">Rider will call this number prior to arrival</span>
                  </div>
                </div>

                {/* District Dropdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Select District (All 64 Districts) *
                    </label>
                    <select
                      value={district}
                      onChange={handleDistrictChange}
                      className="w-full text-xs px-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black cursor-pointer font-sans"
                    >
                      {BANGLADESH_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d} {d === 'Dhaka' ? '— Inside Dhaka (Tk 60)' : '— Outside Dhaka (Tk 120)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">
                      Shipping Rate
                    </label>
                    <div className="text-xs p-2.5 bg-neutral-100 border border-neutral-200 rounded-xs flex items-center justify-between text-neutral-800">
                      <span>{district === 'Dhaka' ? 'Inside Dhaka (24-48 hrs)' : 'Outside Dhaka (48-72 hrs)'}</span>
                      <strong className="font-mono tabular-nums text-neutral-900">Tk {shippingFee}</strong>
                    </div>
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Full Delivery Address (House, Road, Area, Thana) *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                    <textarea
                      required
                      rows={2}
                      placeholder="e.g. Flat 4B, House 12, Road 7, Sector 3, Uttara, Dhaka-1230"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before coming or leave with building security"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xs focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E10613] block">
                  2. Payment Method
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 border rounded-xs text-left transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#E10613] bg-red-50/20 ring-1 ring-[#E10613]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#E10613] mb-1" />
                    <span className="text-xs font-bold block text-neutral-900">Cash on Delivery</span>
                    <span className="text-[10px] text-neutral-500">Pay when parcel arrives</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3.5 border rounded-xs text-left transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-[#E10613] bg-red-50/20 ring-1 ring-[#E10613]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="text-[#D12053] font-bold text-xs mb-1 font-mono">bKash</div>
                    <span className="text-xs font-bold block text-neutral-900">bKash Mobile</span>
                    <span className="text-[10px] text-neutral-500">Merchant Payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3.5 border rounded-xs text-left transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-[#E10613] bg-red-50/20 ring-1 ring-[#E10613]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="text-[#F7941D] font-bold text-xs mb-1 font-mono">Nagad</div>
                    <span className="text-xs font-bold block text-neutral-900">Nagad Mobile</span>
                    <span className="text-[10px] text-neutral-500">Send Money / Pay</span>
                  </button>
                </div>

                {/* bKash / Nagad instructions if selected */}
                {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                  <div className="p-4 bg-neutral-100 border border-neutral-300 rounded-xs space-y-2 text-xs">
                    <p className="text-neutral-700">
                      Please send <strong className="font-mono text-neutral-900">Tk {total.toLocaleString()}</strong> to our official Assiano {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Merchant number: <strong className="font-mono text-[#E10613]">01712-345678</strong>.
                    </p>
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-800 mb-1">
                        Enter TrxID (Transaction ID) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 9J8B7G6F5"
                        value={bkashTrxId}
                        onChange={(e) => setBkashTrxId(e.target.value.toUpperCase())}
                        className="w-full text-xs px-3 py-2 bg-white border border-neutral-300 rounded-xs uppercase font-mono tracking-wider focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Order Button */}
              <div className="pt-4 border-t border-neutral-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#E10613] hover:bg-[#C80511] text-white text-xs font-bold tracking-widest uppercase rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Confirming Order...' : 'Confirm Order (Place Order)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-neutral-500 mt-2">
                  By confirming, you agree to inspect the parcel upon delivery. 7-Day easy exchange supported.
                </p>
              </div>

            </form>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            <div className="bg-white border border-neutral-200 rounded-sm p-6 space-y-5 shadow-2xs">
              <h2 className="font-serif text-lg font-bold text-neutral-900 border-b border-neutral-200 pb-3">
                Order Review ({items.length} items)
              </h2>

              <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-neutral-100 pr-1">
                {items.map((item, idx) => (
                  <div key={idx} className="pt-3 first:pt-0 flex gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-18 object-cover rounded-xs border border-neutral-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-neutral-900 truncate">{item.product.name}</h4>
                      <span className="text-[11px] text-neutral-500 block">
                        Size: {item.selectedSize} · Qty: {item.quantity}
                      </span>
                      <span className="font-mono tabular-nums font-bold text-neutral-900 block mt-1">
                        Tk {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-neutral-600 pt-3 border-t border-neutral-200">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono tabular-nums text-neutral-900 font-medium">Tk {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span className="font-mono tabular-nums font-medium">- Tk {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Shipping ({deliveryArea === 'dhaka' ? 'Dhaka' : 'Outside Dhaka'}):</span>
                  <span className="font-mono tabular-nums text-neutral-900 font-medium">Tk {shippingFee}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-200 text-sm font-bold text-neutral-900">
                  <span>Payable at Doorstep:</span>
                  <span className="font-mono tabular-nums text-lg text-[#141416]">
                    Tk {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200 text-[11px] text-neutral-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Doorstep Inspection Permitted</span>
                </div>
                <p className="text-neutral-500">Check fabric texture and stitching before completing cash payment to the rider.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
