export interface Room {
  _id: string;
  name: string;
  price: number;
  images: string[];
  slug: {
    current: string;
  };
}

export interface CartItem {
  room: Room;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (room: Room, checkIn: Date, checkOut: Date, adults: number, children: number) => void;
  removeFromCart: (roomId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
}