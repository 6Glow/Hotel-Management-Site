'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { CartItem as CartItemType } from "@/types/cart";
import { formatDate, calculateNights } from "@/utils/cartUtils";

interface CartItemProps {
  item: CartItemType;
  onRemove: (roomId: string) => void;
}

const CartItemComponent = ({ item, onRemove }: CartItemProps) => {
  const nights = calculateNights(item.checkIn, item.checkOut);
  const itemTotal = item.room.price * nights;
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/4">
          {item.room.images && item.room.images.length > 0 && (
            <div className="relative h-24 w-full">
              <Image
                src={item.room.images[0]}
                alt={item.room.name}
                fill
                className="object-cover rounded"
              />
            </div>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div>
              <h3 className="font-semibold text-lg">{item.room.name}</h3>
              <p className="text-gray-600 text-sm">
                {formatDate(item.checkIn)} - {formatDate(item.checkOut)} • {nights} {nights === 1 ? 'ночь' : nights < 5 ? 'ночи' : 'ночей'}
              </p>
              <p className="text-gray-600 text-sm">
                {item.adults} {item.adults === 1 ? 'взрослый' : 'взрослых'}, {item.children} {item.children === 1 ? 'ребенок' : item.children < 5 ? 'ребенка' : 'детей'}
              </p>
            </div>
            <div className="mt-2 sm:mt-0 text-right">
              <p className="font-semibold">${itemTotal}</p>
              <p className="text-gray-500 text-sm">${item.room.price} за ночь</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Link href={`/rooms/${item.room.slug.current}`} className="text-blue-600 hover:underline text-sm">
              Посмотреть детали
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => onRemove(item.room._id)}
            >
              Удалить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;