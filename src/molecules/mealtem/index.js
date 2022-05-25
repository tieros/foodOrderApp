import CustomButton from '../../atoms/increase-decrease-buttons';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import style from './mealItem.module.scss';

 export default function MealItem(props) {

    const { id, name, amount, price, description } = props;
    const dispatch = useDispatch();
    const updatedPrice = `$${price.toFixed(2)}`;

    const addToCartHandler = () => {
         dispatch(cartActions.addCartItem({
            id,
            name,
            amount,
            updatedPrice
         }))
     }
       return (
           <li className={style.meal}>
               <div>
                   <h3>{name}</h3>
                   <div className={style.description}>{description}</div>
                   <div className={style.price}>{updatedPrice}</div>
               </div>
               <div>
                   <CustomButton id={id} onAddToCart={addToCartHandler} />
               </div>
           </li>
       );
 }