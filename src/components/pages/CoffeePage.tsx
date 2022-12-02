import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CoffeePage: React.FC = () => {
  const { id } = useParams();
  const [coffee, setCoffee] = React.useState<{ img: string; title: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(
          'https://635ef34fed25a0b5fe4fc7fc.mockapi.io/coffees/' + id,
        );
        setCoffee(data);
      } catch (e) {
        alert('Fatal error \nProduct not fount');
        console.error(e);
        navigate(-1);
      }
    }
    fetchItem();
  }, [id, navigate]);

  if (!coffee) {
    return <>Завантажуємо...</>;
  }

  return (
    <>
      <div className="container">
        <div className="item-block solo">
          <img className="item-block__image" src={coffee.img} alt="item" />
          <h4 className="item-block__title">{coffee.title}</h4>
          <button className="button button--black">
            <span onClick={() => navigate(-1)}>Повернутися</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default CoffeePage;
