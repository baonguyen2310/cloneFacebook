import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesUp } from '@fortawesome/free-solid-svg-icons';

const ButtonIconText = () => {
    return (
        <div className="button-icon-text">
            <FontAwesomeIcon icon={faAnglesUp} className="button-icon-text__icon"/>
            <div className="button-icon-text__text">Text</div>
        </div>
    )
}

export default ButtonIconText