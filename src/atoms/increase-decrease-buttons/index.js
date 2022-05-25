import { useState } from "react"
import { useSelector } from "react-redux";

export default function IncreaseDecrease(props){

let storedAmount = useSelector(state => state.cart.items[0]?.amount);

if (isNaN(storedAmount)) {
    storedAmount = 1
}

const [amount, setAmount] = useState(storedAmount);


const increaseAmount = () => {
    if(amount > 5){
    console.log('You cant add more than 5');
    setAmount(5);
    return;
    }
    setAmount(amount + 1 );
    props.onAddToCart(amount);
}

const decreaseAmount = () => {
    if(amount >= 1){
    setAmount(amount - 1);
    props.onAddToCart(amount);

    } else return;
}
    return (
        <div className='inc-dec-buttons'>
            <button onClick={increaseAmount}> + </button>
            <input
                label='Amount'
                id={'amount_' + props.id}
                value={amount - 1}
                onChange={(e) => setAmount(e.target.value)}
                type='number'
            />
            <span>{amount - 1}</span>
            <button onClick={decreaseAmount}> - </button>

        </div>
    );}