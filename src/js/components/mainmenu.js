import React from "react"
import { Link } from 'react-router-dom'

export default class Layout extends React.Component{
    render(){
  return (
  <div id='mainMenu'>
    <h1>Blank</h1>
    <Link className='btn btn-success btn-block' to='/gamesetup'>New Game</Link>
    <Link to='/join' className='btn btn-primary btn-block'>Join Game</Link>
    <Link to='/help' className='btn btn-default btn-block'>Rules and Options</Link>
</div>)
}
}