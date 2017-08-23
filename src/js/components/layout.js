import React from "react"
import Header from "./header"
import MainMenu from "./mainmenu"
import Game from "./game"
import Help from "./help"
import GameSetup from "./gamesetup"
import GameJoin from "./gamejoin"
import { Switch, Route } from 'react-router-dom'
export default class Layout extends React.Component{
    render(){
  return <layout><h1 class="text-center">BLANK</h1>
<div className='container text-center'>
      <Switch>
      <Route exact path='/' component={MainMenu}/>
      <Route path='/game' component={Game}/>
      <Route path='/help' component={Help}/>
      <Route path='/join' component={GameJoin}/>
      <Route path='/gamesetup' component={GameSetup}/>
    </Switch></div></layout>
}
}