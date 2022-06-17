import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonIconText = ({ icon, text }) => {
    return (
        <div className="button-icon-text">
            <FontAwesomeIcon icon={icon} className="button-icon-text__icon"/>
            <div className="button-icon-text__text">{text}</div>
        </div>
    )
}

export default ButtonIconText