import { UPDATE_SCORES, GET_GAME_TYPE,RESET_SCORES ,SELECT_GAME_TYPE} from './types'

export const updateScores = (playerId) => {
  return {
    type: UPDATE_SCORES,
    playerId
  }
}

export const selectGameType = (gameType) => {
  return {
    type: SELECT_GAME_TYPE,
    gameType
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
