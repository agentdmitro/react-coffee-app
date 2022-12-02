import { getTotalPrice } from './getTotalPrice';
export const getCoffeeFromLS = () => {
  const dataLS = localStorage.getItem('coffeeCartItems');
  const items = dataLS ? JSON.parse(dataLS) : [];
  const totalPrice = getTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
