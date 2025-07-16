'use client';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  composition: string;
  form: string;
  image: string;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLOSE_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };

    case 'REMOVE_FROM_CART':
      const itemToRemove = state.items.find(item => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0)
      };

    case 'UPDATE_QUANTITY':
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;
      
      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.price * quantityDiff)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    total: 0
  });

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  return (
    <CartContext.Provider value={{
      state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
