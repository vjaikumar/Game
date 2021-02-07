import * as React from 'react';
import styles from '../RockpaperscissorsWebPart.module.scss';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

export default class Navigation extends React.Component<any> {
  public render(): React.ReactElement<any> {
    return (
      <div>
        <Nav
          expandButtonAriaLabel="Expand or collapse"
          ariaLabel="Nav basic example"
          styles={{
            link: {
              background: "#00ACC1222",
              color: "#000080",
              textDecoration:"underline"
            },
            root: {
              background: "#00ACC1",
              width: 208,
              height: 600,
              boxSizing: 'border-box',
              border: '1px solid #eee',
              overflowY: 'auto',
              
            }

          }}
          groups={
            [
              {
                links: [
                  {
                    iconClassName: styles.button,
                    name: 'Statistics',
                    url: '#/statisticsapp',
                    key: 'key2',
                    isExpanded: true,

                  },
                  {
                    name: 'Human vs Human',
                    url: '#/manvscomputerapp',
                    key: 'key3',
                    isExpanded: true,
                  },
                  {
                    name: 'Computer vs Computer',
                    url: '#/computervscomputerapp',
                    key: 'key4',
                    isExpanded: true,
                  }
                 
                ]
              }
            ]}
        />
      </div>
    );
  }
}
