import Sidebar from "./Sidebar";
import Content from "./Content";
import styles from './index.css';

const Main = () => {
    return (
        <main className="main">
            <Sidebar />
            <Content />
            <Sidebar />
        </main>
    );
}

export default Main;