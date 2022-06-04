import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar(){

const isLoggedIn = useSelector((state) => state.auth.user.isLoggedIn);
    return (
        <nav className='navbar'>
            <p className='logo'>Logo</p>
            <ul>
                <Link to='/'> Menu </Link>
                { isLoggedIn ? 
                    <Link to='profile'> Profile </Link> : 
                    <Link to='login'> Login </Link>
                }
                <Link to='cart'> Cart </Link>
            </ul>
        </nav>
    );
}