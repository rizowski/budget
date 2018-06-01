/* eslint-disable no-unused-vars */
'use strict';

import 'babel-polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/app';

import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const node = document.getElementById('app');

ReactDom.render(
  <Router>
    <App />
  </Router>,
  node
);
