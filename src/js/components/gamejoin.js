import React from "react"
import { Link } from 'react-router-dom'
import {connect} from "react-redux"
import {fetchOpenGames,joinGame} from "../actions/gamesActions"
import {setPlayerName} from "../actions/gameActions"

@connect((store)=>{
  return{
gamesFetched:store.games.fetched,
games:store.games.games,
};
})
export default class JoinGame extends React.Component{
componentWillMount(){
    this.props.dispatch(fetchOpenGames())
}
fetchGames(){
    this.props.dispatch(fetchOpenGames())  
}
joinGame(gameID){
  this.props.dispatch(joinGame({gameID:gameID}))  
}
setPlayerName(input){
  this.props.dispatch(setPlayerName(input.target.value));
}
  render(){
    const{ games,gamesFetched}=this.props;
    const mappedGames = games.map((game,i)=><Link to='/game'  className='btn btn-default' key={i} onClick={()=>this.joinGame(game.gameID)}>Join Game {game.gameID}</Link>)
return (<div>
    <h1>Join a Game</h1>

    <div class='join-name-input'>
    <label>Your Display Name</label><input type="text" onChange={this.setPlayerName.bind(this)}/>
    </div>
    <button className='btn btn-default' onClick={this.fetchGames.bind(this)}>Refresh Game List</button>
<div className="join-game-list">
{mappedGames}
  </div>
  </div>
  )
}
}