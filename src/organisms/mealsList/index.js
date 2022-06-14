import { useState } from 'react';
import { useSelector } from 'react-redux';
import style from './mealsList.module.scss';
import MealItem from '../../molecules/mealtem';

export default function MealsList(props) {

    const isLoading = useSelector((state) => state.ui.isLoading);
    const [error, setError] = useState(null);

    const { data } = props;

    if (data === null) {
        setError('Error loading meals');
    }

    if (isLoading) {
        return (
            <section className={style.loading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={style.error}>
                <p>{error}</p>
            </section>
        );
    }

  const mealsList = data.map((meal) => (
      <MealItem
          id={meal.id}
          key={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
      />
  ));

    return (
        <section className={style.meals}>
            <ul className={style.menu}>{mealsList}</ul>            
        </section>
    );
}
