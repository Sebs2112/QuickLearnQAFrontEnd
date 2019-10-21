import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardViewer from './CardViewer';
import AddCard from './AddCard';
import EditCard from './EditCard';
import LearnCards from './LearnCards';
import TestCards from './TestCards';
import NavB from './NavB';
import Home from './Home';
import { CookiesProvider } from 'react-cookie';


class App extends Component {
    render(){
    return (
        <div>

        <CookiesProvider>
        <NavB></NavB>
        <Router>

          <Switch>
            <Route exact path='/' exact={true} component={Home}/>
            <Route exact path='/CardViewer' exact={true} component={CardViewer}/>
            <Route path='/AddCard' exact={true} component={AddCard}/>
            <Route path='/EditCard/:id' exact={true} component={EditCard}/>
            <Route exact path='/LearnCards' exact={true} component={LearnCards}/>
            <Route exact path='/TestCards' exact={true} component={TestCards}/>



          </Switch>

        </Router>
        </CookiesProvider>

        </div>
    );
  }
  }


export default App;
