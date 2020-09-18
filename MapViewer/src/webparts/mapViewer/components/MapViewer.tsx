import * as React from 'react';
import styles from './MapViewer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ReactBingmaps } from 'react-bingmaps';

export interface IMapViewerProps {
  credentials: string;
}

export default class MapViewer extends React.Component<IMapViewerProps, {}> {
  public render(): React.ReactElement<IMapViewerProps> {
    return (
      <div style={{ width: "100vw", height: "70vh" }}>
        <ReactBingmaps
          bingmapKey={this.props.credentials} >
        </ReactBingmaps>
      </div>
    );
  }
}
