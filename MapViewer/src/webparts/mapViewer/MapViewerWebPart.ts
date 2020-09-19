import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MapViewerWebPartStrings';
import MapViewer, { IMapViewerProps } from './components/MapViewer';
import ServiceFactory from './services/ServiceFactory';
import { IMapDataService } from './services/MapDataService/IMapDataService';

export interface IMapViewerWebPartProps {
  credentials: string;
  zoom: string;
  mapType: string;
}

export default class MapViewerWebPart extends BaseClientSideWebPart<IMapViewerWebPartProps> {

  private mapDataService: IMapDataService;

  public onInit(): Promise<void> {
    return new Promise<void> ((resolve, reject) => {
      this.mapDataService = ServiceFactory.getMapDataService(
        Environment.type, { context: this.context }
      );
      resolve();
    });
  }

  public render(): void {
    const element: React.ReactElement<IMapViewerProps> = React.createElement(
      MapViewer,
      {
        mapDataService: this.mapDataService,
        credentials: this.properties.credentials,
        zoom: parseInt(this.properties.zoom),
        mapType: this.properties.mapType
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('credentials', {
                  label: strings.CredentialsFieldLabel
                }),
                PropertyPaneTextField('zoom', {
                  label: strings.ZoomFieldLabel
                }),
                PropertyPaneTextField('mapType', {
                  label: strings.MapTypeFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
