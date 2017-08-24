import React from "react"
import { Link } from 'react-router-dom'
import {connect} from "react-redux"
import {fetchOpenGames,joinGame} from "../actions/gamesActions"
import {setPlayerName} from "../actions/gameActions"

@connect((store)=>{
  return{
gamesFetched:store.games.fetched,
games:store.games.games,
game:store.game.game,
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
  this.props.dispatch(joinGame({gameID:gameID,playerName:this.props.game.playerName}))  
}
setPlayerName(input){
  this.props.dispatch(setPlayerName(input.target.value));
}
  render(){
    const{ games,gamesFetched}=this.props;
    const mappedGames = games.map((game,i)=><Link to='/game' disabled={this.props.game.playerName===""} className='btn btn-default' key={i} onClick={this.props.game.playerName===""?e => e.preventDefault():()=>this.joinGame(game.gameID)}>Join {game.playerName}'s Game</Link>)
return (<div>
    <h1>Join a Game</h1>
    <div className='form-group row game-setup-name'>
          <label className="col-md-4 control-label">Enter your name to join a game</label>
          <div className="col-md-8">
            <input type="text" className="form-control text-center" onChange={this.setPlayerName.bind(this)} />
          </div>

    </div>
    <button className='btn btn-default' onClick={this.fetchGames.bind(this)}>Refresh Game List</button>
<div className="join-game-list">
{mappedGames}
  </div>
  </div>
  )
}
}