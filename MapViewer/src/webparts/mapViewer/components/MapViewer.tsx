import * as React from 'react';
import styles from './MapViewer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ReactBingmaps } from 'react-bingmaps';
import ILocation from '../model/ILocation';
import { IMapDataService } from '../services/MapDataService/IMapDataService';

export interface IMapViewerProps {
  credentials: string;
  mapDataService: IMapDataService;
}

export interface IMapViewerState {
  dataLoaded: boolean;
  points: ILocation[];
}

export default class MapViewer extends React.Component<IMapViewerProps, IMapViewerState> {

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      points: []
    };
  }

  public componentDidMount() {
    this.props.mapDataService.getMapPoints()
      .then((points: ILocation[]) => {
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
    } else if (!this.state.dataLoaded) {
      return (
        <div>Loading ...</div>
      );
    } else {
      return (
        <div style={{ width: "70vw", height: "70vh" }}>
          <ReactBingmaps
            bingmapKey={this.props.credentials}
            center={this.getCenter(this.state.points)}
            zoom={12}
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

  private getCenter(points: ILocation[]): number[] {
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
      return [sumX/points.length, sumY/points.length]
    }
 }
}

