'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import CartList from '@/components/cart/CartList';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { CreateBookingDto } from '@/models/room';
import { createBooking } from '@/libs/apis';

const CartPage = () => {
  const { items, removeFromCart, clearCart, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  
  const handleCheckout = async () => {
    if (!session?.user) {
      // Сохраняем текущий URL для редиректа после логина
      localStorage.setItem('checkoutRedirect', '/cart');
      router.push('/login?redirect=/cart');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Создаем бронирования для каждого номера в корзине
      for (const item of items) {
        const bookingData: CreateBookingDto = {
          user: session.user.id,
          hotelRoom: item.room._id,
          checkinDate: item.checkIn.toISOString(),
          checkoutDate: item.checkOut.toISOString(),
          numberOfDays: Math.ceil((item.checkOut.getTime() - item.checkIn.getTime()) / (1000 * 60 * 60 * 24)),
          adults: item.adults,
          children: item.children,
          totalPrice: item.room.price * Math.ceil((item.checkOut.getTime() - item.checkIn.getTime()) / (1000 * 60 * 60 * 24)),
          discount: 0 // Можно добавить логику скидок позже
        };
        
        await createBooking(bookingData);
      }
      
      // Очищаем корзину и перенаправляем на страницу успеха
      clearCart();
      router.push('/checkout-success');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (items.length === 0) {
    return <EmptyCart />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Ваша корзина</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <CartList 
            items={items} 
            onRemove={removeFromCart} 
            onClearCart={clearCart} 
          />
          
          <div className="lg:col-span-1">
            <CartSummary 
              items={items} 
              totalPrice={totalPrice} 
              isProcessing={isProcessing} 
              user={session?.user} 
              onCheckout={handleCheckout} 
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;