import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from './reducers/rootReducer';
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
// Persisting redux state changes
const persistConfig = {
  key: "root",
  storage,
  
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Creating store using reducer
let store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// Enables persistence
const persistor = persistStore(store);
ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
         <App />
    </PersistGate>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
