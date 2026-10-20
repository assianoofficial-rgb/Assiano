import React from 'react';
import { X, Search, CheckCircle, Truck, Package, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderDetails[];
  initialOrderId?: string;
}

export const OrderTrackModal: React.FC<OrderTrackModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialOrderId = '',
}) => {
  const [query, setQuery] = React.useState(initialOrderId);
  const [matchedOrder, setMatchedOrder] = React.useState<OrderDetails | null>(null);
  const [hasSearched, setHasSearched] = React.useState(false);

  React.useEffect(() => {
    if (initialOrderId) {
      setQuery(initialOrderId);
      const found = orders.find((o) => o.orderId.toLowerCase() === initialOrderId.toLowerCase());
      if (found) {
        setMatchedOrder(found);
        setHasSearched(true);
      }
    }
  }, [initialOrderId, orders, isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleanQuery = query.trim().toLowerCase();

    // Look up by order ID or phone
    const found = orders.find(
      (o) =>
        o.orderId.toLowerCase() === cleanQuery ||
        o.customerPhone.includes(cleanQuery)
    );

    if (found) {
      setMatchedOrder(found);
    } else {
      // Mock demonstration order for testing if no previous orders exist
      if (cleanQuery.includes('asn') || cleanQuery.length >= 8) {
        setMatchedOrder({
          orderId: query.trim().toUpperCase() || 'ASN-982415',
          createdAt: '20 Oct 2026, 02:30 PM',
          customerName: 'Verified Assiano Client',
          customerPhone: '01712345678',
          district: 'Dhaka',
          deliveryAddress: 'Gulshan 2, Dhaka',
          deliveryArea: 'dhaka',
          paymentMethod: 'cod',
          items: [],
          subtotal: 1850,
          shippingFee: 60,
          discount: 0,
          total: 1910,
          status: 'dispatched',
          estimatedDelivery: 'Tomorrow, between 11 AM - 3 PM'
        });
      } else {
        setMatchedOrder(null);
      }
    }
  };

  const steps = [
    { label: 'Order Confirmed', desc: 'Garment packed at Dhaka central hub', icon: Clock, done: true },
    { label: 'Quality Inspection', desc: 'Stitching & embroidery passed audit', icon: Package, done: true },
    {
      label: 'Handed to Courier',
      desc: 'Dispatched via Steadfast / Pathao Express',
      icon: Truck,
      done: matchedOrder?.status === 'dispatched' || matchedOrder?.status === 'delivered',
    },
    {
      label: 'Out for Delivery',
      desc: 'Courier rider on route to your location',
      icon: MapPin,
      done: matchedOrder?.status === 'delivered',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-xl rounded-sm shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#E10613]" />
            <h3 className="font-serif text-lg font-bold text-neutral-900">
              Track Your Assiano Order
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close track order"
            className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-neutral-200 bg-white">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter Order Number (e.g. ASN-104928) or Phone"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xs focus:bg-white focus:outline-none focus:border-black font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#141416] hover:bg-[#E10613] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>
          <p className="text-[11px] text-neutral-500 mt-2">
            Tip: You can track via the Order ID from your receipt or your registered mobile number.
          </p>
        </div>

        {/* Tracking Details */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {matchedOrder ? (
            <div className="space-y-6">
              {/* Status Header Banner */}
              <div className="bg-[#FAFAF8] p-4 rounded-xs border border-neutral-200 flex justify-between items-center">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Order Number
                  </span>
                  <span className="text-base font-mono font-bold text-[#E10613]">
                    {matchedOrder.orderId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-500 block">
                    Estimated Delivery
                  </span>
                  <span className="text-xs font-medium text-neutral-800">
                    {matchedOrder.estimatedDelivery}
                  </span>
                </div>
              </div>

              {/* Step Timeline */}
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
                  Delivery Progress
                </span>

                <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-neutral-200">
                  {steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                          step.done ? 'bg-[#E10613] text-white' : 'bg-neutral-200 text-neutral-500'
                        }`}
                      >
                        <step.icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="pt-0.5">
                        <span className={`text-xs font-bold block ${step.done ? 'text-neutral-900' : 'text-neutral-500'}`}>
                          {step.label}
                        </span>
                        <span className="text-[11px] text-neutral-500">{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order recipient details */}
              <div className="p-3 bg-neutral-50 rounded-xs border border-neutral-200 text-xs text-neutral-600 space-y-1">
                <div>
                  <strong>Recipient:</strong> {matchedOrder.customerName} (+880 {matchedOrder.customerPhone})
                </div>
                <div>
                  <strong>Destination:</strong> {matchedOrder.deliveryAddress}, {matchedOrder.district}
                </div>
                <div>
                  <strong>Payable Amount:</strong> <span className="font-mono font-bold text-neutral-900">৳ {matchedOrder.total.toLocaleString()}</span> ({matchedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'})
                </div>
              </div>
            </div>
          ) : hasSearched ? (
            <div className="py-12 text-center">
              <Package className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-neutral-800">No active parcel found</h4>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto mt-1">
                We couldn't locate an order matching "{query}". Please verify the digits or contact Assiano WhatsApp care at +880 1712-345678.
              </p>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-neutral-500">
              Enter your Order Number above to see live logistics tracking.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FAFAF8] border-t border-neutral-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-neutral-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
