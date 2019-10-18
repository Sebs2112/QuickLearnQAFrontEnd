import React, { Component } from 'react';
import './App.css';
import './Home.css';
import ListImage from './images/ListImage.jpg';
import LearnImage from './images/LearnImage.jpg';
import AddImage from './images/AddImage.jpg';
import LogOutImage from './images/LogOutImage.jpg';
import TestImage from './images/TestImage.jpg';
import ImportImage from './images/ImportImage.jpg';

import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { withCookies } from 'react-cookie';





class Home extends Component {
  state = {
    isLoading: true,
    isAuthenticated: false,
    user: undefined
  };

  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state.csrfToken = cookies.get('XSRF-TOKEN');
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/api/user', {credentials: 'include'});
    const body = await response.text();
    if (body === '') {
      this.setState(({isAuthenticated: false}))
    } else {
      this.setState({isAuthenticated: true, user: JSON.parse(body)})
    }
  }

  login() {
    let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000') {
      port = ':8080';
    }
    window.location.href = '//' + window.location.hostname + port + '/private';
  }

  logout() {
    fetch('/api/logout', {method: 'POST', credentials: 'include',
      headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
      .then(response => {
        window.location.href = response.logoutUrl + "?id_token_hint=" +
          response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
      });
  }

  render() {
    const message = this.state.user ?
      <h2 class = "header" >Welcome, {this.state.user.name}!  Please select what you would like to do!</h2> :
      <p class = "header">Please login/Register to begin card flashing fun!</p>;

    const button = this.state.isAuthenticated ?
      <div>
         <div class="container">
                     <div class="row mt-3 mb-3">
                       <div class="col-sm">
                                   <div class="card text-center" style={{ height: "21rem"}}>
                                   <img src={ListImage} class="card-img-top" alt=" "></img>
                                    <div class="card-body">
                                    <a href="/CardViewer" class="card-link">List Cards</a>
                                    <h6 class="card-subtitle mb-2 text-muted">View the cards that you have in your card library</h6>


                                     </div>
                                   </div>
                       </div>
                       <div class="col-sm">
                                   <div class="card text-center" style={{ height: "21rem"}}>
                                   <img src={LearnImage} class="card-img-top" alt=" "></img>
                                    <div class="card-body">
                                    <a href="/LearnCards" class="card-link">Learn Cards</a>
                                    <h6 class="card-subtitle mb-2 text-muted">Memorise the cards that you have in your collections</h6>

                                     </div>
                                   </div>
                       </div>
                       <div class="col-sm">
                                   <div class="card text-center" style={{ height: "21rem"}}>

                                   <img src={AddImage} class="card-img-top" alt=" "></img>
                                    <div class="card-body">
                                    <a href="AddCard" class="card-link">Add New Cards</a>
                                    <h6 class="card-subtitle mb-2 text-muted">Create new cards to add into your collections</h6>

                                     </div>
                                   </div>
                       </div>
                     </div>
                     <div class="row mt-3 mb-3">
                                   <div class="col-sm">
                                               <div class="card text-center" style={{ height: "21rem"}}>
                                               <img src={LogOutImage} class="card-img-top" alt=" "></img>
                                                <div class="card-body">
                                                 <a href="/" class="card-link" onClick={this.logout}>Logout</a>
                                                 <br/>
                                                 <h6 class="card-subtitle mb-2 text-muted">Log out of your account
                                                 <br/></h6>

                                                 </div>
                                               </div>
                                   </div>
                                   <div class="col-sm">
                                               <div class="card text-center" style={{ height: "21rem"}}>
                                               <img src={TestImage} class="card-img-top" alt=" "></img>
                                                <div class="card-body">
                                                 <a href="/TestCards" class="card-link">Test</a>
                                                 <h6 class="card-subtitle mb-2 text-muted">Test yourself on how well you know your collections</h6>

                                                 </div>
                                               </div>
                                   </div>
                                   <div class="col-sm">
                                               <div class="card text-center" style={{ height: "21rem"}}>
                                               <img src={ImportImage} class="card-img-top" alt=" "></img>
                                                <div class="card-body">
                                                 <a href="/" class="card-link">Import Cards</a>
                                                 <h6 class="card-subtitle mb-2 text-muted">Import new card collections from a csv file</h6>
                                                 </div>
                                               </div>
                                   </div>
                                 </div>
                   </div>

        <br/>

      </div> :
      <Button color="primary" onClick={this.login}>Login/Register</Button>;

    return (
      <div class = "App-header">
        <h1 class="display-2 header" >Card Flasher</h1>

          {message}
          {button}





      </div>
    );
  }
}

export default withCookies(Home);