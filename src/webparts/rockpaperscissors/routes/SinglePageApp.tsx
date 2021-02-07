import * as React from 'react';
import { ISinglePageAppProps } from './ISinglePageAppProps';
import { Stack, StackItem } from 'office-ui-fabric-react';
import ManvsComputerApp from '../components/ManvsComputerApp';
import ComputervsComputerApp from '../components/ComputervsComputerApp';
import StatisticsApp from '../components/StatisticsApp';
import GamePage from '../components/index'
import { BrowserRouter as Router, Route, Link, Redirect, Switch, HashRouter, PropsRoute } from 'react-router-dom';
import Navigation from '../SideNav/Navigation';



export default class SinglePageApp extends React.Component<ISinglePageAppProps, {}> {

  
  public render(): React.ReactElement<ISinglePageAppProps> {
   
    return (
      <HashRouter >
        <Stack horizontal gap={15}>
          <Navigation />
          <StackItem grow={2}>
            <Switch>
              
             
            <Route path='/computervscomputerapp' exact={true} component={() => <ComputervsComputerApp  {...this.props}  />} />

            <Route path='/manvscomputerapp' component={() => <ManvsComputerApp  {...this.props}  />} />

            <Route path='/statisticsapp' component={() => <StatisticsApp   />} />
            
          
             
            </Switch>
          </StackItem>
        </Stack>
      </HashRouter>
    );
  }
}
