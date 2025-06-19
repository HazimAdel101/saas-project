export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: ProductCategory;
    features: string[];
    image: string;
    rating: number;
    reviewCount: number;
    isPopular?: boolean;
    isFeatured?: boolean;
    billingPeriod: 'month' | 'year';
    trialDays?: number;
    apiAccess?: boolean;
  }
  
  export interface ProductCategory {
    id: string;
    name: string;
    nameAr: string;
    icon: string;
    count: number;
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    subscriptions: Subscription[];
    createdAt: Date;
  }
  
  export interface Subscription {
    id: string;
    productId: string;
    product: Product;
    userId: string;
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    endDate: Date;
    renewalDate: Date;
    price: number;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface Language {
    code: 'en' | 'ar';
    name: string;
    nativeName: string;
  }