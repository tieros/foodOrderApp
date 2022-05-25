import style from './mainText.module.scss';

export default function MainText() {
    return (
        <section className={style.summary}>
            <h2>Yummy Hamburgers, Delivered To You</h2>
            <p>
                Choose your hamburger from our broad selection of available options and enjoy a
                delicious lunch or dinner at home.
            </p>
        </section>
    );
}
