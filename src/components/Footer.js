
import React, { Component } from 'react';
import '../css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardViewer from './CardViewer';
import AddCard from './AddCard';
import EditCard from './EditCard';
import LearnCards from './LearnCards';

class Footer extends Component {
    render(){
    return (
        <nav class="navbar navbar-expand-sm navbar-dark" style = {{backgroundColor: '#41669d'}}>
              <a class="navbar-brand" style={{color:"white"}}>Card Flasher</a>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="AddCard">Add</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="LearnCards">Learn</a>
                </li>
              </ul>
              <form class="form-inline ml-auto" action="/action_page.php">
                <input class="form-control mr-sm-2" type="text" placeholder="Search"></input>
                <button class="btn btn-success" type="submit">Search</button>
              </form>
        </nav>

    );
  }
  }


export default Footer;
