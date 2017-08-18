import React from "react"
import { Link } from 'react-router-dom'

export default class Layout extends React.Component{
    render(){
  return (
  <div id='mainMenu'>
          <h1>Blank</h1>
    <Link to='/game'><button className='btn btn-success btn-block'>New Game</button></Link>
    <Link to='/join'><button className='btn btn-primary btn-block'>Join Game</button></Link>
    <Link to='/help'><button className='btn btn-default btn-block'>Rules and Options</button></Link>
</div>)
}
}