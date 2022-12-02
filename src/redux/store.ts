import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import CartReducer from './slices/cartSlice';
import CoffeeReducer from './slices/coffeeSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: CartReducer,
    coffee: CoffeeReducer,
  },
});

// type RootState = ReturnType<typeof store.getState>;
