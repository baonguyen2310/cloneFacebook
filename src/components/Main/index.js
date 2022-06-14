import Sidebar from "./Sidebar";
import Content from "./Content";
import Map from "./Map";
import Canvas from "./Canvas";
import styles from '../../assets/css/main.css';
import SidebarLeft from "./SidebarLeft";

const Main = () => {
    //Hàm không phải là React Element, sẽ không được render
    //Muốn dùng hàm: {SidebarLefT()} vì return ra React Element
    return (
        <main className="main">
            <Sidebar position="wrap-sidebar__left">
                <SidebarLeft />
            </Sidebar>
            <Content />
            <Sidebar position="wrap-sidebar__right">
                <Map />
            </Sidebar>
        </main>
    );
}

export default Main;