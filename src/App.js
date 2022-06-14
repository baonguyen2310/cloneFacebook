import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import { Register, Login } from './components/Auth';
import { BlurScreen } from "./features";
import styles from './assets/css/base.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
      <Auth />
      <Register />
      <Login />
      <BlurScreen />
    </div>
  );
}

export default App;
