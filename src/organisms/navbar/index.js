import { Link } from "react-router-dom";

export default function Navbar(){
    return (
        <nav className='navbar'>
            <p className='logo'>Logo</p>
            <ul>
                <Link to='login'> Login </Link>
                <Link to='cart'> Cart </Link>
            </ul>
        </nav>
    );
}