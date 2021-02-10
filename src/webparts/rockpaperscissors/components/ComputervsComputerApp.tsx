import * as React from 'react';
import styles from '../RockpaperscissorsWebPart.module.scss';
import { createStore } from 'redux'
import rootReducer from '../reducers/index'
import GameApp from '.'
//import { connect } from "react-redux"; //remove
import {  CPU_VS_CPU } from '../constants'
import { selectGameType } from './actions';
import { connect } from 'react-redux'
const store = createStore(rootReducer)


 class ComputervsComputerApp extends React.Component<any> {
   //class AppPage extends React.Component<any> {
 

   
  public render(): React.ReactElement<any> {
   
    this.props.selectGameType(CPU_VS_CPU);

    return (
      <div >
      <div className={ styles.container }>
        <div className={ styles.row }>
          <div className={ styles.column }>
         
         
            <GameApp {...this.props}  />
     
          
          </div>
        </div>
      </div>
    </div>  
    );
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
   
    selectGameType: (gameType) => {
      dispatch(selectGameType(gameType))
    }
  }
}
export default connect(null,mapDispatchToProps)(ComputervsComputerApp);