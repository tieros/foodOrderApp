import classes from './cartItem.module.scss';
import CustomButton from '../../atoms/increase-decrease-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';

export default function CartItem(props) {

const cartItems = useSelector((state) => state.cart.items);   
const dispatch = useDispatch();

    return (
         <ul className='cart-items'>
            {cartItems?.map((item) => (
                <li className={classes['cart-item']}>
                    <div>
                        <h2>{item.name}</h2>
                        <div className={classes.summary}>
                            <span className={classes.price}>{item.price}</span>
                            <span className={classes.amount}>x {item.amount}</span>
                        </div>
                    </div>
                    <div className={classes.actions}>
                        <CustomButton id={item.id} onAddToCart={(amount) => {dispatch(cartActions.sendToCart({
                            id: item.id,
                            name: item.name,
                            amount,
                            price: item.price,
                        }))}} /> 
                    </div>
                </li>
            ))}
        </ul>
    );
}
