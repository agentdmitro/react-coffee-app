import React, { useState } from 'react';
import axios from 'axios';
import { Categories } from '../Categories/Categories';
import { Coffee } from '../Coffee';
import { Pagination } from '../Pagination/Pagination';
import { Skeleton } from '../Skeleton/Skeleton';
import { Sort } from '../Sort/Sort';
import { SearchContext } from '../../App';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const DB_URL = `https://635ef34fed25a0b5fe4fc7fc.mockapi.io/coffees`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeCat = useSelector((state: any) => state.filter.categoryId);
  const sortActive = useSelector((state: any) => state.filter.sort);
  const sortType = useSelector((state: any) => state.filter.sortType);

  const [itemsLimit] = useState(9);
  const [isLoading, setIsLoading] = useState(true);
  const { searchInputValue, pages, setPages } = React.useContext(SearchContext);
  const [coffeesArray, setCoffeesArray] = useState([]);
  const [allCoffees, setAllCoffees] = useState([]);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const currentCategory =
    activeCat === 0 || Boolean(activeCat) === false ? '' : `&category=${activeCat}`;

  const searchValue = searchInputValue ? searchInputValue : '';

  const fetchCoffees = () => {
    setIsLoading(true);
    try {
      const fetchData = async () => {
        const [currentCoffees, allCoffees, filteredCoffees] = await Promise.all([
          // prettier-ignore
          axios.get(`${DB_URL}?page=${pages}${currentCategory}&limit=${itemsLimit}&sortBy=${sortActive.sort}&order=${sortType}&search=${searchValue}`),
          axios.get(`${DB_URL}?&search=${searchValue}${currentCategory}`),
          // prettier-ignore
          axios.get(`${DB_URL}?search=${searchValue}${currentCategory}&page=${pages}&limit=6&sortBy=${sortActive.sort}&order=${sortType}`,),
        ]);
        setIsLoading(false);
        setCoffeesArray(searchInputValue ? filteredCoffees.data : currentCoffees.data);
        setAllCoffees(allCoffees.data);
      };
      fetchData();
    } catch (e) {
      alert('Сталася помилка під час обробки даних');
      console.log(e);
    }
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCat: Number(activeCat) === Number(0) ? '' : activeCat,
        sort: sortActive,
        sortType: sortType,
        pages: pages,
        searchValue: searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [activeCat, sortActive, sortType, pages, searchValue, itemsLimit, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const search = params.searchValue ? params.searchValue : '';
      if (params.pages) {
        setPages(Number(params.pages));
      }

      dispatch(
        setFilters({
          search,
          ...params,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch, setPages]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      // navigate('');
      fetchCoffees();
    }
    isSearch.current = false;
  }, [activeCat, sortActive, sortType, pages, searchInputValue, itemsLimit, navigate]);

  const coffeesItems = coffeesArray
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue)) {
        return true;
      }
      return false;
    })
    .map((obj: any, index) => <Coffee key={index} {...obj} />);

  const skeletons = [...Array(itemsLimit)].map((obj, index) => <Skeleton key={index} />);

  const paginationCount = Math.ceil(allCoffees.length / itemsLimit);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Весь список</h2>
      <div className="content__items">{isLoading ? skeletons : coffeesItems}</div>

      {paginationCount === 1 || allCoffees.length < itemsLimit ? (
        ''
      ) : (
        <Pagination paginationCount={paginationCount} />
      )}
    </div>
  );
};

export default Home;
