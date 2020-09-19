declare interface IMapViewerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  CredentialsFieldLabel: string;
  ZoomFieldLabel: string;
  MapTypeFieldLabel: string;
}

declare module 'MapViewerWebPartStrings' {
  const strings: IMapViewerWebPartStrings;
  export = strings;
}
