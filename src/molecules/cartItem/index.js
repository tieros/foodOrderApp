import classes from './cartItem.module.scss';
import CustomButton from '../../atoms/increase-decrease-buttons';

export default function CartItem(props) {
    const price = `$${props.price.toFixed(2)}`;

    return (
        <li className={classes['cart-item']}>
            <div>
                <h2>{props.name}</h2>
                <div className={classes.summary}>
                    <span className={classes.price}>{price}</span>
                    <span className={classes.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={classes.actions}>
              <CustomButton id={props.key} onAddToCart={props.onAdd} /> 
            </div>
        </li>
    );
}
