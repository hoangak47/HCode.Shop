import './Button.scss';
function Button({ text, className = '', onClick, htmlType = '', contextHolder, ...props }) {
    return (
        <button className={'btn ' + className} onClick={onClick} type={htmlType} {...props}>
            {contextHolder && contextHolder}
            {text}
        </button>
    );
}

export default Button;
