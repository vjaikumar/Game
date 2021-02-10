import * as React from 'react';
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGameType, updateScores, resetScores} from './actions'
import { PLAYER_VS_CPU, CPU_VS_CPU } from '../constants'
import { ROCK, PAPER, SCISSORS } from '../constants'
import { PLAYER_ONE, PLAYER_TWO, NONE } from '../constants'
import { Gamecontinue } from './common/Gamecontinue'
import { Container, Row, Col } from 'react-grid-system';
import styles from './../RockpaperscissorsWebPart.module.scss';

const WINNER_NAMES = ['Player 1', 'Player 2', 'No-one']


class GameApp extends React.Component<any,any>{
  
  
  constructor(props) {
   super(props)
   this.state={

   
      winner: NONE,
      winnerName: 'No-one',
      round: 1,
      makingSelection: true,
      choices: [0, 0],
      cpuChoosing: true,
      gameComplete: false,
      gameWinner: 'No-one'
    
    
    
   };
   
    this.onClick = this.onClick.bind(this)
    this.continueGame = this.continueGame.bind(this)  
   
   
   if(this.props.gameState.gameType === CPU_VS_CPU){
    
      this.simulateCpuChoices()
    }
    
  }

  static propTypes =  {
    getGameType: PropTypes.func.isRequired,
    updateScores: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  //when the component is rendered 
  componentDidMount() {
    
    this.props.getGameType()
    this.forceUpdate()
  }

  //reset all the values as it is used for both functionality
  componentWillUnmount() {   
   
      this.setState({
          winner: NONE,
          winnerName: 'No-one',
          makingSelection: false,
          round:1,
          choices: [0, 0],
          cpuChoosing:true,
          gameComplete : false,
          gameWinner : 'No-one'
        })

        this.props.resetScores()
  }

  //computer Play 
  simulateCpuChoices() {
    setTimeout(() => {
      this.selectComputerChoice(PLAYER_ONE)
      this.selectComputerChoice(PLAYER_TWO)
      let roundWinner = this.getroundWinner()
      let roundWinnerName = WINNER_NAMES[roundWinner]        
          
    this.setState({
          winner: roundWinner,
          winnerName: roundWinnerName,
          makingSelection: false
        })
     
        this.props.updateScores(roundWinner)
      
    }, 3000)
  }

  selectComputerChoice(player) {
    let random = Math.floor(Math.random()*3)
    let newChoices = this.state.choices
    newChoices[player] = random     
          
    this.setState({
      choices: newChoices
     
    })
  }

  //get the result out come based on player selected choice
  getroundWinner() {
    let winner = 0
    let playerOneChoice = this.state.choices[PLAYER_ONE]
    let playerTwoChoice = this.state.choices[PLAYER_TWO]
    
    switch(playerOneChoice) {
      case ROCK:
        switch (playerTwoChoice) {
          case ROCK: winner = NONE; break;
          case PAPER: winner = PLAYER_TWO; break;
          case SCISSORS: winner = PLAYER_ONE; break;
          default: return
        }
      break
      case PAPER:
        switch (playerTwoChoice) {
          case ROCK: winner = PLAYER_ONE; break;
          case PAPER: winner = NONE; break;
          case SCISSORS: winner = PLAYER_TWO; break;
          default: return
        }
      break
      case SCISSORS:
        switch (playerTwoChoice) {
          case ROCK: winner = PLAYER_TWO; break;
          case PAPER: winner = PLAYER_ONE; break;
          case SCISSORS: winner = NONE; break;
          default: return
        }
      break
      default: return
    } 
    return winner
  }

  onClick(selection) {
    
    let newChoices = this.state.choices//this.props.choices
    newChoices[PLAYER_ONE] = selection
    this.selectComputerChoice(PLAYER_TWO)
    let roundWinner = this.getroundWinner()
    let roundWinnerName = WINNER_NAMES[roundWinner]   
             

      this.setState({
        
        winner: roundWinner,
        winnerName: roundWinnerName,
        makingSelection: false,
        choices: newChoices
      })

      this.props.updateScores(roundWinner)
      this.forceUpdate()
     
    
  }


  //Return winner the who scored scored  3 
  //otherwise default is NONE
  checkMatchWinner() {
    let matchWinner = WINNER_NAMES[NONE]
    let scoretoWin = Number(this.props.scoretoWin)

     if (this.props.scores[PLAYER_ONE] === scoretoWin) {
      matchWinner = WINNER_NAMES[PLAYER_ONE]
    }
    if (this.props.scores[PLAYER_TWO] === scoretoWin) {
      matchWinner = WINNER_NAMES[PLAYER_TWO]
    }

   
    return matchWinner
  }

  endGame(winner) {

   // the reset the below values as the same component is used for manvscpu,cpuvscpu both functionality   
  
    this.setState({
      makingSelection: false,
      gameComplete: true,
      gameWinner: winner
    })
  }


  //This method handles the
  continueGame() {
    let newRound = this.state.round
    let maxRound= Number(this.props.maxGameRound)
    
    newRound = newRound + 1
  
   
      //check the maxround if met the condition disable the game continue option
     
     if (newRound <= maxRound) {      
      
      this.setState({ round: newRound, makingSelection: true })
       //only for computer vs computer to set dynamic selection
       if (this.props.gameState.gameType=== CPU_VS_CPU) {
          this.simulateCpuChoices()
        }
        let checkWinner = this.checkMatchWinner()
       if (checkWinner !== 'No-one') {        
          this.endGame(checkWinner)
        }
        //update to get latest data
       this.forceUpdate()
      } else {
        let checkWinner = this.checkMatchWinner()
        //this.endGame(checkWinner)
        if (newRound > maxRound){
          this.endGame(checkWinner)
        }
       this.forceUpdate()
      }
    
  }

  

  render() {
        
    const {  scores } = this.props
    let  gameType  =this.props.gameState.gameType    
     
    return (
      <div  className= {styles.rockpaperscissors}>
      {gameType !== undefined &&
        <Container >
          <Row >
            <Col >
              <h1 >
             
           Rock, Paper, Scissors</h1>
            </Col>
          </Row>
          <Row >
            <Col >
              <h3 >
              {gameType === PLAYER_VS_CPU ? "Human versus Computer" : "Computer versus Computer"}
                </h3>
            </Col>
          </Row>
          <Row >
            <Col >
              <h4 style={{color:'red'}}>Round {this.state.round}</h4>
            </Col>
          </Row>
          {scores !== undefined &&
            <Row >
              <Col >
                
                <h4 >
                  {gameType === PLAYER_VS_CPU ? "Human" : "Computer"}: {scores[0]}
                </h4>
             
              </Col>
              <Col >
               
                
                
                <h4 >
                  Computer  : {scores[1]}
                </h4>
              </Col>
            </Row>
          }
          {this.state.makingSelection ?
           
          <div>
           {gameType === PLAYER_VS_CPU ?
             <div >
               <Row >
                 <Col >
                   <h4  >Click on your choice.</h4>
                                     
                 </Col>
               </Row>
               <Row >
                 <Col >
                   <div  onClick={(event) => { this.onClick(0) }}>
                   <img className={styles.image} 
           src={require('../assets/rock.png')} alt="rock" />
                        
                   </div>
                 </Col>
                 <Col >
                   <div  onClick={(event) => { this.onClick(1) }}>                                         
                    
                     <img className={styles.image}
 src={require('../assets/paper.png')} alt="paper" />
                   </div>
                 </Col>
                 <Col >
                   <div  onClick={(event) => { this.onClick(2) }}>
                   <img className={styles.image}  src={require('../assets/scissors.png')} alt="scissors" />
                     
                   </div>
                 </Col>
               </Row>
             </div>
             :
             <div>
               {this.state.cpuChoosing &&
                 <h5 style={{color:'red',textAlign:'center'}}>Computer thinking..</h5>
               }
             </div>
           }
         </div>
         :
         <div>
           {!this.state.gameComplete ?
            <div>
            
             <Gamecontinue
                    gameType={this.props.gameState.gameType}
                    continueGame={this.continueGame}
                    playerOneChoice={this.state.choices[PLAYER_ONE]}
                    playerTwoChoice={this.state.choices[PLAYER_TWO]}
                    roundWinner={this.state.winnerName}
                  />
             </div>
             :
             <div>
               <Row >
                 <Col >
                
                   <h4 >A game is won when a player scores {this.props.scoretoWin} points.So the winner is {this.state.gameWinner}  </h4>
                   </Col>
               </Row>
             </div>
           }
         </div>
          }
        </Container>
      }
    </div>

    )
  }
}



const mapStateToProps = (state) => {
 
  const { gameState  } = state

  const {
    gameType,
    scores
  } = gameState || {
    gameType: PLAYER_VS_CPU,
    scores: [0, 0]
  }

  return {
    gameType,
    scores,
    gameState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGameType: () => {
      dispatch(getGameType())
    },
    resetScores: () => {
      dispatch(resetScores())
    },
    updateScores: (playerId) => {
      dispatch(updateScores(playerId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameApp)