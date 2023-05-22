import './Button.scss';
function Button({ text, className = '', onClick, htmlType = '', ...props }) {
    return (
        <button className={'btn ' + className} onClick={onClick} type={htmlType} {...props}>
            {text}
        </button>
    );
}

export default Button;
