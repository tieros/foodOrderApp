import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import cartIcon from '../../assets/cartIcon.svg';
import logo from '../../assets/logo.png';

export default function Navbar() {
    const [iconAnimated, setIconAnimated] = useState(false);

    const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
    const cartItems = useSelector((state) => state.cart.items);

    useEffect(() => {
        if (cartItems.length === 0) {
            return;
        }
        setIconAnimated(true);

        const timer = setTimeout(() => {
            setIconAnimated(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartItems]);

    const iconClass = `cart-icon ${iconAnimated ? 'bump' : ''}`;

    return (
        <nav className='navbar'>
                <NavLink to='/'> 
                <img className='logo' src={logo} alt='company-logo' />
                </NavLink>
            <ul>
                <NavLink to='/menu'> Menu </NavLink>
                {isLoggedIn ? (
                    <NavLink to='profile'> Profile </NavLink>
                ) : (
                    <NavLink to='login'> Login </NavLink>
                )}
                <NavLink to='cart' className='cart-link'>
                    Cart
                    <img src={cartIcon} className={iconClass} alt='cart-icon' />
                </NavLink>
            </ul>
        </nav>
    );
}
