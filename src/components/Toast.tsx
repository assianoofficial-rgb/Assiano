import React from 'react';
import { CheckCircle2, ShoppingBag, Heart, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
  title: string;
  subtitle?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  onOpenCart?: () => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss, onOpenCart }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#141416] text-white p-4 rounded-sm shadow-xl border border-neutral-700 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'cart' ? (
              <div className="w-8 h-8 rounded-full bg-[#E10613] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
            ) : toast.type === 'wishlist' ? (
              <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            )}
            <div>
              <p className="text-xs font-semibold text-white leading-tight">{toast.title}</p>
              {toast.subtitle && (
                <p className="text-[11px] text-neutral-400 mt-0.5">{toast.subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {toast.type === 'cart' && onOpenCart && (
              <button
                onClick={onOpenCart}
                className="text-[11px] text-[#E10613] hover:underline font-bold whitespace-nowrap cursor-pointer"
              >
                View Bag
              </button>
            )}
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-neutral-400 hover:text-white p-1"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
