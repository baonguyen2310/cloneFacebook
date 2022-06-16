import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import { Register, Login } from './components/Auth';
import { BlurScreen } from "./features";
import styles from './assets/css/base.css';
import { io } from 'socket.io-client';
import HOST from "./api/CONSTANT";
import { useEffect, useRef } from 'react';

function App() {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(HOST);

    socketRef.current.emit("send", "hehe");

    socketRef.current.on("sendS", (data) => {
      alert("SocketIo đã sẵn sàng" + data)
      console.log(data);
    })

  }, []);

  return (
    <div className="App">
      <Header ref={socketRef}/>
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
