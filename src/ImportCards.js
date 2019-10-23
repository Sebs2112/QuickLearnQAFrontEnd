import React, { Component } from 'react';
import './App.css';

import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class AddCard extends Component {

        static propTypes = {
          cookies: instanceOf(Cookies).isRequired
        };



        constructor(props) {
          super(props);
          const {cookies} = props;
          this.state = {
             cards:[], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true
          };

        }

      async componentDidMount() {
           fetch('api/cards', {credentials: 'include'})
             .then(response => response.json())
             .then(data => this.setState({cards: data, isLoading: false}))
             .catch(() => this.props.history.push('/'));

      }

      async onFileSubmit(){


        let csv= new FormData();
        csv.append('file', this.state.file);
        fetch('/api/cards/file', {
                method: 'POST',
                headers: {
                  'X-XSRF-TOKEN': this.state.csrfToken
                },
                credentials: 'include',
                body: csv
            })

      }

      onChange = (event) => {
          this.setState({file:event.target.files[0]})
          console.log(event.target.files[0])
      }


    render(){

        if (this.state.isLoading) {
          return <p>Loading...</p>;
        }


    return (

      <div>
      <p>Hi</p>
      <form>
      <input accept = ".csv" type = 'file' onChange={this.onChange}/><br/>
      <Button onClick={() =>  this.onFileSubmit()}  >Submit</Button>
      </form>
      </div>
    );
  }
}

export default withCookies(withRouter(AddCard));
