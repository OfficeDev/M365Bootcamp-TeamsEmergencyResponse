import * as React from 'react';
import styles from './MapViewer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { ReactBingmaps } from 'react-bingmaps';
import ILocation from '../model/ILocation';
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
  points: ILocation[];
  offsetHeight: number;
  offsetWidth: number;
}

export default class MapViewer extends React.Component<IMapViewerProps, IMapViewerState> {

  private container = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      points: [],
      offsetWidth: 0,
      offsetHeight: 0
    };
  }

  public componentDidMount() {
    if (this.container.current) {
      this.setState({
        offsetHeight: this.container.current.offsetHeight,
        offsetWidth: this.container.current.offsetWidth
      });
    }
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
        <div style={{ width: "70vw", height: "70vh" }}
        ref={this.container}>Loading ...</div>
      );
    } else {
      return (
        <div style={{ width: "70vw", height: "70vh" }}>
          <ReactBingmaps
            bingmapKey={this.props.credentials}
            center={this.getCenter(this.state.points)}
            zoom={this.getZoomLevel(this.state.points)}
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
      return [sumX / points.length, sumY / points.length];
    }
  }

  private getZoomLevel(points: ILocation[]): number {
    if (points.length < 2 ||
      this.state.offsetHeight === 0 ||
      this.state.offsetWidth === 0) {
      // Default zoom
      return 12;
    } else {
      // We have at least two points
      // Get the corners
      let lat1 = points[0].latitude;
      let lat2 = points[0].latitude;
      let lon1 = points[0].longitude;
      let lon2 = points[0].longitude;
      for (let i = 1; i < points.length; i++) {
        lat1 = Math.min(lat1, points[i].latitude);
        lat2 = Math.max(lat2, points[i].latitude);
        lon1 = Math.min(lon1, points[i].longitude);
        lon2 = Math.max(lon2, points[i].longitude);
      }

      let avgLat = (lat1 + lat2)/2;

      // https://docs.microsoft.com/en-us/bingmaps/articles/understanding-scale-and-resolution
      const c = 156543.04;
      const hDistance = this.getDistance(lat1, lat1, lon1, lon2);
      const hResolution = hDistance / this.state.offsetHeight;
      const hZoom = Math.log(c*Math.cos(avgLat*Math.PI/180)/hResolution) / Math.log(2);

      const vDistance = this.getDistance(lat1, lat2, lon2, lon2);
      const vResolution = vDistance / this.state.offsetWidth;
      const vZoom = Math.log(c*Math.cos(avgLat*Math.PI/180)/vResolution) / Math.log(2);

      return Math.floor(Math.min(hZoom, vZoom));
    }
  }

  private getDistance(lat1: number, lat2: number,
    lon1: number, lon2: number) {
    // Calculate the distance between the corners
    // Math wizardry from:
    //     http://www.movable-type.co.uk/scripts/latlong.html

    const R = 6371e3; // Radius of the earth in meters
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // distance in meters

  }
}


