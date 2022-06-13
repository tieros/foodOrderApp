import { useEffect, useState } from 'react';
import style from './mealsList.module.scss';
import Card from '../../atoms/card';
import MealItem from '../../molecules/mealtem';
import { ref, onValue, child } from 'firebase/database';
import { database } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { mealActions } from '../../store/meals';

export default function MealsList() {

    const reduxMeals = useSelector(state => state.meal.meals);

    const [meals, setMeals] = useState(reduxMeals);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (reduxMeals.length === 0) {
            setIsLoading(true);
            const dbRef = ref(database);

            onValue(child(dbRef, '/meals'), (snapshot) => {
                const data = snapshot.val();
                console.log(data);
                const loadedMeals = [];

                for (const key in data) {
                    loadedMeals.push({
                        id: key,
                        name: data[key].name,
                        description: data[key].description,
                        price: data[key].price,
                    });
                }

                console.log(loadedMeals);
                dispatch(mealActions.setMeals(loadedMeals));
                setMeals(loadedMeals);
                setIsLoading(false);
            });
        }
    }, [dispatch, meals, reduxMeals]);

    if (meals === null) {
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

  const mealsList = meals.map((meal) => (
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
