import React from "react"
import {connect} from "react-redux"
import {setGameImages} from "../actions/gameActions"

import { Checkbox,Message} from 'semantic-ui-react'

@connect((store)=>{
  return{
settings:store.game.game.settings,
};
})
export default class HelpText extends React.Component{    
  setImages(){
    this.props.dispatch(setGameImages(!this.props.settings.images));    
  }
    render(){
  return (<div>
<ul>
  <li>BLANK is a social game designed to play with 3-8 people, in person, on mobile devices.</li>
  <li>One player starts by Hosting a <b>New Game</b>, entering the number of players, while other players <b>Join Game</b> with the given Game ID. The game will begin when all players have joined.</li>
  <li>It starts with a <b>Question Round</b>. Each person in the group fills in the <b>BLANK</b>/s on their question, taking care to be as insightful, imaginative and honest as they can.  Once they are done they hit <b>Submit Question</b>.</li>
  <li>Once all the questions arr in the <b>Answer Round</b> begins. One of the submitted questions will be drawn at random. The question is the same for all players.</li>
  <li>The question is read aloud by anyone, and the group then takes turns responding, beginning with the person to the left of the reader, and continuing in a clockwise fashion.</li>
  <li>Once the question has been answered by all members of the group, players hit the <b>Continue</b> button.</li>
  <li>Once all players hit <b>Continue</b>, another question will be drawn at random and the person to the left of the previous reader reads the question, and players answer as they did previously. Play continues in a clockwise fashion until all the filled questions have been read and answered.</li>
  <li>The round is over and the group revels in their newfound wisdom as a new <b>Question Round</b> with new questions begins.</li>
</ul>
<div id='settings'>
<Checkbox toggle size='large' label={<label>Show Images</label>} onClick={this.setImages.bind(this)} checked={this.props.settings.images}/>
</div>
<Message warning>
Different images will be shown depending on how players fill their BLANKs. This will increase load times. If the resulting question is vulgar or offensive, sometimes these images can be distressing or offensive (but mostly just funny).
</Message>
      </div>
      )
}
}