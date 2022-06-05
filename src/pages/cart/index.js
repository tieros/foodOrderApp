import { get, set, child, ref } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { cartActions } from '../../store/cart';
import Button from '../../atoms/button';
import CartItem from '../../molecules/cartItem';
import Card from '../../atoms/card';

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
        if(isLoggedIn) {
        get(child(dbRef, `users/${uid}`)).then((snapshot) => {
            if (snapshot.exists) {
                setUserData(snapshot.val());
            }
        });
    }
    }, [dbRef, uid, isLoggedIn]);

    const submitOrder = async () => {
        try {
            await set(child(dbRef, `orders/${uid}/`), {
                userData,
                ordereditems: cartItems,
            });
            dispatch(cartActions.clearCart());
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='cart-page-container'>
        <Card>
            <h2 className='cart-page-header'>Shopping Cart</h2>
            <CartItem />
            <div className='total'>
                <span>Total Amount</span>
                <span className='total-amount'>{getTotalAmount() + '$'}</span>
            </div>
            <Button
                onClick={submitOrder}
                disabled={!hasItems || !isLoggedIn}
                title='Order'
                className='order-button'
            />
        </Card>
        </div>
    );
}
