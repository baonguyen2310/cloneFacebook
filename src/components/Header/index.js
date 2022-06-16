import HeaderFacebook from "./headerFacebook";
import styles from './index.css';
import React from "react";

const Header = (props, ref) => {
    return (
        <HeaderFacebook ref={ref} />
    );
}

export default React.forwardRef(Header);