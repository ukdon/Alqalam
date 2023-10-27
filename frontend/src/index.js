import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GlobalProvider } from './context/globalContext';
import { GlobalStyle } from './styles/GlobalStyle';
import { Provider } from "react-redux";
import { store } from './store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <GlobalStyle />
    <GlobalProvider>
      <Provider store={store}>
       <App />
      </Provider>
    </GlobalProvider>
  </React.StrictMode>
  </BrowserRouter>
);


