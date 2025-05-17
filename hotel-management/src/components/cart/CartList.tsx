'use client';

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { CartItem as CartItemType } from "@/types/cart";
import CartItemComponent from "./CartItem";

interface CartListProps {
  items: CartItemType[];
  onRemove: (roomId: string) => void;
  onClearCart: () => void;
}

const CartList = ({ items, onRemove, onClearCart }: CartListProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border overflow-hidden">
        {items.map((item, index) => (
          <div 
            key={item.room._id} 
            className={`${index > 0 ? 'border-t' : ''}`}
          >
            <CartItemComponent item={item} onRemove={onRemove} />
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between">
        <Link href="/rooms">
          <Button variant="outline">Продолжить бронирование</Button>
        </Link>
        <Button 
          variant="outline" 
          className="text-red-500 border-red-500 hover:bg-red-50 dark:hover:bg-red-900"
          onClick={onClearCart}
        >
          Очистить корзину
        </Button>
      </div>
    </div>
  );
};

export default CartList;