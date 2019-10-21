
import React, { Component } from 'react';
import './App.css';


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

                let item = {...this.state.item};
                item.sText= value;
                this.setState({item});


              }

    render(){

    const {item} = this.state;

    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style = {{backgroundColor: '#41669d'}}>
              <a className="navbar-brand" href= "/" style={{color:"white"}}>Card Flasher</a>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/CardViewer">View</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="AddCard">Add</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="LearnCards">Learn</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="TestCards">Test</a>
                </li>
              </ul>
              <form className="form-inline ml-auto" action="/action_page.php">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" value={item.sText} onChange={this.handleChange}></input>
                <button className="btn btn-success" type="submit" onSubmit={this.handleSubmit}>Search</button>
              </form>
        </nav>

    );
  }
  }


export default withCookies(NavB);
