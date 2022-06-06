import CustomButton from '../../atoms/increase-decrease-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';

export default function CartItem(props) {

const cartItems = useSelector((state) => state.cart.items);   
const dispatch = useDispatch();

    return (
         <ul className='cart-items'>
            {cartItems?.map((item) => (
                <li className='cart-item' key={item.id}>
                    <div>
                        <h2>{item.name}</h2>
                        <div className='summary'>
                            <span className='price'>{item.price}</span>
                        </div>
                    </div>
                    <div className='actions'>
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
