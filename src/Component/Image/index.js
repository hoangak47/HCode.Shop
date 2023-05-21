import imageError from '../../assets/images/404.jpg';

function Img({ src, alt, className, ...rest }) {
    const onImgError = (e) => {
        e.target.onerror = null;
        e.target.src = imageError;
    };
    return <img onError={(e) => onImgError(e)} src={src} alt={alt} className={className} {...rest} />;
}

export default Img;
