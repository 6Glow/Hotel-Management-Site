'use client';

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { CartItem } from "@/types/cart";
import { calculateNights, calculateTaxes } from "@/utils/cartUtils";

interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
  isProcessing: boolean;
  user: any;
  onCheckout: () => void;
}

const CartSummary = ({ 
  items, 
  totalPrice, 
  isProcessing, 
  user, 
  onCheckout 
}: CartSummaryProps) => {
  const taxes = calculateTaxes(totalPrice);
  const grandTotal = totalPrice + taxes;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Сводка заказа</h2>
      
      {items.map((item) => {
        const nights = calculateNights(item.checkIn, item.checkOut);
        const itemTotal = item.room.price * nights;
        
        return (
          <div key={item.room._id} className="flex justify-between mb-2 text-sm">
            <span>{item.room.name} ({nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'})</span>
            <span>${itemTotal}</span>
          </div>
        );
      })}
      
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between mb-2">
          <span>Промежуточный итог</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Налоги и сборы (10%)</span>
          <span>${taxes}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
          <span>Итого</span>
          <span>${grandTotal}</span>
        </div>
      </div>
      
      <Button
        className="w-full mt-6 bg-primary hover:bg-primary/90"
        disabled={isProcessing}
        onClick={onCheckout}
      >
        {isProcessing ? "Обработка..." : "Перейти к оформлению"}
      </Button>
      
      {!user && (
        <Alert className="mt-4 bg-blue-50 text-blue-800 border-blue-100 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800">
          <AlertDescription>
            Пожалуйста, <Link href="/login?redirect=/cart" className="font-medium underline">войдите</Link> для оформления заказа.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>Продолжая, вы соглашаетесь с нашими Условиями обслуживания и Политикой конфиденциальности</p>
      </div>
    </div>
  );
};

export default CartSummary;