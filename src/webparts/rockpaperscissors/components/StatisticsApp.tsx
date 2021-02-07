import * as React from 'react';
import styles from '../RockpaperscissorsWebPart.module.scss';

export default class StatisticsApp extends React.Component<any> { 
  
  public render(): React.ReactElement<any> {
 
    return (
      <div >
      <div className={ styles.container }>
        <div className={ styles.row }>
          <div className={ styles.column }>
           
            Statistics - (under construction get data from sharepoint list)
            <br/>
                        
           Total rounds:	0
           <br/>
           Total wins:	0
           <br/>
           Total losses:	0
           <br/>
           
           
          </div>
        </div>
      </div>
    </div>  
    );
  }
}

