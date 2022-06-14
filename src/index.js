import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import { register } from './sw';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//register();