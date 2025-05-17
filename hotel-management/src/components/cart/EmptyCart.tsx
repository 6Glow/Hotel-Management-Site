'use client';

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const EmptyCart = () => {
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
              className="text-gray-400 dark:text-gray-500"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Ваша корзина пуста</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Похоже, вы еще не добавили номера в корзину.
          </p>
          <Link href="/rooms">
            <Button className="bg-primary hover:bg-primary/90">
              Просмотреть номера
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmptyCart;