import React from 'react';
import './index.scss';
import Home from './components/pages/Home';
import { Routes, Route } from 'react-router-dom';
import { Cart } from './components/pages/Cart';
import ErrorPage from './components/pages/ErrorPage';
import CoffeePage from './components/pages/CoffeePage';
import { MainLayout } from './layouts/MainLayout';

export type GlobalContent = {
  searchInputValue: string;
  setSearchInputValue: (c: string) => void;
  setPages: (c: number) => void;
  pages: number;
};

export const SearchContext = React.createContext<GlobalContent>({
  searchInputValue: '',
  setSearchInputValue: () => {},
  setPages: () => {},
  pages: 1,
});

function App() {
  const [searchInputValue, setSearchInputValue] = React.useState<string>('');
  const [pages, setPages] = React.useState<number>(1);

  return (
    <>
      <SearchContext.Provider value={{ searchInputValue, setSearchInputValue, setPages, pages }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="coffee/:id" element={<CoffeePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </SearchContext.Provider>
    </>
  );
}

export default App;
