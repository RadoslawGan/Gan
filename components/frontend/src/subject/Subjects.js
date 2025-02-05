import React, { useContext } from 'react';
import { Segment } from '../semantic_ui_react_wrappers';
import { DataModel } from '../context/DataModel';
import { EDIT_REPORT_PERMISSION, ReadOnlyOrEditable } from '../context/Permissions';
import { CopyButton, AddButton, MoveButton } from '../widgets/Button';
import { add_subject, copy_subject, move_subject } from '../api/subject';
import { subject_options } from '../widgets/menu_options';
import { useDelayedRender } from '../utils';
import { Subject } from './Subject';

export function Subjects({
    changed_fields,
    dates,
    handleSort,
    hiddenColumns,
    hideMetricsNotRequiringAction,
    reload,
    report,
    reports,
    report_date,
    showIssueCreationDate,
    showIssueSummary,
    showIssueUpdateDate,
    sortColumn,
    sortDirection,
    tags,
    toggleVisibleDetailsTab,
    visibleDetailsTabs
}) {
    const visible = useDelayedRender();
    const dataModel = useContext(DataModel)
    const last_index = Object.keys(report.subjects).length - 1;

    return (
        <>
            {Object.keys(report.subjects).map((subject_uuid, index) =>
                visible || index < 3 ?
                    <Subject
                        changed_fields={changed_fields}
                        dates={dates}
                        first_subject={index === 0}
                        handleSort={handleSort}
                        hiddenColumns={hiddenColumns}
                        hideMetricsNotRequiringAction={hideMetricsNotRequiringAction}
                        key={subject_uuid}
                        last_subject={index === last_index}
                        report={report}
                        report_date={report_date}
                        reports={reports}
                        showIssueCreationDate={showIssueCreationDate}
                        showIssueSummary={showIssueSummary}
                        showIssueUpdateDate={showIssueUpdateDate}
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        subject_uuid={subject_uuid}
                        tags={tags}
                        toggleVisibleDetailsTab={toggleVisibleDetailsTab}
                        visibleDetailsTabs={visibleDetailsTabs}
                        reload={reload}
                    /> : null
            )}
            <ReadOnlyOrEditable requiredPermissions={[EDIT_REPORT_PERMISSION]} editableComponent={
                <Segment basic>
                    <AddButton item_type="subject" onClick={() => add_subject(report.report_uuid, reload)} />
                    <CopyButton
                        item_type="subject"
                        onChange={(source_subject_uuid) => copy_subject(source_subject_uuid, report.report_uuid, reload)}
                        get_options={() => subject_options(reports, dataModel)}
                    />
                    <MoveButton
                        item_type="subject"
                        onChange={(source_subject_uuid) => move_subject(source_subject_uuid, report.report_uuid, reload)}
                        get_options={() => subject_options(reports, dataModel, report.report_uuid)}
                    />
                </Segment>}
            />
        </>
    )
}
