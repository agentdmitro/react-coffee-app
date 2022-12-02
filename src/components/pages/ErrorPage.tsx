import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Сторінку не знайдено <span>😕</span>
        </h2>
        <Link to={`/`} className="button button--black">
          <span>На головну</span>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
