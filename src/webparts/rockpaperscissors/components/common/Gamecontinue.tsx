import * as React from 'react';
import { PLAYER_VS_CPU, CPU_VS_CPU } from '../../constants'
import { ROCK, PAPER, SCISSORS } from '../../constants'
import { Container, Row, Col } from 'react-grid-system';
import styles from '../../RockpaperscissorsWebPart.module.scss';

export class Gamecontinue extends React.Component<any,{}>{
  constructor(props) {
   
    super(props)
    this.onClick = this.onClick.bind(this)
    if (this.props.gameType === CPU_VS_CPU) {
      this.continueAfterDelay()
    }
  }

  continueAfterDelay() {
    setTimeout(() => {
      this.props.continueGame()
    }, 3000)
  }

  onClick() {
    this.props.continueGame()
  }

  render() {
    
    const { gameType, playerOneChoice, playerTwoChoice, roundWinner } = this.props

    return (
      <div>
          <Container>
          <Row >
            <Col xs={12} md={12}>
              <h4  style={{color:'Green',textAlign:'center'}}>{roundWinner} won the round!</h4>
              
            </Col>
          </Row>
          <Row >
            <Col xs={12} md={6}>
              <div >
                {playerOneChoice === ROCK &&
                  <div>< img className={styles.image} src={require('../../assets/rock.png')} alt="rock" /></div>
                }
                {playerOneChoice === PAPER &&
                  <div><img className={styles.image} src={require('../../assets/paper.png')} alt="paper" /></div>
                }
                {playerOneChoice === SCISSORS &&
                  <div><img className={styles.image} src={require('../../assets/scissors.png')} alt="scissors" /></div>
                }
                <br/>
                {gameType === PLAYER_VS_CPU ? "Human" : "Computer"} - ( Player 1 )
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div >
                {playerTwoChoice === ROCK &&
                   <div><img className={styles.image} src={require('../../assets/rock.png')} alt="rock" /></div>
                }
                {playerTwoChoice === PAPER &&
                  <div><img className={styles.image} src={require('../../assets/paper.png')} alt="paper" /></div>
                }
                {playerTwoChoice === SCISSORS &&
                    <div><img className={styles.image} src={require('../../assets/scissors.png')} alt="scissors" /></div>
                }
                <br/>
               Computer - ( Player 2 )
              </div>
            </Col>
          </Row>
          {gameType === PLAYER_VS_CPU &&
            <Row >
              <Col xs={12} md={12}>
                <div style={{textAlign:'center'}}>    
                <br/>            
                 <div className={styles.continuebutton} onClick={(event) => { this.onClick() }}>Next turn...</div>
                </div>
              </Col>
            </Row>
          }
        </Container>
      </div>
    )
  }
}



