import { child, ref, push } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { database } from '../../firebase';
import { cartActions } from '../../store/cart';
import Button from '../../atoms/button';
import CartItem from '../../molecules/cartItem';
import Card from '../../atoms/card';
import { getUserInfo } from '../../service/auth';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const [userData, setUserData] = useState({});
    const [orderSuccess, setOrderSuccess] = useState(null);

    const dbRef = ref(database);
    const uid = useSelector((state) => state.auth.user.uid);
    const cartItems = useSelector((state) => state.cart.items);
    const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTotalAmount = () => {
        let totalAmount = 0;
        for (let i = 0; i < cartItems.length; i++) {
            totalAmount += cartItems[i].price * cartItems[i].amount;
        }
        return totalAmount;
    };

    const hasItems = cartItems?.length > 0;

    useEffect( () => {
        if (isLoggedIn) {
            const getUser = async () => {

                const user = await getUserInfo(uid);
                const userData = user.val();
                setUserData(userData);
            }
            getUser()
                
            }
        }, [isLoggedIn, uid]);


    const submitOrder = async () => {

        try {
            await push(child(dbRef, `orders/`), {
                userData,
                ordereditems: cartItems,
            });
            setOrderSuccess(true);
            dispatch(cartActions.clearCart());
        } catch (error) {
            console.log(error);
            setOrderSuccess(false);
        }
    };

    const orderFeedback = () => {
        if (orderSuccess) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
            return <h2>Order Successful</h2>;
        } else return <h2>Something went wrong</h2>;
    };


    return (
        <div className='cart-page-container'>
            <Card>
                {orderSuccess !== null ? (
                    orderFeedback()
                ) : (
                    <>
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
                    </>
                )}
            </Card>
        </div>
    );
}
