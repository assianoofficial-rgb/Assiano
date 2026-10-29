import { OrderDetails } from '../types';

export const SPLITFORMS_ACCESS_KEY = '46f4731d45e9468fa5ddfc1a172d3af7';
const SPLITFORMS_ENDPOINT = 'https://splitforms.com/api/submit';

/**
 * Initializes the SplitForms analytics & tracker script
 */
export function initSplitFormsTracker(): void {
  if (typeof window === 'undefined') return;
  const src = 'https://splitforms.com/embed.js';
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

export interface SplitFormsResponse {
  success: boolean;
  message?: string;
  payment_url?: string;
  data?: any;
}

/**
 * Sends complete, comprehensive order details to the store owner via SplitForms API.
 * Ensures zero data loss for any product (current or future).
 */
export async function sendOrderNotification(
  order: OrderDetails,
  deliveryNote?: string
): Promise<SplitFormsResponse> {
  try {
    initSplitFormsTracker();

    // Build comprehensive itemized product breakdown
    const itemsDetailedList = order.items
      .map((item, idx) => {
        const unitPrice = item.customPrice ?? item.product.price;
        const lineTotal = unitPrice * item.quantity;
        return [
          `Item #${idx + 1}: ${item.product.name}`,
          `  • Product Code: ${item.product.id.toUpperCase()}`,
          `  • Color: ${item.selectedColor || 'Default'}`,
          `  • Size: ${item.selectedSize || 'Standard'}`,
          `  • Quantity: ${item.quantity}`,
          `  • Unit Price: Tk ${unitPrice}`,
          `  • Total: Tk ${lineTotal}`,
        ].join('\n');
      })
      .join('\n\n');

    const paymentLabel =
      order.paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : order.paymentMethod === 'bkash'
        ? `bKash Mobile Banking (TrxID: ${order.bkashTrxId || 'N/A'})`
        : order.paymentMethod === 'nagad'
        ? `Nagad Mobile Banking (TrxID: ${order.bkashTrxId || 'N/A'})`
        : 'Credit/Debit Card';

    const deliveryAreaLabel =
      order.deliveryArea === 'dhaka'
        ? 'Inside Dhaka City (Home Delivery: Tk 60)'
        : 'Outside Dhaka (Courier Delivery: Tk 120)';

    // Formatted complete invoice message so nothing is missed
    const fullOrderMessage = `
==================================================
🛍️ NEW CUSTOMER ORDER RECEIVED: ${order.orderId}
==================================================

👤 CUSTOMER DETAILS:
--------------------------------------------------
• Customer Name   : ${order.customerName}
• Contact Phone   : ${order.customerPhone}
• District        : ${order.district}
• Delivery Address: ${order.deliveryAddress}
• Delivery Zone   : ${deliveryAreaLabel}
${deliveryNote ? `• Customer Note   : ${deliveryNote}\n` : ''}
📦 ORDERED GARMENTS & ITEMS:
--------------------------------------------------
${itemsDetailedList}

💰 FINANCIAL & BILLING SUMMARY:
--------------------------------------------------
• Subtotal        : Tk ${order.subtotal}
• Delivery Charge : Tk ${order.shippingFee}
• Voucher Discount: Tk ${order.discount}
--------------------------------------------------
💵 TOTAL PAYABLE  : Tk ${order.total}
💳 Payment Method : ${paymentLabel}
${order.bkashTrxId ? `🔖 Transaction ID : ${order.bkashTrxId}\n` : ''}
--------------------------------------------------
📅 Order Placed At: ${order.createdAt}
🚚 Delivery Window: ${order.estimatedDelivery}
==================================================
`;

    const data = new FormData();
    data.set('access_key', SPLITFORMS_ACCESS_KEY);
    data.set(
      'subject',
      `🚨 New Order ${order.orderId}: Tk ${order.total} - ${order.customerName} (${order.district})`
    );
    data.set('order_id', order.orderId);
    data.set('name', order.customerName);
    data.set('customer_name', order.customerName);
    data.set('phone', order.customerPhone);
    data.set('customer_phone', order.customerPhone);
    data.set('district', order.district);
    data.set('delivery_address', order.deliveryAddress);
    data.set('delivery_zone', deliveryAreaLabel);
    data.set('payment_method', paymentLabel);
    if (order.bkashTrxId) {
      data.set('transaction_id', order.bkashTrxId);
    }
    if (deliveryNote) {
      data.set('special_instructions', deliveryNote);
    }
    data.set('subtotal', `Tk ${order.subtotal}`);
    data.set('delivery_charge', `Tk ${order.shippingFee}`);
    data.set('discount', `Tk ${order.discount}`);
    data.set('total_amount', `Tk ${order.total}`);
    data.set('items_summary', itemsDetailedList);
    data.set('message', fullOrderMessage);

    const res = await fetch(SPLITFORMS_ENDPOINT, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    const json = await res.json();
    return {
      success: !!json.success,
      message: json.message || (json.success ? 'Order submitted successfully' : 'Error submitting order'),
      payment_url: json.payment_url,
    };
  } catch (err: any) {
    console.error('SplitForms order submission error:', err);
    return {
      success: false,
      message: err?.message || 'Network error occurred while submitting order',
    };
  }
}

/**
 * Sends contact inquiries to store owner via SplitForms
 */
export async function sendContactInquiry(data: {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
}): Promise<SplitFormsResponse> {
  try {
    initSplitFormsTracker();

    const formData = new FormData();
    formData.set('access_key', SPLITFORMS_ACCESS_KEY);
    formData.set('subject', `📩 Customer Inquiry: ${data.name} (${data.subject || 'General'})`);
    formData.set('name', data.name);
    formData.set('phone', data.phone);
    if (data.email) formData.set('email', data.email);
    if (data.subject) formData.set('inquiry_type', data.subject);
    formData.set('message', data.message);

    const res = await fetch(SPLITFORMS_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    const json = await res.json();
    return {
      success: !!json.success,
      message: json.message || (json.success ? 'Message sent' : 'Error sending message'),
    };
  } catch (err: any) {
    console.error('SplitForms contact submission error:', err);
    return {
      success: false,
      message: err?.message || 'Network error',
    };
  }
}
