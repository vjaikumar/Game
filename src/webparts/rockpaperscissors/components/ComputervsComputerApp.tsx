import * as React from 'react';
import styles from '../RockpaperscissorsWebPart.module.scss';
import { createStore } from 'redux'
import rootReducer from '../reducers/index'
import { Provider } from 'react-redux';
import GamePage from '.'
//import { connect } from "react-redux"; //remove
import {  CPU_VS_CPU } from '../constants'
const store = createStore(rootReducer)


export default class ComputervsComputerApp extends React.Component<any> {
   //class AppPage extends React.Component<any> {
  
   
  public render(): React.ReactElement<any> {
   
    return (
      <div >
      <div className={ styles.container }>
        <div className={ styles.row }>
          <div className={ styles.column }>
          <Provider  store={store}>
         
            <GamePage {...this.props} value={CPU_VS_CPU}/>
     
          </Provider>
          </div>
        </div>
      </div>
    </div>  
    );
  }
}

const mapStateToProps = (state) => ({
  gameType: 1,
});
//export default connect(mapStateToProps)(AppPage);