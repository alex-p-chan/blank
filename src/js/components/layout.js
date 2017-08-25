import React from "react"
import MainMenu from "./mainmenu"
import Game from "./game"
import Help from "./help"
import GameSetup from "./gamesetup"
import GameJoin from "./gamejoin"
import { Switch, Route } from 'react-router-dom'
import { Container,Dimmer } from 'semantic-ui-react'
export default class Layout extends React.Component{
    constructor() {
        super();
        
        this.state = {
          loading: true
        };
      }
      componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1500); 
      }
    render(){
        const { loading } = this.state
        console.log(this.state.loading)        
        
return <layout>><input class="text-center title" placeholder="BLANK"/>
      <Container>
      <Switch>
      <Route exact path='/' component={MainMenu}/>
      <Route path='/game' component={Game}/>
      <Route path='/help' component={Help}/>
      <Route path='/join' component={GameJoin}/>
      <Route path='/gamesetup' component={GameSetup}/>
    </Switch>
    </Container>
    </layout>
}
}