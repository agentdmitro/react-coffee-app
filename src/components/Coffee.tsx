import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, cartItem, decrementItemCount, removeFromCart } from '../redux/slices/cartSlice';

type CoffeeProps = {
  id: string;
  title: string;
  price: number;
  img: string;
  types: any;
  sizes: [string];
  count: number;
};

export const Coffee: React.FC<CoffeeProps> = ({ id, title, price, img, sizes, types }) => {
  const dispatch = useDispatch();
  const typeNames = ['без сиропу', 'з сиропом'];
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);

  const addedItems = useSelector((state: any) =>
    state.cart.items.find(
      (obj: any) =>
        obj.id === id &&
        Number(obj.size) === Number(sizes[activeSize]) &&
        String(obj.type) === String(typeNames[activeType]),
    ),
  );

  const coffeeCount = addedItems ? addedItems.count : 0;

  const onAddToCart = () => {
    const item: cartItem = {
      id,
      title,
      price,
      img,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addToCart(item));
  };

  const onRemoveFromCart = (id: any) => {
    const item: cartItem = {
      id,
      title,
      price,
      img,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(decrementItemCount(item));
    if (coffeeCount === 1) {
      dispatch(removeFromCart(item));
    }
  };

  return (
    <div className="item-block">
      <Link to={`/coffee/${id}`}>
        <img className="item-block__image" src={img} alt="item" />
      </Link>
      <h4 className="item-block__title">{title}</h4>
      <div className="item-block__selector">
        <ul>
          {types.map((type: any, index: number) => (
            <li
              key={index}
              onClick={() => setActiveType(index)}
              className={activeType === index ? 'active' : ''}>
              {typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? 'active' : ''}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="item-block__bottom">
        <div className="item-block__price">Від {price}₴</div>
        {coffeeCount >= 1 && (
          <button
            onClick={() => onRemoveFromCart(id)}
            className="button button--outline button--remove">
            <span>-</span>
          </button>
        )}
        <button onClick={onAddToCart} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          {coffeeCount === 0 && <span>Додати</span>}
          {coffeeCount > 0 && <i>{coffeeCount}</i>}
        </button>
      </div>
    </div>
  );
};
