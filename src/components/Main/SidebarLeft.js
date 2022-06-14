import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserGroup,
    faPeopleGroup,
    faTv,
    faStore,
    faClock,
    faBookmark,
    faFlag
} from '@fortawesome/free-solid-svg-icons';

import styles from '../../assets/css/sidebar.css';

const SidebarItem = (props) => {
    let icon = <FontAwesomeIcon icon={props.icon} className="sidebar__item-icon"/>;

    if (props.img) {
        icon = <img src={props.img} alt="item image" className="sidebar__item-icon"/>
    }
    return (
        <li className="sidebar__item">
            <a href="#" className="sidebar__item-link">
                {icon}
                {props.text}
            </a>
        </li>
    );
}

const SidebarLeft = () => {
    return(
        <aside className="sidebar col">
            <ul className="sidebar__list">
                <SidebarItem img={require("../../assets/images/users/user1.jpg")} text="Bảo Nguyễn" />
                <SidebarItem icon={faUserGroup} text="Bạn bè" />
                <SidebarItem icon={faPeopleGroup} text="Nhóm" />
                <SidebarItem icon={faStore} text="Marketplace" />
                <SidebarItem icon={faTv} text="Watch" />
                <SidebarItem icon={faClock} text="Kỷ niệm" />
                <SidebarItem icon={faBookmark} text="Đã lưu" />
                <SidebarItem icon={faFlag} text="Trang" />
            </ul>
        </aside>
    );
}

export default SidebarLeft;