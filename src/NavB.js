
import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';


import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class NavB extends Component {

            static propTypes = {
              cookies: instanceOf(Cookies).isRequired
            };


        constructor(props) {
          super(props);
          const {cookies} = props;
          this.state = {
            searchText: "", csrfToken: cookies.get('XSRF-TOKEN')
          };
          this.handleChange = this.handleChange.bind(this);

          this.handleSubmit = this.handleSubmit.bind(this);
        }

              handleChange(event) {

                this.setState({searchText:event.target.value});
                console.log(this.state.searchText);


              }

              handleSubmit(){
                console.log(this.state.searchText);
                const uri = `/api/cards/getByName/${this.state.searchText}`

                fetch(uri, {credentials: 'include'})
                  .then(response => response.json())
                  .then((data) => this.props.history.push(`/EditCard/${data.id}`))
                  .catch(() => this.props.history.push('/'));

              }


    render(){

    const {searchText} = this.state;

    return (
        <nav className="navbar navbar-expand-sm navbar-dark" style = {{backgroundColor: '#41669d'}}>
              <a className="navbar-brand" href= "/" style={{color:"white"}}>Card Flasher</a>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/CardViewer">View</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/AddCard">Add</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/LearnCards">Learn</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/TestCards">Test</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/ImportCards">Import</a>
                </li>
              </ul>
              <span className="form-inline ml-auto">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" value={searchText} onChange={this.handleChange}></input>
                <button className="btn btn-success" onClick={this.handleSubmit}>Search</button>
              </span>
        </nav>

    );
  }
  }


export default withCookies(withRouter(NavB));
