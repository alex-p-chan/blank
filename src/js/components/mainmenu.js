import React from "react"
import { Link } from 'react-router-dom'
import {  Button} from 'semantic-ui-react'
export default class Layout extends React.Component{
    render(){
  return (
  <div id='mainMenu'>
    <Button as={Link} fluid color='green' to='/gamesetup'>New Game</Button>
    <Button as={Link} fluid color='blue' to='/join'>Join Game</Button>
    <Button as={Link} fluid color='teal' to='/help'>Rules and Settings</Button>
</div>)
}
}