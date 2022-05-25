import classes from './cartItem.module.scss';
import Button from '../../atoms/button';

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
                <Button onClick={props.onRemove}>-</Button>
                <Button onClick={props.onAdd}>+</Button>
            </div>
        </li>
    );
}
