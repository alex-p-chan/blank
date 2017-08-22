import React from "react"
import {connect} from "react-redux"
import {queueGame,setBlank} from "../actions/gameActions"
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
gameFetched:store.game.fetched,
game:store.game.game,
};
})
  export default class Game extends React.Component{
    
//constructor(props){
  //super(props);
//  this.state = {currentCount: 10}
//}
timer() {
  if(this.props.game.round.blank != "") { 
    clearInterval(this.intervalId);
  }
  else{
    this.props.dispatch(queueGame(this.props.game))
    
  }
}
componentDidMount() {
  this.intervalId = setInterval(this.timer.bind(this), 5000);
}
componentWilMount(){
  this.props.dispatch(queueGame(this.props.game))  
}
componentWillUnmount(){
  clearInterval(this.intervalId);
}
setBlank(key, blank){
  this.props.dispatch(setBlank(key,blank.target.value))
}
    render(){
      var setBlank=this.setBlank;
      var _this = this;
      const{game}=this.props;      
      var blank = game.round.blank;
      blank = formatBlank(game.round.blank.split('BLANK'), function (part, key) {
        return [part, <input type="text" key={key} placeholder="BLANK" onChange={_this.setBlank.bind(_this,key)} class={`Blank-${key}`}/>];});
        blank.pop();
return (<div>
    <h1>{blank}</h1>
    <button className="btn btn-block btn-success">Submit</button>
  </div>)

}
}
