import CustomButton from '../../atoms/increase-decrease-buttons';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import style from './mealItem.module.scss';

 export default function MealItem(props) {

    const { id, name, price, description } = props;
    const dispatch = useDispatch();

    const sendToCartHandler = (amount) => {
         dispatch(
             cartActions.sendToCart({
                 id,
                 name,
                 amount,
                 price,
             }),
         );
     }

       return (
           <li className={style.meal}>
               <div>
                   <h3>{name}</h3>
                   <div className={style.description}>{description}</div>
                   <div className={style.price}>{price}</div>
               </div>
               <div>
                   <CustomButton id={id} onAddToCart={sendToCartHandler} 
                />
               </div>
           </li>
       );
 }