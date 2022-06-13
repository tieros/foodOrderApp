import CustomButton from '../../atoms/increase-decrease-buttons';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import Card from '../../atoms/card';
import img from '../../assets/hero.png';

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
        <Card className='menu-items'>
            <li className='meal'>
                <img src={img} alt={name} className='meal-img' />
                <div className='meal-item-info'>
                        <h3>{name}</h3>
                        <p className='description'>{description}</p>
                        <p className='price'>{price}$</p>
               </div>
               <div className='meal-item-buttons'>
               <CustomButton id={id} onAddToCart={sendToCartHandler} />
               </div>
           </li>
        </Card>
       );
 }