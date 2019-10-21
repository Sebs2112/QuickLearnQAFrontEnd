import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import {withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class EditCard extends Component {




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
            item: this.newCardInfo, csrfToken: cookies.get('XSRF-TOKEN')
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
        }

        async componentDidMount() {


                const uri = `/api/cards/${this.props.match.params.id}`

                       fetch(uri, {credentials: 'include'})
                         .then(response => response.json())
                         .then(data => this.setState({item: data, isLoading: false}))
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
            const uri = `/api/cards/${this.props.match.params.id}`



           await fetch(uri, {
             method: 'PUT',
             headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'X-XSRF-TOKEN': this.state.csrfToken
             },
             body: JSON.stringify(item),

           });
            this.props.history.push("/CardViewer")
         }




    render(){

    const {item} = this.state;

    return (


      <div className="App-header">
      <h1 className="display-2" style={{color:'#41669d'}}>Edit Card</h1>

      <Form style = {{color: '#41669d'}} onSubmit={this.handleSubmit}>
                <FormGroup>
                  <div style={{textAlign: 'center'}}>Front Text</div>
                  <Input type="text" name="frontText" id="frontText" value={item.frontText}
                         onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <div style={{textAlign: 'center',}}>Back Text</div>
                  <Input type="text" name="backText" id="backtext" value={item.backText}
                         onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <div style={{textAlign: 'center',}}>Category</div>
                  <Input type="text" name="category" id="category" value={item.category}
                         onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                  <div style={{textAlign: 'center',}}> Title </div>
                  <Input type="text" name="title" id="title" value={item.title}
                         onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                <div style={{textAlign: 'center',}}>
                <Button style ={{color:'white', backgroundColor:'#41669d', float: "center"}} type="submit" >Update</Button>
                   </div>
                </FormGroup>
        </Form>
      </div>

    );
  }
}

export default withCookies(withRouter(EditCard));
