import React from "react"
import { connect } from "react-redux"
import { queueGame, setBlank, endTurn } from "../actions/roundActions"
import { setGameIDs, setGameStarted,setGameImages } from "../actions/gameActions"
import { setVote } from "../actions/playersActions"
import { Button, Card, Label, Header, Icon, Modal,Checkbox,Message} from 'semantic-ui-react'
import HelpText from "./helptext"

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function checkCookie() {
  var gameID = getCookie("gameID");
  var playerNumber = getCookie("playerNumber");
  var playerName = getCookie("playerName");
  if (gameID != "" && playerNumber != "") {
    return { gameID: parseInt(gameID), playerNumber: parseInt(playerNumber), playerName: playerName };
  } else {
    return false;
  }
}
function formatBlank(array, fn) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var mapping = fn(array[i], i);
    result = result.concat(mapping);
  }
  return result;
}
@connect((store) => {
  return {
    round: store.round.round,
    game: store.game.game,
  };
})

class Loading extends React.Component {
  render() {
    return (
      <div className="loading block">{this.props.round.roundType===""||this.props.round.playersReady===0?<div>Loading</div>:<div>Waiting on {this.props.round.playersNotReady}</div>}</div>
    );
  }
}

class HelpModal extends React.Component {

  render() {
    return (
         <Modal trigger={<Label corner='right' as='a' color='teal' icon='help circle' />} basic id="help-modal" closeIcon='close'>
      <Header icon='help circle' content='How to Play and Options' />
      <Modal.Content>
      <HelpText />
      </Modal.Content>

    </Modal>
    );
  }
}

@connect((store) => {
  return {
    players: store.players.players,
    round:store.round.round,
    game:store.game.game, 
  };
})

class VoteSection extends React.Component {
  setVotedPlayer(input) {
    this.props.dispatch(setVote(input.target.value))
  }
  render() {
    var _this = this;    
    return (
      <div><p>{this.props.round.scoreText}</p>
      {this.props.players.map(player=><div key={player.playerNumber}>
        <input disabled={this.props.game.playerNumber===player.playerNumber} value={player.playerNumber} name="votePlayer"type="radio" onChange={this.setVotedPlayer.bind(this)}/>
        {player.playerName} - {player.playerScore}
        </div>)}
      </div>
    );
  }
}

@connect((store) => {
  return {
    gameFetched: store.game.fetched,
    roundFetching: store.round.fetching,
    game: store.game.game,
    round: store.round.round
  };
})
export default class Game extends React.Component {
  timer() {
    if (this.props.round.playersReady === this.props.game.playersTotal) {
      clearInterval(this.intervalId);
    }
    else {
      if (!this.props.game.started) {
        var rejoin = checkCookie();
        if (rejoin.gameID != 0) {
          this.props.dispatch(setGameIDs(rejoin))
        }
      }
      if (!this.props.round.fetching)
        this.props.dispatch(queueGame(this.props.game))
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 3000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  setBlank(key, blank) {
    this.props.dispatch(setBlank(key, blank.target.value))
  }
  endTurn() {
    var payload = {
      cardID: this.props.round.cardID,
      gameID: this.props.game.gameID,
      playerVoted: this.props.round.playerVoted,
      playerNumber: this.props.game.playerNumber,
      answers: this.props.round.answers,
    }
    this.props.dispatch(endTurn(payload))
    this.intervalId = setInterval(this.timer.bind(this), 5000);
  }
  render() {
    var setBlank = this.setBlank;
    var _this = this;
    const { round, game } = this.props;
    var blank = round.blank;
    blank = formatBlank(round.blank.split('BLANK'), function (part, key) {
      return [part, <input type="text" key={key} placeholder="BLANK" onChange={_this.setBlank.bind(_this, key)} class={`game-blank`} />];
    });
    blank.pop();
    return (
      <Card fluid id="game-card" >
        <HelpModal/>
      {round.playersReady != game.playersTotal ? <Loading /> : <h1>{blank}</h1>}
      {round.roundType === "answer" && game.settings.images ? <img src={round.image} className="round-img" /> : null}
      {round.roundType === "answer"&&game.competitive?<VoteSection/>:null}
      <Button basic color='green'className="block" onClick={this.endTurn.bind(this)} loading={round.playersReady != game.playersTotal}disabled={round.playersReady != game.playersTotal}>{round.roundType==="question"?"Submit Question":"Continue"}</Button>
    </Card>)

  }
}
