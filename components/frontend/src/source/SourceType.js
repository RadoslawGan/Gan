import React, { useContext } from 'react';
import { Header } from 'semantic-ui-react';
import { DataModel } from '../context/DataModel';
import { EDIT_REPORT_PERMISSION } from '../context/Permissions';
import { SingleChoiceInput } from '../fields/SingleChoiceInput';
import { Logo } from './Logo';

export function SourceType({metric_type, set_source_attribute, source_type}) {
    const dataModel = useContext(DataModel)
    let options = [];
    dataModel.metrics[metric_type].sources.forEach(
        (key) => {
            const option_source_type = dataModel.sources[key];
            options.push(
                {
                    key: key,
                    text: option_source_type.name,
                    value: key,
                    content:
                        <Header as="h4">
                            <Header.Content>
                                <Logo logo={key} alt={option_source_type.name} />{option_source_type.name}<Header.Subheader>{option_source_type.description}</Header.Subheader>
                            </Header.Content>
                        </Header>
                })
        });
    return (
        <SingleChoiceInput
            requiredPermissions={[EDIT_REPORT_PERMISSION]}
            label="Source type"
            options={options}
            set_value={(value) => set_source_attribute("type", value)}
            value={source_type}
        />
    )
}
