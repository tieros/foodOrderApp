import Button from '../../atoms/button';
import hamburger from '../../assets/hero.png';
import { useNavigate } from 'react-router';

export default function Hero() {

const navigate = useNavigate();

    return (
        <section className='hero'>
            <div className='left'>
                <div>
                    <h2 className='left-title'>Best Hamburger In Town!</h2>
                    <Button title='Order Now!' onClick={() => navigate('/menu')}/>
                </div>
            </div>
            <img src={hamburger} alt='hamburger' />
            <div className='right'>
                <h2 className='right-title'>Tiera Hamburgers</h2>
            </div>
        </section>
    );
}
