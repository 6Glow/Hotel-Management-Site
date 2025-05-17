'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const CheckoutSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-md">
          <div className="mb-4 flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Заказ успешно оформлен!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Спасибо за ваш заказ. Мы отправили подтверждение на вашу электронную почту.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/users/me">
              <Button variant="outline">Мои бронирования</Button>
            </Link>
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccessPage;