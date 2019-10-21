import React, { Component } from 'react';
import { Button} from 'reactstrap';

import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { withRouter } from 'react-router-dom';


class CardViewer extends Component {
  state = {
    isLoading: true,
    cards: [],
    currentCard : 0,
  };

      static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props) {
      super(props);
      const {cookies} = props;
      this.state = {cards: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true, currentCard : 0,filteredCards: []};

      this.handleDelete = this.handleDelete.bind(this);
      this.onDropDownClick = this.onDropDownClick.bind(this);
    }

  async componentDidMount() {
       fetch('api/cards', {credentials: 'include'})
         .then(response => response.json())
         .then(data => this.setState({cards: data,filteredCards:data, isLoading: false}))
         .catch(() => this.props.history.push('/'));



  }

  async handleDelete(id){
      console.log(id)

      await fetch(`/api/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(() => {
              let newCards = [...this.state.cards].filter(i => i.id !== id);
              this.setState({cards: newCards});


      });
    }

        onDropDownClick (cat){
            let newCards = [...this.state.cards].filter(i => i.category === cat.e);
            this.setState({filteredCards:newCards,currentCard: 0});
            console.log(cat)

        }

        shuf = (arr) => {
            var i,
                j,
                temp;
            for (i = arr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return arr;
        }


        onNextClick = () => {
            if (this.flippy.state.isFlipped === false){

            this.setState({ currentCard: (this.state.currentCard + 1) % this.state.filteredCards.length });
            console.log(this.flippy)
            }

        }

        onPrevClick= () => {
            if (this.flippy.state.isFlipped === false){

            if( this.state.currentCard === 0){
                 this.setState({ currentCard: this.state.filteredCards.length - 1 }); ;
            }else{
                this.setState({ currentCard: this.state.currentCard -1  });
            }
            }
        }

        onRandomizeClick = () =>{
            this.setState({filteredCards: this.shuf(this.state.filteredCards)});
        }

  render() {
    const {cards, isLoading} = this.state;

        const cats = cards.map(a => a.category);
        console.log(cats);
        const distinctCats = [...new Set(cats)];
        console.log(distinctCats);


    if (isLoading) {
      return <p>Loading...</p>;
    }



    return (

      <div className = "App-header"  >

            <h1 className="display-2" style={{color:'#41669d'}}>Learn Cards</h1>

            <div className="container"  >
            <div className="row justify-content-md-center mt-5">

                                        <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" style={{ backgroundColor:'#41669d'}}   type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Categories
                                          </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {distinctCats.map((e, key) => {
                                                                      return <button className="dropdown-item" onClick={() =>  this.onDropDownClick({e})} >{e}</button>;
                                                                       })}

                                            </div>

                                        </div>
                                        </div>

                <div className="row justify-content-md-center mt-5">
                    <div className="col col-lg-2" style={{  display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Button size="lg" style={{float: "right", color:'white', backgroundColor:'#41669d'}} onClick={ this.onPrevClick} >Prev</Button>
                    </div>
                    <div className="col-md-auto">
                        <Flippy
                           flipOnHover={false} // default false
                           flipOnClick={true} // default false
                           flipDirection="horizontal" // horizontal or vertical
                           ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                            // if you pass isFlipped prop component will be controlled component.
                             // and other props, which will go to div
                           style={{ width: '300px', height: '200px' }} /// these are optional style, it is not necessary
                         >
                             <FrontSide style={{ backgroundColor: '#41669d', textAlign: 'center', color: 'white'}}>
                             {this.state.filteredCards[this.state.currentCard].frontText}
                             </FrontSide>
                             <BackSide
                             style={{ backgroundColor: '#175852', textAlign: 'center', color: 'white'}}>
                             {this.state.filteredCards[this.state.currentCard].backText}
                             </BackSide>
                         </Flippy>
                    </div>
                    <div className="col col-lg-2 float-right" style={{  display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Button  size="lg" style={{ color:'white', backgroundColor:'#41669d'}} onClick={ this.onNextClick } >Next</Button>
                    </div>
                </div>

                <div className="row justify-content-md-center mt-5">
                    <Button  size="lg" style={{ color:'white', backgroundColor:'#41669d'}} onClick={ this.onRandomizeClick } >Randomize</Button>
                </div>
            </div>


       </div>



    );
  }
}

export default withCookies(withRouter(CardViewer));
