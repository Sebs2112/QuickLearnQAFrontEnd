
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardViewer from './CardViewer';
import AddCard from './AddCard';
import EditCard from './EditCard';
import LearnCards from './LearnCards';
import TestCards from './TestCards';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class NavB extends Component {

            static propTypes = {
              cookies: instanceOf(Cookies).isRequired
            };

                  searchText = {
                    sText: ''

                  };

        constructor(props) {
          super(props);
          const {cookies} = props;
          this.state = {
            item: this.searchText, csrfToken: cookies.get('XSRF-TOKEN')
          };
          this.handleChange = this.handleChange.bind(this);

//          this.handleSubmit = this.handleSubmit.bind(this);
        }

              handleChange(event) {
                const target = event.target;
                const value = target.value;
                const name = target.name;
                let item = {...this.state.item};
                item.sText= value;
                this.setState({item});
                console.log(this.state.item)

              }

    render(){

    const {item} = this.state;
    console.log(item)
    return (
        <nav class="navbar navbar-expand-sm navbar-dark" style = {{backgroundColor: '#41669d'}}>
              <a class="navbar-brand" style={{color:"white"}}>Card Flasher</a>
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/CardViewer">View</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="AddCard">Add</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="LearnCards">Learn</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="TestCards">Test</a>
                </li>
              </ul>
              <form class="form-inline ml-auto" action="/action_page.php">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" value={item.sText} onChange={this.handleChange}></input>
                <button class="btn btn-success" type="submit" onSubmit={this.handleSubmit}>Search</button>
              </form>
        </nav>

    );
  }
  }


export default withCookies(NavB);
