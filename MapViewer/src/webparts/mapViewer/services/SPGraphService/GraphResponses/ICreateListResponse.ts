export interface User {
    displayName: string;
    email: string;
}

export interface CreatedBy {
    user: User;
}

export interface ParentReference {
    siteId: string;
}

export interface List {
    contentTypesEnabled: boolean;
    hidden: boolean;
    template: string;
}

export default interface RootObject {
    createdDateTime: Date;
    description: string;
    eTag: string;
    id: string;
    lastModifiedDateTime: Date;
    name: string;
    webUrl: string;
    displayName: string;
    createdBy: CreatedBy;
    parentReference: ParentReference;
    list: List;
}



