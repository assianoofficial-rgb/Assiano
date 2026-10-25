import { CategoryType, PageType, Product } from '../types';

export function getProductUrl(productId: string): string {
  return `/product/${productId}`;
}

export interface ParsedRoute {
  page: PageType;
  category?: CategoryType;
  productId?: string;
  searchQuery?: string;
}

export function parseCurrentUrl(): ParsedRoute {
  if (typeof window === 'undefined') {
    return { page: 'home' };
  }

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const searchParams = new URLSearchParams(window.location.search);

  if (pathname === '' || pathname === '/') {
    return { page: 'home' };
  }

  if (pathname === '/about') {
    return { page: 'about' };
  }

  if (pathname === '/contact') {
    return { page: 'contact' };
  }

  if (pathname === '/cart') {
    return { page: 'cart' };
  }

  if (pathname === '/checkout') {
    return { page: 'checkout' };
  }

  if (pathname.startsWith('/product/')) {
    const parts = pathname.split('/').filter(Boolean);
    const productId = parts[1];
    return {
      page: 'product',
      productId: productId ? decodeURIComponent(productId) : undefined,
    };
  }

  if (pathname.startsWith('/shop')) {
    const parts = pathname.split('/').filter(Boolean);
    const cat = parts[1] as CategoryType;
    const queryCat = searchParams.get('category') as CategoryType;
    return {
      page: 'shop',
      category: cat || queryCat || 'all',
      searchQuery: searchParams.get('q') || '',
    };
  }

  // Fallback to home
  return { page: 'home' };
}

export function navigateTo(path: string, replace = false) {
  if (typeof window === 'undefined') return;

  const current = window.location.pathname + window.location.search;
  if (current !== path) {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
  }

  // Dispatch popstate event to notify routing listeners
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function updatePageTitle(title: string) {
  if (typeof document !== 'undefined') {
    document.title = title ? `${title} | Assiano` : 'Assiano | Contemporary & Modest Fashion';
  }
}
