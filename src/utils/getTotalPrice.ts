import { cartItem } from '../redux/slices/cartSlice';

export const getTotalPrice = (items: cartItem[]) => {
  return items.reduce((sum: number, obj: any) => obj.price * obj.count + sum, 0);
};
