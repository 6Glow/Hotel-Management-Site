export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    month: 'short',
    day: 'numeric'
  });
};

export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; 
  const diffDays = Math.round(Math.abs((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / oneDay));
  return diffDays;
};

export const calculateTaxes = (subtotal: number): number => {
  return Math.round(subtotal * 0.1 * 100) / 100; 
};