import React, { Component } from 'react';



class Card extends Component {





render(){

const ifMethod = this.props.onClick ? <a href = {this.props.r} onClick = {this.props.onClick} className="card-link">{this.props.title} </a>
:  <a href = {this.props.r}  className="card-link">{this.props.title} </a>


return(
  <div className="card text-center my-card" >
  <img src = {this.props.image} className="card-img-top " alt=" "></img>
   <div className="card-body">
   {ifMethod}
   <h6 className="card-subtitle mb-2 text-muted"> {this.props.text} </h6>
   </div>
  </div>


);

}

}

export default (Card);
