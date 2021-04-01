import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
window.env = "development";
const App = require('./components/app').default
import './styles/main.less'

const app = document.createElement('div');
app.id = "app";
document.body.appendChild(app);
ReactDOM.render(
    <App />,
    document.getElementById('app')
);
  