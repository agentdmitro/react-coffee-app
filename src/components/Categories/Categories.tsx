import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCategory } from '../../redux/slices/filterSlice';
import { SearchContext } from '../../App';

export const Categories: React.FC = () => {
  const { setPages } = React.useContext<any>(SearchContext);

  const addActiveCat = React.useCallback((index: number) => {
    setPages(1);
    dispatch(changeCategory(index));
  }, []);

  const categories = ['Всі', 'В зернах', 'Розчинна', 'Пакетик', 'Імпортна'];

  const filter = useSelector((state: any) => state.filter.categoryId);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => (
          <li
            key={index}
            onClick={() => addActiveCat(index)}
            className={Number(filter) === index ? `${Number(filter) ? '' : 'active'} active` : ''}>
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};
