import React, { Component } from 'react';
import './App.css';
import './Home.css';
import ListImage from './images/ListImage.jpg';
import LearnImage from './images/LearnImage.jpg';
import AddImage from './images/AddImage.jpg';
import LogOutImage from './images/LogOutImage.jpg';
import TestImage from './images/TestImage.jpg';
import ImportImage from './images/ImportImage.jpg';
import Card from './Card';


import { Button } from 'reactstrap';
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
      <h2 className = "header" >Welcome, {this.state.user.name}!  Please select what you would like to do!</h2> :
      <p className = "header">Please login/Register to begin card flashing fun!</p>;

    const button = this.state.isAuthenticated ?
      <div>
         <div className="container">
            <div className="row mt-3 mb-3">
                <div className="col-sm">
                    <Card image = {ListImage} title = "List Cards" text = "View the cards that you have in your card library" r = "/CardViewer"/>
                </div>
                <div className="col-sm">
                    <Card image = {LearnImage} title = "Learn Cards" text = "Memorise the cards that you have in your collections" r = "LearnCards"/>
                </div>
                <div className="col-sm">
                    <Card image = {AddImage} title = "Add Cards" text = "Create new cards to add into your collections" r = "AddCard"/>
                </div>
            </div>
                <div className="row mt-3 mb-3">
                                   <div className="col-sm">
                                   <Card image = {LogOutImage} title = "Logout" text  = "Log out of your account" r = "/" onClick = {this.logout}/>

                                   </div>
                                   <div className="col-sm">
                                   <Card image = {TestImage} title = "Test" text  = "Test yourself on how well you know your collections " r = "/TestCards" />

                                   </div>
                                   <div className="col-sm">
                                   <Card image = {ImportImage} title = "Import" text  = "Import new card collections from a csv file " r = "/" />

                                   </div>

                                 </div>
                   </div>

        <br/>

      </div> :
      <Button color="primary" onClick={this.login}>Login/Register</Button>;

    return (
      <div className = "App-header">
        <h1 className="display-2 header" >Card Flasher</h1>

          {message}
          {button}





      </div>
    );
  }
}

export default withCookies(Home);
