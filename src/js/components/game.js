import React from "react"
import FontAwesome from 'react-fontawesome'
import {connect} from "react-redux"
import {queueGame,setBlank,endTurn}from "../actions/roundActions"
import {setGameIDs,setGameStarted}from "../actions/gameActions"

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}
function checkCookie() {
  var gameID = getCookie("gameID");
  var playerNumber = getCookie("playerNumber");
  var playerName = getCookie("playerName");
  if (gameID != ""&&playerNumber!="") {
return {gameID: parseInt(gameID), playerNumber:parseInt(playerNumber),playerName:playerName};
  } else {
return false;
      }
  }
  function formatBlank(array, fn){
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var mapping = fn(array[i],i);
    result = result.concat(mapping);
  }
  return result;
  }
  @connect((store)=>{
    return{
  round:store.round.round,
  game:store.game.game,
};
  })

  class Loading extends React.Component {
    render() {
    return (
    <div>Waiting on { this.props.game.playersTotal-this.props.round.playersReady} Player{this.props.game.playersTotal-this.props.round.playersReady===1?"s":null}<FontAwesome name='spinner' pulse /></div>
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
timer() {
  if(this.props.round.playersReady=== this.props.game.playersTotal) { 
    clearInterval(this.intervalId);  
    setCookie("gameID", this.props.game.gameID, 1);
    setCookie("playerNumber", this.props.game.playerNumber, 1);
    setCookie("playerName", this.props.game.playerName, 1);
  }
  else{
    if(!this.props.game.started){
      var rejoin = checkCookie();
    if (rejoin.gameID!=0){
      this.props.dispatch(setGameIDs(rejoin))
    }
  }
    this.props.dispatch(queueGame(this.props.game)) 
  }
}
componentDidMount() {
  this.intervalId = setInterval(this.timer.bind(this), 5000);
}
componentWillUnmount(){
  clearInterval(this.intervalId);
}
setBlank(key, blank){
  this.props.dispatch(setBlank(key,blank.target.value))
}
endTurn(){
  var payload= {
    cardID:this.props.round.cardID,
    gameID:this.props.game.gameID,
    playerVoted:this.props.round.playerVoted,
    playerNumber:this.props.game.playerNumber,
    answers:this.props.round.answers,
  }
  this.props.dispatch(endTurn(payload))
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
{round.playersReady!= game.playersTotal?<Loading />:<h1>{blank}</h1>}
    <button className="btn btn-block btn-success"onClick={this.endTurn.bind(this)} disabled={round.playersReady!= game.playersTotal} >Submit</button>
  </div>)

}
}
