import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCoffeeFromLS } from '../../utils/getCoffeFromLS';
import { getTotalPrice } from '../../utils/getTotalPrice';

export type cartItem = {
  id: string;
  title: string;
  price: number;
  img: string;
  type: string;
  size: string;
  count: number;
};

const { items, totalPrice } = getCoffeeFromLS();

interface CartSliceState {
  totalPrice: number;
  items: cartItem[];
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: <CartSliceState>{
    totalPrice,
    items,
  },
  reducers: {
    addToCart: (state, action: PayloadAction<cartItem>) => {
      const findItem: any = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        if (findItem.count >= 5) {
          return;
        } else {
          findItem.count++;
        }
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = getTotalPrice(state.items);
    },
    decrementItemCount: (state, action: PayloadAction<string>) => {
      const findItem: any = state.items.find((obj: any) => obj.id === action.payload);
      if (findItem) {
        if (findItem.count <= 1) {
          return;
        } else {
          findItem.count--;
        }
      }
      state.totalPrice = getTotalPrice(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((obj: any) => obj.id !== action.payload);
      if (state.items.length <= 0) {
        state.totalPrice = 0;
      }
      state.totalPrice = getTotalPrice(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decrementItemCount } = cartSlice.actions;

export default cartSlice.reducer;
