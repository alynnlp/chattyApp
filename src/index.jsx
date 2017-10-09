// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
require("../styles/home.scss");
// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
//this file mounts our App component onto a DOM element, in this case, react-root.

//this is where you declare what to RENDER down there
import App from './App.jsx';


const node = document.getElementById("react-root");


//the <App /> here needs to match what you declare in the above IMPORT
ReactDOM.render(<App />, node);
