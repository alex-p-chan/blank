import React from "react"
import FontAwesome from 'react-fontawesome'
import {connect} from "react-redux"
import {queueGame,setBlank,endTurn}from "../actions/roundActions"
function formatBlank(array, fn){
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var mapping = fn(array[i],i);
    result = result.concat(mapping);
  }
  return result;
  }
  class Loading extends React.Component {
    render() {
    return (
    <div>Waiting on Players   <FontAwesome name='rocket' /></div>
        );
      }
    }
    
@connect((store)=>{
  return{
gameFetched:store.game.fetched,
game:store.game.game,
round:store.round.round
};
})
  export default class Game extends React.Component{
    
//constructor(props){
  //super(props);
//  this.state = {currentCount: 10}
//}
timer() {
  if(this.props.round.playersReady=== this.props.game.playersTotal) { 
    clearInterval(this.intervalId);
  }
  else{
    this.props.dispatch(queueGame(this.props.game))
    
  }
}
componentDidMount() {
  this.props.dispatch(queueGame(this.props.game))  
  this.intervalId = setInterval(this.timer.bind(this), 5000);
}
componentWillUnmount(){
  clearInterval(this.intervalId);
}
setBlank(key, blank){
  this.props.dispatch(setBlank(key,blank.target.value))
}
endTurn(){
  this.props.dispatch(endTurn(this.props.round))
  this.intervalId = setInterval(this.timer.bind(this), 5000);
}
    render(){
      var setBlank=this.setBlank;
      var _this = this;
      const{round, game}=this.props;      
      var blank = round.blank;
      blank = formatBlank(round.blank.split('BLANK'), function (part, key) {
        return [part, <input type="text" key={key} placeholder="BLANK" onChange={_this.setBlank.bind(_this,key)} class={`Blank-${key}`}/>];});
        blank.pop();
return (<div>
    <h1>{blank}</h1>
{round.playersReady!= game.playersTotal?<Loading />:null}
    <button className="btn btn-block btn-success"onClick={this.endTurn.bind(this)} disabled={round.playersReady!= game.playersTotal} >Submit</button>
  </div>)

}
}
