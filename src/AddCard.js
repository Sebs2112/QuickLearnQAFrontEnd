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


      newCardInfo = {
        frontText: '',
        backText: '',
        category: '',
        title: ''
      };

        constructor(props) {
          super(props);
          const {cookies} = props;
          this.state = {
            item: this.newCardInfo, cards:[], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }

      async componentDidMount() {
           fetch('api/cards', {credentials: 'include'})
             .then(response => response.json())
             .then(data => this.setState({cards: data, isLoading: false}))
             .catch(() => this.props.history.push('/'));

      }



      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});

      }


      async handleSubmit(event) {
           event.preventDefault();
           const {item} = this.state;

           await fetch('/api/cards', {
             method: 'POST',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'X-XSRF-TOKEN': this.state.csrfToken
             },
             body: JSON.stringify(item),
             credentials: 'include'

           });
            this.props.history.push("/")
         }




    render(){

        if (this.state.isLoading) {
          return <p>Loading...</p>;
        }

    const {item} = this.state;
    return (


      <div className="App-header">
      <h1 className="display-2" style={{color:'#41669d'}}>Add Card</h1>
      <Form style = {{color: '#41669d'}} onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="frontText">Front Text</Label>
                  <Input type="text" name="frontText" id="frontText" value={item.frontText}
                         onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="backText">Back Text</Label>
                  <Input type="text" name="backText" id="backtext" value={item.backText}
                         onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input type="text" name="category" id="category" value={item.category}
                         onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" value={item.title}
                         onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                <Button style ={{color:'white', backgroundColor:'#41669d'}} type="submit">Add</Button>

                </FormGroup>
        </Form>
      </div>

    );
  }
}

export default withCookies(withRouter(AddCard));
