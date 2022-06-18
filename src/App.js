import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import { Register, Login } from './components/Auth';
import { BlurScreen } from "./features";
import styles from './assets/css/base.css';
import { io } from 'socket.io-client';
import HOST from "./api/CONSTANT";
import { useEffect, useRef, useState } from 'react';
import ModalNetMessage from './components/Header/modalMessage';

function App() {
  const socketRef = useRef();

  const [newMessage, setNewMessage] = useState(false);

  useEffect(() => {
    socketRef.current = io(HOST);

    socketRef.current.on("sendS", (data) => {
      //alert("SocketIo đã sẵn sàng" + data)
      console.log(data);
    });

  //   socketRef.current.on("newMessage", () => {
  //     if (newMessage === true) {
  //       setNewMessage(false);
  //     } else {
  //       setNewMessage(true);
  //     }
  //     console.log(newMessage);
  //     console.log("bắt được newMessage");
  // })

  }, []);

  // useEffect(() => {
  //   socketRef.current.on("newMessage", () => {
  //     if (newMessage === true) {
  //       setNewMessage(false);
  //     } else {
  //       setNewMessage(true);
  //     }
  //     console.log(newMessage);
  //     console.log("bắt được newMessage");
  // })
  // }, [newMessage]);

  useEffect(() => {
    socketRef.current.on("newMessage", () => {
      setNewMessage(prev => {
        if (prev == true) {
          return false;
        }
        return true;
      })
      console.log(newMessage);
      console.log("bắt được newMessage");
  })
  }, []);

  return (
    <div className="App">
      <Header ref={socketRef} />
      <Main />
      <Footer />
      <Auth />
      <Register />
      <Login />
      <BlurScreen />
      <ModalNetMessage ref={socketRef} newMessage={newMessage} />
    </div>
  );
}

export default App;
