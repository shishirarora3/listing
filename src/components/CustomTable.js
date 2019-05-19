import React from "react";
import {Label, Table} from "semantic-ui-react";
import CheckCircle from "@kiwicom/orbit-components/lib/icons/CheckCircle";
import CheckBox from "@kiwicom/orbit-components/lib/Checkbox";
import Badge from "@kiwicom/orbit-components/lib/Badge";

export const CustomTable = ({
                                allSelected,
                                clickedColumn, isAscending, handleSort, filteredCalls,
                                callListLabelForUpdate, updateNextCallLabelSelection
                            }) => {
    const direction = isAscending ? "ascending" : "descending";
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <CheckBox
                            checked={allSelected}
                            label={(
                                <Label style={{textDecoration: 'none'}}>Select All</Label>
                            )}
                            onChange={(e) =>
                                updateNextCallLabelSelection("ALL",
                                    e.target.checked)}/>
                    </Table.HeaderCell>

                    <Table.HeaderCell
                        sorted={clickedColumn === 'call_id' ? direction : null}
                        onClick={() => handleSort('call_id')}
                    >Call Id</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={clickedColumn === 'call_time' ? direction : null}
                        onClick={() => handleSort('call_time')}
                    >Call Time</Table.HeaderCell>
                    <Table.HeaderCell
                        sorted={clickedColumn === 'agent_id' ? direction : null}
                        onClick={() => handleSort('agent_id')}
                    >Agent Id</Table.HeaderCell>

                    <Table.HeaderCell>Labels</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {filteredCalls.map((filteredCall, i) => {
                    const checked = callListLabelForUpdate.includes(filteredCall.call_id);
                    const checkedLabel = checked ? "Selected" : "Select";
                    return (
                        <Table.Row key={i}>
                            <Table.Cell><CheckBox
                                label={checkedLabel}
                                checked={checked}
                                onChange={(e) => updateNextCallLabelSelection(filteredCall.call_id, e.target.checked)
                                }/></Table.Cell>
                            <Table.Cell>{filteredCall.call_id}</Table.Cell>
                            <Table.Cell>{filteredCall.call_time}</Table.Cell>
                            <Table.Cell>{filteredCall.agent_id}</Table.Cell>
                            <Table.Cell>

                                {filteredCall.label_ids && filteredCall.label_ids.map((label, id) => {
                                    return <Badge
                                        key={id}
                                        type="success" icon={<CheckCircle/>}>
                                        {label}
                                    </Badge>
                                })}
                            </Table.Cell>
                        </Table.Row>)
                })}
            </Table.Body>
        </Table>
    );
};
