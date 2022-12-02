import React from 'react';
import { SearchContext } from '../../App';

type PaginationProps = {
  paginationCount: number;
};

export const Pagination: React.FC<PaginationProps> = ({ paginationCount }) => {
  const { pages, setPages } = React.useContext(SearchContext);

  const nextPage = () => {
    setPages(pages + 1);
  };

  const prevPage = () => {
    if (pages <= 1) {
      return;
    } else {
      setPages(pages - 1);
    }
  };

  return (
    <div className="pagination">
      {Number(pages) !== 1 && (
        <div className="pagination__num" onClick={prevPage}>
          {'<'}
        </div>
      )}

      {[...Array(paginationCount)].map((page, index) => (
        <div
          className={`pagination__num${Number(index + 1) === Number(pages) ? ' active' : ''}`}
          key={index}
          onClick={() => setPages(index + 1)}>
          {index + 1}
        </div>
      ))}
      {pages === paginationCount - 1 && (
        <div className="pagination__num" onClick={nextPage}>
          {'>'}
        </div>
      )}
    </div>
  );
};
