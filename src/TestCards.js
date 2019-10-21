import React, { Component } from 'react';
import { Button, Row, Col} from 'reactstrap';

import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import { Link, withRouter } from 'react-router-dom';


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
      this.state = {cards: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true, currentCard : 0,filteredCards: [],answers: [], score:0,display:'start'};

      this.onDropDownClick = this.onDropDownClick.bind(this);


    }

  async componentDidMount() {
       fetch('api/cards', {credentials: 'include'})
         .then(response => response.json())
         .then(data => this.setState({cards: data,filteredCards:data, isLoading: false}))
         .catch(() => this.props.history.push('/'));



  }


       onNextClick = () => {
            console.log(this.state.currentCard)
            console.log(this.state.filteredCards.length)

            if(this.state.currentCard === this.state.filteredCards.length -1){
                this.checkAnswer();
               this.setState({display:'finish'})
            }else{

            this.checkAnswer();

            var i = Math.floor(Math.random() * this.state.filteredCards.length);

            var j = Math.floor(Math.random() * this.state.filteredCards.length);

            let t = this.state.currentCard + 1

            let ans = [this.state.filteredCards[t].backText,this.state.filteredCards[i].backText,this.state.filteredCards[j].backText];
            let answ = this.shuf(ans);
            this.setState({answers:answ,currentCard : t});

            console.log(this.state.score)
            }

        }


        onDropDownClick (cat){
            this.setState({display:'test', score:0});
            let newCards = this.shuf([...this.state.cards].filter(i => i.category === cat.e));

            console.log(newCards);

            var i = Math.floor(Math.random() * newCards.length);

            var j = Math.floor(Math.random() * newCards.length);
            console.log(i)
            console.log(j)


            this.setState({filteredCards:newCards,currentCard: 0});

            console.log(this.state.currentCard);
            let ans = [newCards[0].backText,newCards[i].backText,newCards[j].backText];
            let answ = this.shuf(ans);
            this.setState({answers:answ})



        }

        checkAnswer(){

           if (document.getElementById("option1").checked){

                console.log(document.getElementById("option1").value)
                console.log(this.state.filteredCards[this.state.currentCard].backText)


               if(document.getElementById("option1").value === this.state.filteredCards[this.state.currentCard].backText){

                   this.setState({score:this.state.score+1})}


           }
           if (document.getElementById("option2").checked){
                    console.log(document.getElementById("option2").value)
                    if(document.getElementById("option2").value === this.state.filteredCards[this.state.currentCard].backText){

                         this.setState({score:this.state.score+1})};
                      }
           if (document.getElementById("option3").checked){
                    console.log(document.getElementById("option3").value)
                    if(document.getElementById("option3").value === this.state.filteredCards[this.state.currentCard].backText){

                          this.setState({score:this.state.score+1})};
                                          }
                    }







        shuf = (cards) => {
            var i,
                j,
                temp;
            for (i = cards.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = cards[i];
                cards[i] = cards[j];
                cards[j] = temp;
            }
            return cards;
        }





  render() {
    const {cards, filteredCards, isLoading, answers, display,score} = this.state;

        const cats = cards.map(a => a.category);

        const distinctCats = [...new Set(cats)];



    if (isLoading) {
      return <p>Loading...</p>;
    }

    if(display === 'finish'){
    return(
         <div className = "App-header"  >


                <h1 className="display-2" style={{color:'#41669d'}}>Test your Knowledge</h1>


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


                 <h1 className="display-3" style={{color:'#41669d'}}>Score = {score} / {this.state.filteredCards.length}</h1>

                 </div>
                 );
        }

    if (display === 'start'){
    return(

      <div className = "App-header"  >


            <h1 className="display-2" style={{color:'#41669d'}}>Test your Knowledge</h1>


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
                                        );
    }



    return (

      <div className = "App-header"  >


            <h1 className="display-2" style={{color:'#41669d'}}>Test your Knowledge</h1>


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



            <div className="container "  >
                <div className = "row mb-3 mt-3">
                    <div className="col-sm">
                    </div>
                    <div className="col-md justify-content-center text-center" style={{color:'#41669d'}}>
                        {this.state.filteredCards[this.state.currentCard].frontText}
                    </div>
                    <div className="col-sm">
                    </div>


                </div>
                <div className = "row mb-3 justify-content-center" >
                     <div className="btn-group btn-group-toggle "   data-toggle="buttons">
                     <label className="btn btn-danger active"style={{color:'white', backgroundColor:'#41669d', borderColor:'#41669d'}} >
                     <input type="radio" name="options" id="option1" value = {this.state.answers[0]} autocomplete="off" /> {this.state.answers[0]}
                     </label>
                     </div>

                 </div>

                <div className ="row mb-3 justify-content-center">
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                      <label className="btn btn-danger " style={{color:'white', backgroundColor:'#41669d', borderColor:'#41669d'}} >
                        <input type="radio" name="options" id="option2" autocomplete="off" value = {this.state.answers[1]}/> {this.state.answers[1]}
                      </label>
                    </div>
                </div>
                <div className ="row mb-3 justify-content-center">
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                      <label className="btn btn-danger" style={{color:'white', backgroundColor:'#41669d', borderColor:'#41669d'}}  >
                        <input type="radio" name="options" id="option3" autocomplete="off" value = {this.state.answers[2]}/>{this.state.answers[2]}
                      </label>
                    </div>
                </div>
                 <div className ="row mb-3 justify-content-center">
                    <Button  size="lg" style={{ color:'white', backgroundColor:'#41669d'}} onClick={ this.onNextClick }>Next</Button>
                 </div>





            </div>
       </div>



    );
  }
}

export default withCookies(withRouter(CardViewer));
