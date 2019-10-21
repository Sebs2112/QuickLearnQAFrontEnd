
import React, { Component } from 'react';
import { Button, ButtonGroup} from 'reactstrap';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { Link, withRouter } from 'react-router-dom';


class CardViewer extends Component {


    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };


    constructor(props) {
      super(props);
      console.log(props);
      const {cookies} = props;
      console.log(cookies);
      this.state = {cards: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true, filteredCards: []};

      this.handleDelete = this.handleDelete.bind(this);
      this.onDropDownClick = this.onDropDownClick.bind(this);
    }

  async componentDidMount() {
       fetch('api/cards', {credentials: 'include'})
         .then(response => response.json())
         .then(data => this.setState({cards: data, filteredCards:data, isLoading: false}))
         .catch(() => this.props.history.push('/'));


  }

  async handleDelete(id){
      console.log(id)

      await fetch(`/api/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'X-XSRF-TOKEN': this.state.csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(() => {
              let newCards = [...this.state.cards].filter(i => i.id !== id);
              this.setState({cards: newCards});
              let nCards = [...this.state.filteredCards].filter(i => i.id !== id);
              this.setState({filteredCards:nCards});

      });
    }


    onDropDownClick (cat){
        let newCards = [...this.state.cards].filter(i => i.category === cat.e);
        this.setState({filteredCards:newCards});
        console.log(cat)
    }

  render() {
    const {filteredCards, cards, isLoading} = this.state;

    const cats = cards.map(a => a.category);
    console.log(cats);
    const distinctCats = [...new Set(cats)];
    console.log(distinctCats);

    if (isLoading) {
      return <p>Loading...</p>;
    }


        const cardTable = filteredCards.map(card=> {

          return <tr key={card.id}>
            <td  style={{color:'#41669d'}} >{card.title}</td>
            <td>
              <ButtonGroup>
                <Button style={{color:'white', backgroundColor:'#41669d'}} size="sm" tag={Link} to={"/EditCard/" + card.id}>Edit</Button>
                <Button style={{color:'white', backgroundColor:'#41669d'}} size="sm" onClick={() => this.handleDelete(card.id)}>Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        });

    return (
      <div className = "App-header" >



          <div>

            <h1 className="display-2" style={{color:'#41669d'}}>Current Cards</h1>
                <div className="dropdown ">
                <button className="btn btn-secondary dropdown-toggle" style={{ backgroundColor:'#41669d'}} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categories
                  </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {distinctCats.map((e, key) => {
                                              return <button className="dropdown-item" onClick={() =>  this.onDropDownClick({e})} >{e}</button>;
                                               })}

                    </div>

                </div>


             <table className="table table-borderless" >
                <thead>
                    <tr>
                    </tr>
                 </thead>
                 <tbody>
                    {cardTable}
                 </tbody>
              </table>



          </div>



      </div>

    );
  }
}

export default withCookies(CardViewer);
