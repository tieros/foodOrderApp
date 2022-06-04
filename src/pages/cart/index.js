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
    const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);

    const dispatch = useDispatch();

    // const totalAmount = `$${totalAmountStore?.toFixed(2)}`;
    const getTotalAmount = () => {
        let totalAmount = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalAmount += cartItems[i].price * cartItems[i].amount;
        }
        return totalAmount;
    };

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

    return (
        <div className='cart-page-container'>
            <CartItem />
            <div className='total'>
                <span>Total Amount</span>
                <span>{getTotalAmount()}</span>
            </div>
            <Button onClick={submitOrder}  disabled={!hasItems || !isLoggedIn} title='Order' />
        </div>
    );
}
