import CustomButton from '../../atoms/increase-decrease-buttons';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';

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
           <li className='meal'>
               <div>
                   <h3>{name}</h3>
                   <div className='description'>{description}</div>
                   <div className='price'>{price}</div>
               </div>
               <div className='meal-buttons-container'>
                   <CustomButton id={id} onAddToCart={sendToCartHandler} 
                />
               </div>
           </li>
       );
 }