import React from 'react';
import { SearchContext } from '../../App';
import debounce from 'lodash.debounce';
import qs from 'qs';

const Search: React.FC<any> = () => {
  const params = qs.parse(window.location.search.substring(1));

  const [inputValue, setInputValue] = React.useState<any>(params.searchValue);
  // prettier-ignore
  const { setSearchInputValue, setPages } = React.useContext(SearchContext);

  React.useEffect(() => {
    setSearchInputValue?.(inputValue);
  }, []);
  // prettier-ignore
  const inputRef = React.useRef<HTMLInputElement>(null);

  const clearInput = () => {
    setInputValue('');
    setSearchInputValue('');
    inputRef.current?.focus();
  };

  const changeInputValueGlobal = React.useCallback(
    debounce((str: string) => {
      setPages(1);
      setSearchInputValue(str);
    }, 1000),
    [],
  );

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    changeInputValueGlobal(e.target.value);
  };

  return (
    <>
      <div className="header__search">
        <div className="icon">
          <img
            src="https://st2.depositphotos.com/4060975/8056/v/600/depositphotos_80565476-stock-illustration-magnifier-vector-icon.jpg"
            alt=""
          />
        </div>
        <input
          ref={inputRef}
          className={`input header__input`}
          type="text"
          placeholder="Пошук кави..."
          value={inputValue}
          onChange={onChangeInputValue}
        />
        {inputValue && (
          <div className="clearIcon" onClick={clearInput}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Clear_Icon.svg/500px-Clear_Icon.svg.png"
              alt=""
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
