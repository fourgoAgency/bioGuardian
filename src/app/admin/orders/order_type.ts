import { Timestamp } from "firebase/firestore";

export interface OrderItem {
  name: string;
  form?: string;
  quantity: number;
  price: number;
  composition?: string;
  image?: string;
  id?: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  payment_method: string;
  shipping_address: string;
  total_items: number;
  status: string;
  created_at: Timestamp | Date;
  updated_at?: Timestamp | Date;
  notes?: string;
  items?: OrderItem[];
}
