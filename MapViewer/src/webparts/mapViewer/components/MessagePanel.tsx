import * as React from 'react';
import styles from './MapViewer.module.scss';
import { IMapDataService } from '../services/MapDataService/IMapDataService';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export interface IMessagePanelProps {
    mapDataService: IMapDataService;
    message: string;
}

export default class MessagePanel extends React.Component<IMessagePanelProps, {}> {

    public render(): React.ReactElement<IMessagePanelProps> {
        return (
            <div style={{ width: "90vw", height: "10vh" }}>
                <PrimaryButton>Edit pushpins</PrimaryButton>
                <span>{ this.props.message}</span>
            </div>
        );
    }
}



