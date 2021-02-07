import { UPDATE_SCORES, GET_GAME_TYPE,RESET_SCORES } from './types'

export const updateScores = (playerId) => {
  return {
    type: UPDATE_SCORES,
    playerId
  }
}

export const getGameType = () => {
  return {
    type: GET_GAME_TYPE
  }
}

export const resetScores = () => {
  return {
    type: RESET_SCORES
  }
}
