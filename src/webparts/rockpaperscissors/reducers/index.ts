


import { NONE } from './../constants'
import { combineReducers } from 'redux'
import { SELECT_GAME_TYPE, RESET_SCORES } from './../components/actions/types'
import { UPDATE_SCORES, GET_GAME_TYPE } from '../components/actions/types'
import { PLAYER_VS_CPU } from '../constants'
import { assign } from '@microsoft/sp-lodash-subset';

const initState ={
  winner: NONE,
  winnerName: 'No-one',
  round: 1,
  makingSelection: true,
  choices: [0, 0],
  cpuChoosing: true,
  gameComplete: false,
  gameWinner: 'No-one'

}


const gameState = (state = {

  gameType: PLAYER_VS_CPU,
  scores: [0, 0],
  initState
}, action) => {
  
  
  switch (action.type) {
    case UPDATE_SCORES:
      let newScores = state.scores
      newScores[action.playerId]++
      return assign({}, state, {
        scores: newScores
      })
    case RESET_SCORES:
      return assign({}, state, {
        scores: [0, 0]
      })
    case SELECT_GAME_TYPE:
      return assign({}, state, {
        gameType: action.gameType
      })
    case GET_GAME_TYPE:
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  gameState
})

export default rootReducer