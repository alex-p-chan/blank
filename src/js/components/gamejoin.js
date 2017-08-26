import React from "react"
import { Link } from 'react-router-dom'
import {connect} from "react-redux"
import {fetchOpenGames,joinGame} from "../actions/gamesActions"
import {setPlayerName} from "../actions/gameActions"
import { Button, Input,Label} from 'semantic-ui-react'

@connect((store)=>{
  return{
gamesFetched:store.games.fetched,
gamesFetching:store.games.fetching,
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
    const{ games}=this.props;
    const mappedGames = games.map((game,i)=><Button as={Link} content={"Join "+ game.playerName+"'s Game"} icon='right arrow' labelPosition='right' to='/game' disabled={this.props.game.playerName===""} key={i} onClick={this.props.game.playerName===""?e => e.preventDefault():()=>this.joinGame(game.gameID)}/>)
return (<div id="join">
    <h1>Join a Game</h1>
    <Input  label={{ icon: 'asterisk' }}
    labelPosition='right corner' type="text" fluid className="text-center" placeholder="Enter your name to join a game" onChange={this.setPlayerName.bind(this)} />
    <Button basic loading={this.props.gamesFetching} color='green' className="block" onClick={this.fetchGames.bind(this)}>Refresh Game List</Button>
<div className="join-game-list">
{mappedGames}
  </div>
  </div>
  )
}
}