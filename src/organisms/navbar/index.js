import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar(){

 const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
 
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