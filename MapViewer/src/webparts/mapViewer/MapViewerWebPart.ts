import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MapViewerWebPartStrings';
import MapViewer, { IMapViewerProps } from './components/MapViewer';

export interface IMapViewerWebPartProps {
  credentials: string;
}

export default class MapViewerWebPart extends BaseClientSideWebPart<IMapViewerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMapViewerProps> = React.createElement(
      MapViewer,
      {
        credentials: this.properties.credentials
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
