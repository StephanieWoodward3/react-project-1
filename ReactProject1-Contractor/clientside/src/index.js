import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

//will import the data in the div named root in the index.html page
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
