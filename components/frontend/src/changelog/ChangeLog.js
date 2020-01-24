import React, { useEffect, useState } from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import TimeAgo from 'react-timeago';
import { get_changelog } from '../api/changelog';

export function ChangeLog(props) {
    const [changes, setChanges] = useState([]);
    const [nrChanges, setNrChanges] = useState(5);
    useEffect(() => {
        let didCancel = false;
        let uuids = {};
        if (props.report_uuid) { uuids.report_uuid = props.report_uuid }
        if (props.subject_uuid) { uuids.subject_uuid = props.subject_uuid }
        if (props.metric_uuid) { uuids.metric_uuid = props.metric_uuid }
        if (props.source_uuid) { uuids.source_uuid = props.source_uuid }
        get_changelog(nrChanges, uuids).then(function (json) {
            if (!didCancel) {
                setChanges(json.changelog || []);
            }
        });
        return () => { didCancel = true; };
    }, [props.report_uuid, props.subject_uuid, props.metric_uuid, props.source_uuid, props.timestamp, nrChanges]);

    let scope = "Changes in this instance of Quality-time";
    if (props.report_uuid) { scope = "Changes in this report" }
    if (props.subject_uuid) { scope = "Changes to this subject" }
    if (props.metric_uuid) { scope = "Changes to this metric and its sources" }
    if (props.source_uuid) { scope = "Changes to this source" }

    let rows = [];
    changes.forEach((change) => rows.push(<Table.Row key={change.timestamp + change.delta}>
        <Table.Cell>
            <TimeAgo date={change.timestamp} />, {(new Date(change.timestamp)).toLocaleString()}, <span dangerouslySetInnerHTML={{__html: change.delta}}/>
        </Table.Cell>
    </Table.Row>));

    return (
        <Table striped size='small'>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        {scope} (most recent first)
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rows}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell>
                        <Button basic icon primary size='small' onClick={() => setNrChanges(nrChanges+10)}>
                            <Icon name="refresh" /> Load more changes
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}