import Button from '../../atoms/button';
import hamburger from '../../assets/hero.png';
import { useNavigate } from 'react-router';

export default function Hero() {

const navigate = useNavigate();

    return (
        <section className='hero'>
            <div className='left'>
                <h2 className='left-title'>Yummy Hamburgers</h2>
            </div>
            <img src={hamburger} alt='hamburger' />

            <div className='right'>
                <div>
                    <h2 className='right-title'>Best Hamburger In Town!</h2>
                    <Button title='Order Now!' onClick={() => navigate('/menu')} />
                </div>
            </div>
        </section>
    );
}
