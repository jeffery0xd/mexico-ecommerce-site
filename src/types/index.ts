export interface Product {
  id: string;
  name: string;
  variant?: string;
  price: number;
  description?: string;
  category_id?: number;
  images?: string[];
  buy_link?: string;
  featured?: boolean;
  is_pinned?: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}