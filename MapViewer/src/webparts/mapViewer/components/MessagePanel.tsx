import * as React from 'react';
import styles from './MapViewer.module.scss';
import { IMapDataService } from '../services/MapDataService/IMapDataService';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import * as microsoftTeams from "@microsoft/teams-js";

export interface IMessagePanelProps {
    mapDataService: IMapDataService;
    message: string;
    refresh: () => void;
}


export default class MessagePanel extends React.Component<IMessagePanelProps, {}> {

    public componentDidMount() {
        if (microsoftTeams) {
            microsoftTeams.initialize();
        }
    }

    public render(): React.ReactElement<IMessagePanelProps> {
        return (
            <div className={styles.panel}>
                <PrimaryButton className={styles.editButton} onClick={this.launchEditor.bind(this)}>
                    Edit pushpins
                </PrimaryButton>
                <PrimaryButton className={styles.refreshButton} onClick={this.refresh.bind(this)}>
                    Refresh
                </PrimaryButton>

                <span className={styles.message}>{this.props.message}</span>
            </div>
        );
    }

    private launchEditor(event: React.MouseEvent<HTMLButtonElement>) {
        const url = this.props.mapDataService.getEditUrl();
        if (microsoftTeams) {
            const taskModuleInfo = {
                title: "Editor",
                url: url,
                // Show it as large as Teams will allow
                width: Number.MAX_VALUE,
                height: Number.MAX_VALUE
            };
            microsoftTeams.tasks.startTask(taskModuleInfo,
                (() => { this.refresh(); }));
        }
    }

    private refresh() {
        this.props.refresh();
    }

}



