import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSort, changeSortType } from '../../redux/slices/filterSlice';

type sortListInfo = {
  name: string;
  sort: string;
};

type ClickOnRef = MouseEvent & {
  path: Node[];
};

export const sortList: sortListInfo[] = [
  { name: 'популярністю', sort: 'rating' },
  { name: 'ціною', sort: 'price' },
  { name: 'алфавітом', sort: 'title' },
];

export const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector((state: any) => state.filter.sort);
  const sortType = useSelector((state: any) => state.filter.sortType);
  const sortRef = React.useRef<null | HTMLDivElement>(null);
  const [popupVisible, setPopupVisible] = React.useState(false);

  const addSortActive = (obj: sortListInfo) => {
    dispatch(setSort(obj));
    setPopupVisible(false);
  };

  const setSortType = () => {
    dispatch(changeSortType());
  };

  React.useEffect(() => {
    const handleClickOutsideRef = (e: MouseEvent) => {
      const _event = e as ClickOnRef;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setPopupVisible(false);
      }
    };
    document.body.addEventListener('click', handleClickOutsideRef);

    return () => document.body.removeEventListener('click', handleClickOutsideRef);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <button onClick={setSortType} className={`${sortType === 'asc' ? 'asc' : 'desc'}`}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        </button>
        <b>Сортувати за:</b>
        <span onClick={() => setPopupVisible(!popupVisible)}>{sort.name}</span>
      </div>
      {popupVisible && (
        <div className="sort__popup">
          <ul>
            {sortList.map((item, index) => (
              <li
                key={index}
                onClick={() => addSortActive(item)}
                className={sort.sort === item.sort ? 'active' : ''}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
