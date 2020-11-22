import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { App } from './components/Layout/App';
import { ResetStyle } from './GlobalStyle'

const store = configureStore();

ReactDOM.render(
    <React.Fragment>
        <ResetStyle />
        <Provider store={store}>
            <App />
        </Provider>
    </React.Fragment>,
    document.getElementById('root')
);
