import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CartEmpty: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          Тут нічого немає <span>😕</span>
        </h2>
        <p>Певно, ви не зробили ще жодного замовлення</p>
        <img src="https://cdn-icons-png.flaticon.com/512/4555/4555971.png" alt="Empty cart" />
        <button onClick={() => navigate(-1)} className="button button--black">
          <span>Повернутися</span>
        </button>
      </div>
    </div>
  );
};
