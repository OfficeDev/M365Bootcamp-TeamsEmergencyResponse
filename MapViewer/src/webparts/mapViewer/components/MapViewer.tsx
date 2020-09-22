import * as React from 'react';
import styles from './MapViewer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ReactBingmaps } from 'react-bingmaps';
import Pushpin from '../model/IPushpin';
import { IMapDataService } from '../services/MapDataService/IMapDataService';
import { RefObject } from 'office-ui-fabric-react';

export interface IMapViewerProps {
  mapDataService: IMapDataService;
  credentials: string;
  zoom: number;
  mapType: string;
}

export interface IMapViewerState {
  dataLoaded: boolean;
  points: Pushpin[];
}

export default class MapViewer extends React.Component<IMapViewerProps, IMapViewerState> {

  private container = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      points: [],
    };
  }

  public componentDidMount() {
    this.props.mapDataService.getMapPoints()
      .then((points: Pushpin[]) => {
        this.setState({
          dataLoaded: true,
          points: points
        });
      });
  }

  public render(): React.ReactElement<IMapViewerProps> {
    if (!this.props.credentials) {
      return (
        <div>Please configure Bing Map credentials</div>
      );
    } else if (this.props.zoom < 1 || this.props.zoom > 19) {
      return (
        <div>Please configure a valid zoom level, normally between 1 (widest view) and 19 (closest view)</div>
      );
    } else if (!this.state.dataLoaded) {
      return (
        <div style={{ width: "70vw", height: "70vh" }}
        ref={this.container}>Loading ...</div>
      );
    } else {
      return (
        <div style={{ width: "70vw", height: "70vh" }}>
          <ReactBingmaps
            bingmapKey={this.props.credentials}
            center={this.getCenter(this.state.points)}
            zoom={this.props.zoom}
            mapTypeId={this.props.mapType}
            pushPins={this.state.points.map(
              p => ({
                "location": [p.latitude, p.longitude],
                "option": { color: 'red' }
              })
            )}
          />
        </div>
      );
    }
  }

  private getCenter(points: Pushpin[]): number[] {
    if (points.length === 0) {
      return [];
    } else {
      // Compute the centroid
      let sumX = 0;
      let sumY = 0;
      for (let p of points) {
        sumX += p.latitude;
        sumY += p.longitude;
      }
      return [sumX / points.length, sumY / points.length];
    }
  }


}


