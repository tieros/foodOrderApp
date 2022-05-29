import { get, set, child, ref } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { cartActions } from '../../store/cart';
import Button from '../../atoms/button';
import CartItem from '../../molecules/cartItem';

export default function Cart() {
    const [userData, setUserData] = useState(null);

    const dbRef = ref(database);
    const uid = useSelector((state) => state.auth.uid);
    const cartItems = useSelector((state) => state.cart.items);
    const totalAmountStore = useSelector((state) => state.cart.totalAmount);
    const dispatch = useDispatch();

    // const totalAmount = `$${totalAmountStore?.toFixed(2)}`;
    const totalAmount = totalAmountStore;
    const hasItems = cartItems?.length > 0;

    useEffect(() => {
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
            if (snapshot.exists) {
                setUserData(snapshot.val());
            }
        });
    }, [dbRef, uid]);

    const submitOrder = async () => {
        await set(child(dbRef, `orders/${uid}/`), {
            userData,
            ordereditems: cartItems,
        });
        dispatch(cartActions.clearCart());
    };

    const cartItemAddHandler = (item) => {
        dispatch(cartActions.sendToCart(item));
    };

    const cartItemsList = (
        <ul className='cart-items'>
            {cartItems?.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );
    return (
        <div className='cart-page-container'>
            {cartItemsList}
            <div className='total'>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>

            <Button onClick={submitOrder}  disabled={!hasItems} title='Order'>
                Order
            </Button>
        </div>
    );
}
