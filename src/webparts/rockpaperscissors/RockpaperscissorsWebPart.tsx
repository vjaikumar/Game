import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'RockpaperscissorsWebPartStrings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import SinglePageApp from './routes/SinglePageApp';
import { ISinglePageAppProps } from './routes/ISinglePageAppProps';

export interface IRockpaperscissorsWebPartProps {
  
  name: string;  
  description:string; 
  maxGameRound:number;
  scoretoWin:number;
}

export default class RockpaperscissorsWebPart extends BaseClientSideWebPart<IRockpaperscissorsWebPartProps> {
  public constructor() {
    super();
    
  }
  public render(): void {
    const element: React.ReactElement<ISinglePageAppProps > = React.createElement(
      SinglePageApp,
      {
        description: this.properties.description,
       
        maxGameRound:this.properties.maxGameRound,
        scoretoWin:this.properties.scoretoWin
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                
                PropertyPaneTextField('maxGameRound', {
                  label: 'Max Game Round'
                  //value:'5'
                }),
                PropertyPaneTextField('scoretoWin', {
                  label: 'Player Winning Score'
                  //value:'3'
                }),
                
              ]
            }
          ]
        }
      ]
    };
  }
}
