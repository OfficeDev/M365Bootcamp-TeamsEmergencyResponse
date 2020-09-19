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
        <div style={{ width: "100vw", height: "70vh" }}>
          <ReactBingmaps
            bingmapKey={this.props.credentials}
            center={[40.6782, -73.9442]}
            zoom={10}
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
}


// {
//   "location":[13.0827, 80.2707], "option":{ color: 'red' }, "addHandler": {"type" : "click", callback: this.callBackMethod }
// },