import React from "react"
import { connect } from "react-redux"
import { fetchQuestionTypes } from "../actions/typeActions"
import { setPlayerTotal, setPlayerName, setCardType, setCardTotal, setCompetitive, createGame } from "../actions/gameActions"
import { Link } from 'react-router-dom'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import { Button, Input, Segment,Dropdown,Checkbox,Label} from 'semantic-ui-react'

import Tooltip from 'rc-tooltip'
import 'rc-slider/assets/index.css'

function percentFormatter(v) {
  return `${Math.round((v * 6.66))} %`;
}
const SliderWithTooltip = createSliderWithTooltip(Slider);
const Handle = Slider.Handle;
const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}>
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};
@connect((store) => {
  return {
    types: store.questionTypes.types,
    typesFetched: store.questionTypes.fetched,
    gameFetched: store.game.fetched,
    game: store.game.game,
  };
})
class SelectCategory extends React.Component {

  setCardTotal(value) {
    this.props.dispatch(setCardTotal(this.props.game.types, this.props.OrderID, value))
  }
  setCardType(e, select) {
    this.props.dispatch(setCardType(this.props.OrderID, parseInt(select.value)))
  }

  render() {

    const { types, game, typesFetched } = this.props;
    const mappedTypes = [];
    types.map((type, i) =>  mappedTypes.push({key:i, value:parseInt(type.typeID), text:type.typeName +" by "+ type.userName}))
    return (
      <Segment raised className={`Category-${this.props.OrderID}`}>
          <Dropdown fluid search selection options={mappedTypes} value={game.types[this.props.OrderID].typeID}  onChange={this.setCardType.bind(this)}/>          
        <SliderWithTooltip min={0} max={15} value={game.types[this.props.OrderID].cardsTotal} onChange={this.setCardTotal.bind(this)} tipFormatter={percentFormatter} />
        <p>{typesFetched ? types.find(x => x.typeID === game.types[this.props.OrderID].typeID.toString()).typeDescription : ""}</p>
      </Segment>
    );
  }
}
@connect((store) => {
  return {
    gameFetched: store.game.fetched,
    game: store.game.game,
  };
})
export default class Game extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchQuestionTypes())
  }
  setPlayerTotal(value) {
    this.props.dispatch(setPlayerTotal(value));
  }
  setPlayerName(input) {
    this.props.dispatch(setPlayerName(input.target.value));
  }

  setCompetitive() {
    this.props.dispatch(setCompetitive(!this.props.game.competitive));
  }
  createGame() {
    this.props.dispatch(createGame(this.props.game));
  }
  render() {
    const { game } = this.props;
    return (
      <div id='gameSetup'>
            <Input type="text" fluid className="text-center" placeholder="Enter your name to host a game" onChange={this.setPlayerName.bind(this)} />
        <Segment raised>
        <h3>Select Number of Players: {game.playersTotal}</h3>
        <p>Click slider bar to change a value</p>
        <Slider min={1} max={8} value={game.playersTotal} handle={handle} onChange={this.setPlayerTotal.bind(this)} />
        </Segment>
        <h3>Select Question Sets and Distribution</h3>
        <SelectCategory OrderID={0} />
        <SelectCategory OrderID={1} />
        <SelectCategory OrderID={2} />
        <Checkbox toggle size='large' label={<label>Competitive Mode</label>} onClick={this.setCompetitive.bind(this)} checked={game.competitive}/>
        <Button as={Link} disabled={game.playerName === ""} fluid color="green" to='/game' onClick={game.playerName === "" ? e => e.preventDefault() : this.createGame.bind(this)}>CREATE GAME</Button>
      </div>
    )

  }
}