import { useState } from "react"

export default function IncreaseDecrease(props){

const [amount, setAmount] = useState(0);    

const sendToCart = () => {
    // props.onAddToCart(amount)
}

const increaseAmount = () => {
    if(amount > 4){
    console.log('You cant add more than 5');
    setAmount(5);
    return;
    }
    setAmount(prev => prev + 1)
    sendToCart();
}

const decreaseAmount = () => {
    if(amount >= 1){
    setAmount(prev => prev - 1);
    sendToCart();
    } else return;
}
    return (
    <div className="inc-dec-buttons">
        <button onClick={increaseAmount}> + </button>
        <div>{amount}</div>
        <button onClick={decreaseAmount}> - </button>
    </div>
)}