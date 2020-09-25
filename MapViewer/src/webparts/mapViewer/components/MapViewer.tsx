import * as React from 'react';
import { ReactBingmaps } from 'react-bingmaps';
import { IMapDataService } from '../services/MapDataService/IMapDataService';
import Location from '../model/Location';
import MessagePanel from './MessagePanel';
import styles from './MapViewer.module.scss';

export interface IMapViewerProps {
  mapDataService: IMapDataService;
  credentials: string;
  zoom: number;
  mapType: string;
}

export interface IMapViewerState {
  dataLoaded: boolean;
  points: Location[];
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
    this.props.mapDataService.getMapPoints(false)
      .then((points: Location[]) => {
        this.setState({
          dataLoaded: true,
          points: points
        });
      });
  }

  public render(): React.ReactElement<IMapViewerProps> {
    if (!this.props.credentials) {
      return (
        <div className={styles.mapViewer}>
          Please configure Bing Map key. You can obtain one free at the
          <a href="https://www.bingmapsportal.com/" target="_blank">Bing Maps Dev Center</a>
        </div>
      );
    } else if (this.props.zoom < 1 || this.props.zoom > 19) {
      return (
        <div className={styles.mapViewer}>
          Please configure a valid zoom level, normally between 1 (widest view) and 19 (closest view)
        </div>
      );
    } else if (!this.state.dataLoaded) {
      return (
        <div className={styles.mapViewer}
          ref={this.container}>Loading ...</div>
      );
    } else {
      return (
        <div className={styles.mapViewer}>
          <div className={styles.mapContainer}>
            <ReactBingmaps
              bingmapKey={this.props.credentials}
              center={this.getCenter(this.state.points)}
              zoom={this.props.zoom}
              mapTypeId={this.props.mapType}
              infoboxes={this.state.points.map(
                p => ({
                  "location": [p.latitude, p.longitude],
                  "option": { title: p.title, description: p.subtitle }
                })
              )}
            />
          </div>
          <MessagePanel
            mapDataService={this.props.mapDataService}
            message=""
            refresh={() => {
              this.props.mapDataService.getMapPoints(true)
                .then((points: Location[]) => {
                  this.setState({
                    dataLoaded: true,
                    points: points
                  });
                });
            }}
          />
        </div>
      );
    }
  }

  private getCenter(points: Location[]): number[] {

    var result = [0, 0];
    var foundOne = false;

    // Calculate the corners of a rectangle around all the points
    let minX: number;
    let maxX: number;
    let minY: number;
    let maxY: number;
    for (let p of points) {
      if (p.latitude && p.longitude) {
        foundOne = true;
        minX = minX ? Math.min(minX, p.latitude) : p.latitude;
        maxX = maxX ? Math.max(maxX, p.latitude) : p.latitude;
        minY = minY ? Math.min(minY, p.longitude) : p.longitude;
        maxY = maxY ? Math.max(maxY, p.longitude) : p.longitude;
      }

      // The center of the rectangle will be the center of the map
      if (foundOne) {
        result = [(minX + maxX) / 2, (minY + maxY) / 2];
      }
    }
    return result;
  }


}


