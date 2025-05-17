'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Room, CartContextType } from '@/types/cart';
import { calculateNights } from '@/utils/cartUtils';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          
          const cartWithDates = parsedCart.map((item: any) => ({
            ...item,
            checkIn: new Date(item.checkIn),
            checkOut: new Date(item.checkOut)
          }));
          setItems(cartWithDates);
        } catch (error) {
          console.error('Ошибка при загрузке корзины:', error);
        }
      }
    }
  }, []);
  
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);
  
  
  const totalPrice = items.reduce((total, item) => {
    const nights = calculateNights(item.checkIn, item.checkOut);
    return total + (item.room.price * nights);
  }, 0);
  

  const addToCart = (room: Room, checkIn: Date, checkOut: Date, adults: number, children: number) => {

    const existingItemIndex = items.findIndex(item => item.room._id === room._id);
    
    if (existingItemIndex >= 0) {
 
      const updatedItems = [...items];
      updatedItems[existingItemIndex] = {
        room,
        checkIn,
        checkOut,
        adults,
        children
      };
      setItems(updatedItems);
    } else {

      setItems([...items, { room, checkIn, checkOut, adults, children }]);
    }
  };
  

  const removeFromCart = (roomId: string) => {
    setItems(items.filter(item => item.room._id !== roomId));
  };
  

  const clearCart = () => {
    setItems([]);
  };
  
  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      totalPrice,
      itemCount: items.length
    }}>
      {children}
    </CartContext.Provider>
  );
};