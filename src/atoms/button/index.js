export default function Button({disabled, className, onClick, type, title, ...rest}) {
    return (
        <button {...rest} type ={type} onClick={onClick} disabled={disabled} className={'primary-button' || className}>
            {title}
        </button>
    );
}
