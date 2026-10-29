import React from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Phone, MapPin, User, FileText, ArrowRight, Copy, Check } from 'lucide-react';
import { CartItem, OrderDetails, PaymentMethod } from '../types';
import { BANGLADESH_DISTRICTS, ASSIANO_LOGO } from '../data/products';
import { sendOrderNotification } from '../services/splitforms';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  deliveryArea: 'dhaka' | 'outside_dhaka';
  setDeliveryArea: (area: 'dhaka' | 'outside_dhaka') => void;
  onOrderSuccess: (order: OrderDetails) => void;
  onOpenTracking: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  shippingFee,
  discount,
  total,
  deliveryArea,
  setDeliveryArea,
  onOrderSuccess,
  onOpenTracking,
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

  if (!isOpen) return null;

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDistrict(val);
    if (val === 'Dhaka') {
      setDeliveryArea('dhaka');
    } else {
      setDeliveryArea('outside_dhaka');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!customerName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    const cleanPhone = customerPhone.trim().replace(/[-+ ]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setValidationError('Please enter a valid mobile number (e.g. 017XXXXXXXX).');
      return;
    }
    if (!address.trim()) {
      setValidationError('Please provide complete house, road and area address.');
      return;
    }
    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !bkashTrxId.trim()) {
      setValidationError('Please enter the 8 or 10-character Transaction ID (TrxID) after payment.');
      return;
    }

    setIsSubmitting(true);

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

    // Send order details to Web3Forms
    await sendOrderNotification(newOrder, deliveryNote.trim());

    setConfirmedOrder(newOrder);
    onOrderSuccess(newOrder);
    setIsSubmitting(false);
  };

  const handleCopyOrderId = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-neutral-200 my-auto overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-3">
            <img src={ASSIANO_LOGO} alt="Assiano Logo" className="w-8 h-8 rounded-full" />
            <div>
              <h2 className="font-serif text-lg font-bold text-neutral-900">
                {confirmedOrder ? 'Order Confirmation' : 'Fast Checkout & Delivery'}
              </h2>
              <span className="text-[11px] text-neutral-500 block">
                {confirmedOrder ? 'Thank you for choosing Assiano' : 'Doorstep Cash on Delivery Available Across Bangladesh'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          /* Confirmation Receipt View */
          <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="text-center py-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto mb-2" />
              <h3 className="text-2xl font-serif font-bold text-neutral-900">
                Order Successfully Placed!
              </h3>
              <p className="text-xs text-neutral-600 mt-1 max-w-md mx-auto">
                We have received your order for <strong>{confirmedOrder.customerName}</strong>. Our Dhaka logistics team is currently packing your garments.
              </p>
            </div>

            {/* Order Reference Box */}
            <div className="bg-[#FAFAF8] p-4 rounded-xs border border-neutral-300 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block">
                  Your Order Number
                </span>
                <span className="text-xl font-mono font-bold text-[#E10613] tracking-wider">
                  {confirmedOrder.orderId}
                </span>
              </div>
              <button
                onClick={handleCopyOrderId}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-300 text-xs text-neutral-700 hover:border-black rounded-xs transition-colors cursor-pointer"
              >
                {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedOrderId ? 'Copied' : 'Copy Order ID'}</span>
              </button>
            </div>

            {/* Estimated Delivery Notice */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xs text-xs text-emerald-900 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Estimated Arrival: {confirmedOrder.estimatedDelivery}</span>
              </div>
              <p className="text-emerald-800 text-[11px]">
                A confirmation SMS has been dispatched to <strong>+880 {confirmedOrder.customerPhone}</strong>. You may inspect the parcel upon delivery.
              </p>
            </div>

            {/* Order Summary & Items */}
            <div className="border border-neutral-200 rounded-xs p-4 space-y-3">
              <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block">
                Order Summary ({confirmedOrder.items.length} items)
              </span>
              <div className="space-y-2 max-h-40 overflow-y-auto divide-y divide-neutral-100">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="pt-2 first:pt-0 flex justify-between text-xs">
                    <div>
                      <span className="font-medium text-neutral-900">{item.product.name}</span>
                      <span className="text-neutral-500 text-[11px] block">
                        Size: {item.selectedSize} · Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-neutral-900">
                      Tk {((item.customPrice ?? item.product.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-200 space-y-1 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span className="font-semibold text-neutral-800 uppercase">
                    {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : confirmedOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Address</span>
                  <span className="text-neutral-800 text-right max-w-xs truncate">
                    {confirmedOrder.deliveryAddress}, {confirmedOrder.district}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm text-neutral-900 pt-2 border-t border-neutral-200">
                  <span>Payable at Doorstep</span>
                  <span className="font-mono tabular-nums text-base text-[#141416]">
                    Tk {confirmedOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenTracking(confirmedOrder.orderId);
                }}
                className="flex-1 py-3 bg-[#141416] hover:bg-[#E10613] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Track Live Status</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-6 bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 max-h-[85vh] overflow-y-auto space-y-6">
            {validationError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
                {validationError}
              </div>
            )}

            {/* Contact & Delivery Details */}
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
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
                      placeholder=""
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
                      placeholder=""
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">Courier rider will call this number before delivery</span>
                </div>
              </div>

              {/* District & Location */}
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
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Delivery Area & Charge *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryArea('dhaka')}
                      className={`p-2 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        deliveryArea === 'dhaka'
                          ? 'border-[#E10613] bg-red-50/30 ring-1 ring-[#E10613]'
                          : 'border-neutral-300 bg-neutral-50 hover:bg-white hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[11px] font-bold text-neutral-900 block">Inside Dhaka</span>
                        <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                          deliveryArea === 'dhaka' ? 'border-[#E10613] bg-[#E10613]' : 'border-neutral-300'
                        }`}>
                          {deliveryArea === 'dhaka' && <span className="w-1 h-1 rounded-full bg-white"></span>}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#E10613] font-mono mt-1">Tk 60</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryArea('outside_dhaka')}
                      className={`p-2 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        deliveryArea === 'outside_dhaka'
                          ? 'border-[#E10613] bg-red-50/30 ring-1 ring-[#E10613]'
                          : 'border-neutral-300 bg-neutral-50 hover:bg-white hover:border-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[11px] font-bold text-neutral-900 block">Outside Dhaka</span>
                        <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${
                          deliveryArea === 'outside_dhaka' ? 'border-[#E10613] bg-[#E10613]' : 'border-neutral-300'
                        }`}>
                          {deliveryArea === 'outside_dhaka' && <span className="w-1 h-1 rounded-full bg-white"></span>}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#E10613] font-mono mt-1">Tk 120</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed Address */}
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Full Delivery Address (House, Road, Area, Thana) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder=""
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">
                  Optional Delivery Instruction
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xs focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-3 border-t border-neutral-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
                2. Select Payment Method
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 border rounded-xs text-left transition-all cursor-pointer ${
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
                  className={`p-3 border rounded-xs text-left transition-all cursor-pointer ${
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
                  className={`p-3 border rounded-xs text-left transition-all cursor-pointer ${
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
                <div className="p-3 bg-neutral-100 border border-neutral-300 rounded-xs space-y-2 text-xs">
                  <p className="text-neutral-700">
                    Please send <strong className="font-mono text-neutral-900">Tk {total.toLocaleString()}</strong> to our official Assiano {paymentMethod === 'bkash' ? 'bKash' : 'Nagad'} Merchant number: <strong className="font-mono text-[#E10613]">01758-976677</strong>.
                  </p>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-800 mb-1">
                      Enter TrxID (Transaction ID) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder=""
                      value={bkashTrxId}
                      onChange={(e) => setBkashTrxId(e.target.value.toUpperCase())}
                      className="w-full text-xs px-3 py-2 bg-white border border-neutral-300 rounded-xs uppercase font-mono tracking-wider focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Total Summary Footer */}
            <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left w-full sm:w-auto">
                <span className="text-[11px] text-neutral-500 block">Total Payable at Doorstep</span>
                <span className="text-2xl font-bold font-mono text-[#141416] tabular-nums">
                  Tk {total.toLocaleString()}
                </span>
                <span className="text-[10px] text-neutral-500 block">
                  {items.length} items · {shippingFee === 0 ? 'Free Shipping' : `Includes Tk ${shippingFee} shipping`}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#E10613] hover:bg-[#C80511] text-white text-xs font-bold tracking-widest uppercase rounded-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Confirming Order...' : 'Confirm Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
