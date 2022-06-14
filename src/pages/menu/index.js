import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { mealActions } from "../../store/meals";
import { database } from '../../firebase';
import { ref, onValue, child } from "firebase/database";
import { uiActions } from "../../store/ui";
import MealsList from "../../organisms/mealsList";

export default function Menu(){

    const dispatch = useDispatch();
    const reduxMeals = useSelector((state) => state.meal.meals);

    const dbMeals = () => {
        dispatch(uiActions.setIsLoading(true));
        let meals = [];
        const dbRef = ref(database);
        onValue(child(dbRef, '/meals'), (snapshot) => {
            const data = snapshot.val();
            console.log(data);

            for (const key in data) {
                meals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }

            console.log(meals);
            dispatch(mealActions.setMeals(meals));
            setMeals(meals);
            dispatch(uiActions.setIsLoading(false));
        });
        return meals;
    };
    
    const [meals, setMeals] = useState(reduxMeals ? reduxMeals : dbMeals());

    return (
        <div className='menu-cont'>
            <MealsList data={meals}/>
        </div>
    );
}