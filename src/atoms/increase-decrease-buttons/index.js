import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export default function IncreaseDecrease(props){

let storedItem = useSelector(state => state.cart.items.find(item => item.id === props.id));

const [amount, setAmount] = useState(storedItem ? storedItem.amount : 0);

const increaseAmount = () => {
    if(amount > 5){
    console.log('You cant add more than 5');
    setAmount(5);
    return;
    }
     setAmount(prev => prev + 1);
}

const decreaseAmount = () => {
    if(amount >= 1){
    setAmount(amount - 1);
    } else return;
}

useEffect(() => {
    props.onAddToCart(amount);
}, [amount, props]);

    return (
        <div className='inc-dec-buttons'>
            <button onClick={increaseAmount}> + </button>
            <input
                label='Amount'
                id={'amount_' + props.id}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type='number'
            />
            <button onClick={decreaseAmount}> - </button>
        </div>
    );}