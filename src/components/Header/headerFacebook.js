import { ReactComponent as Logo } from '../../assets/images/logo/facebook.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faHouse,
    faListDots,
    faUserGroup,
    faCommentDots,
    faBell,
    faCaretDown,
    faTv,
    faStore,
    faPeopleGroup,
    faGamepad
} from '@fortawesome/free-solid-svg-icons';

import ModalFriends from './modalFriends';
import ModalMessage from './modalMessage';
import { handleNotification } from './handleNotification';
import React from 'react';

import styles from '../../assets/css/headerFacebook.css';

const HeaderPageItem = (props) => {
    return (
        <li className="header__page-item">
            <a href="#" className="header__page-item-link" onClick={handleClickPage}>
                <FontAwesomeIcon icon={props.icon} className="header__page-item-icon" />
            </a>
        </li>
    );
};

const getParentElement = (childElement, typeParent) => {
    while (childElement.parentElement.nodeName !== typeParent) {
        childElement = childElement.parentElement;
    }

    return childElement.parentElement;
}

const handleClickPage = (e) => {    //Đôi khi nhấn vào child thì e sẽ là child
    e.preventDefault();
    console.log(e.target, e.target.parentElement.tagName);
    const parent = getParentElement(e.target, "LI");
    console.log(parent);

    const itemIcons = document.getElementsByClassName("blue-item");
    Array.from(itemIcons).forEach((itemIcon) => {
        itemIcon.classList.remove("blue-item");
    });

    parent.classList.add("blue-item");
};

const HeaderMenuItem = (props) => {
    let icon = <FontAwesomeIcon icon={props.icon} className="header__menu-item-icon" />;
    if (props.img) {
        icon = <img src={props.img} className="header__menu-item-icon" />
    }
    return (
        <li className="header__menu-item">
            <button className="header__menu-item-link" onClick={props.onClick}>
               {icon} 
            </button>
            {props.children}
        </li>
    );
};

const HeaderFacebook = (props, ref) => {

    const handleForm = (e) => {
        document.querySelector(".auth-form").style.display = "flex";
        document.querySelector(".blur-screen").style.display = "flex";
    }

    const handleFriends = (e) => {
        document.querySelector(".modal-friends").style.display = "flex";
        document.querySelector(".blur-screen").style.display = "flex";
    }

    const handleMessage = (e) => {
        document.querySelector(".modal-net-message").style.display = "flex";
        document.querySelector(".blur-screen").style.display = "flex";
    }

    return (
        <header className="header">
            <div className="header__left">
                <div className="header__logo">
                    <Logo className="header__logo-img" />
                </div>
                <div className="header__searchbar">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="header__searchbar-icon" />
                    <input type="text" className="header__searchbar-input" placeholder='        Tìm kiếm trên Facebook' />
                </div>
            </div>
            <nav className="header__page">
                <ul className="header__page-list">
                    <HeaderPageItem icon={faHouse} />
                    <HeaderPageItem icon={faTv} />
                    <HeaderPageItem icon={faStore} />
                    <HeaderPageItem icon={faPeopleGroup} />
                    <HeaderPageItem icon={faGamepad} />
                </ul>
            </nav>
            <div className="header__menu">
                <ul className="header__menu-list">
                    <HeaderMenuItem img={require("../../assets/images/users/user1.jpg")} />
                    <HeaderMenuItem icon={faUserGroup} onClick={handleFriends}>{ModalFriends()}</HeaderMenuItem>
                    <HeaderMenuItem icon={faCommentDots} onClick={handleMessage}>{ModalMessage()}</HeaderMenuItem>
                    <HeaderMenuItem icon={faBell} onClick={(e) => handleNotification(e, ref)}></HeaderMenuItem>
                    <HeaderMenuItem icon={faCaretDown} onClick={handleForm}/>
                </ul>
            </div>
        </header>
    );
}

export default React.forwardRef(HeaderFacebook);