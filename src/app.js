import React, {Component} from "react";
import {connect} from "react-redux";
// ACTION CREATORS
import {
    applyLabels,
    fetchData,
    handlePagination,
    handleSort,
    selectOp,
    updateNextCallLabelSelection,
    updatePageSize
} from "./actions";
// import styled components
import CheckBox from "@kiwicom/orbit-components/lib/Checkbox";
import Button from "@kiwicom/orbit-components/lib/Button";
import InputField from "@kiwicom/orbit-components/lib/InputField";
import Text from "@kiwicom/orbit-components/lib/Text";
import Tag from "@kiwicom/orbit-components/lib/Tag";
import Remove from "@kiwicom/orbit-components/lib/icons/Remove";
import _ from "lodash";
import {
    Col,
    FooterView,
    H3,
    ListView,
    MainContentView,
    Option,
    Row,
    Select,
    SideBarView,
    StatisticDataPanel
} from "./styled-components";
import RenderFilterComponent from "./components/FilterSideBar";
import CheckCircle from "@kiwicom/orbit-components/lib/icons/CheckCircle";
import Badge from "@kiwicom/orbit-components/lib/Badge";
import {Form, Pagination, Table} from 'semantic-ui-react';

const PAGE_SIZE = 10;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            inputLabels: []
        };
    }

    componentDidMount() {
        this.props.fetchData();
    }

    onSubmit = () => {
        const labelsForUpdate = this.state.inputLabels;
        this.props.applyLabels(labelsForUpdate);
    };


    renderFilteredCalls = filteredCalls => {
        const {
            callListLabelForUpdate,
            clickedColumn, handleSort, isAscending, handlePagination, totalItems,
            activePage, updatePageSize, pageSize
        } = this.props;
        const direction = isAscending ? "ascending" : "descending";
        if (filteredCalls.length === 0) {
            return (
                <MainContentView>
                    <StatisticDataPanel>{""}</StatisticDataPanel>
                    <Row>
                        <SideBarView>
                            <RenderFilterComponent/>
                        </SideBarView>
                        <ListView>
                            <H3>NO Result</H3>
                        </ListView>
                    </Row>
                </MainContentView>
            );
        } else {
            return (
                <MainContentView>
                    <StatisticDataPanel>Filtered Call List</StatisticDataPanel>
                    <Row>
                        <SideBarView>
                            <Text>Labels</Text>
                            <Select onChange={(e) => this.props.selectOp(e.target.value)}
                                    value={this.props.opForUpdateLabelUpdate}
                            >
                                <Option value="add">Add/Update</Option>
                                <Option value="remove">Remove</Option>
                            </Select>
                            <InputField
                                label="Modify"
                                tags={
                                    this.state.inputLabels.map((_label, key) => (<Tag
                                        key={key}
                                        icon={<Remove/>}
                                        size="normal"
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                        onRemove={() => {
                                            this.setState({
                                                inputLabels: [...this.state.inputLabels.filter(l => l !== _label)]
                                            });
                                        }}
                                        dataTest="test"
                                    >
                                        {_label}
                                    </Tag>))
                                }
                                value={this.state.inputValue}
                                placeholder="Labels"
                                type="text"
                                onChange={(e) => {
                                    this.setState({
                                        inputValue: e.target.value
                                    })
                                }}
                                onBlur={(e) => {
                                    const value = e.target.value;
                                    if (e.target.value) {
                                        this.setState({
                                            inputLabels: [...this.state.inputLabels, value]
                                        });
                                    }
                                    this.setState({
                                        inputValue: ""
                                    })
                                }}
                            >

                            </InputField>
                            <Button onClick={() => this.onSubmit()}>Apply Labels</Button>
                            <RenderFilterComponent/>
                        </SideBarView>
                        <Col>
                            <Table sortable celled fixed>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>
                                            <CheckBox
                                                label="Select All"
                                                onChange={(e) =>
                                                    this.props.updateNextCallLabelSelection("ALL",
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
                                                    onChange={(e) => this.props.updateNextCallLabelSelection(filteredCall.call_id, e.target.checked)
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
                            <Row>
                                <Pagination
                                    activePage={activePage}
                                    siblingRange={1}
                                    totalPages={Math.ceil(_.size(totalItems) / PAGE_SIZE)}
                                    onPageChange={(e, paginationProps) => {
                                        const activePage = paginationProps.activePage;
                                        handlePagination(activePage);
                                    }}
                                />
                                <Form.Input
                                    label='Items per page'
                                    name='callsPerPage'
                                    onChange={(e, {value}) => updatePageSize(value)}
                                    type='number'
                                    value={pageSize}
                                />
                            </Row>
                        </Col>
                        <FooterView/>
                    </Row>
                </MainContentView>
            );
        }
    };

    renderLoader = () => <div>Loading ...</div>;

    render() {
        const {
            filteredCalls, dataFetched, isFetching, error
        } = this.props;
        if (dataFetched && filteredCalls) {
            return this.renderFilteredCalls(filteredCalls);
        } else if (error) {
            return <Row>ERROR!!</Row>;
        } else if (isFetching) {
            return this.renderLoader();
        } else {
            return <Row>ERROR!!</Row>;
        }
    }
}

/**
 * listOfAgents,
 durationRange,
 labelList,
 callList,
 filteredCalls
 */
const mapStateToProps = state => {
    return {...state.appData}
};

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchData()),
        applyLabels: (labels) => dispatch(applyLabels(labels)),
        selectOp: (op) => dispatch(selectOp(op)),
        handleSort: (clickedColumn) => dispatch(handleSort(clickedColumn)),
        handlePagination: async (activePage) => {
            await dispatch(handlePagination(activePage));
            dispatch(fetchData());
        },
        updatePageSize: async (pageSize) => {
            await dispatch(updatePageSize(pageSize));
            dispatch(fetchData());
        },
        updateNextCallLabelSelection: (call_id, isSelected) => dispatch(updateNextCallLabelSelection(call_id, isSelected))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

