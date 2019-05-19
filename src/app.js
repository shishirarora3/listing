import React, {Component} from "react";
import {connect} from "react-redux";
import {
    applyLabels,
    fetchData,
    handlePagination,
    handleSort,
    selectOp,
    updateNextCallLabelSelection,
    updatePageSize
} from "./actions";
import _ from "lodash";
import {BodyContentWrapper, Col, MainContentView, MainContentWrapper, Row} from "./styled-components";
import {Form, Header, Loader, Pagination} from 'semantic-ui-react';
import {PAGE_SIZE} from "./constants";
import {CustomTable} from "./components/CustomTable";
import {NoContent} from "./components/NoContent";
import {SideBarContainer} from "./components/SideBarContainer";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchData();
    }


    renderFilteredCalls = () => {
        const {
            handlePagination, totalItems,
            activePage, updatePageSize, pageSize,
        } = this.props;
        return (<Col>
                <CustomTable {...this.props}/>
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
        );
    };

    render() {
        const {
            filteredCalls, dataFetched, isFetching, error
        } = this.props;
        let MainContent;
        let headingText;
        if (isFetching) {
            MainContent = <Loader active inline='centered'/>;
            headingText = "Loading...";
        } else if (error) {
            MainContent = <Row>ERROR!!</Row>;
        } else if (dataFetched && filteredCalls) {
            if (filteredCalls.length === 0) {
                headingText = "No Filtered Call List with given criteria";
                MainContent = <NoContent/>;

            } else {
                headingText = "Filtered Call List";
                MainContent = this.renderFilteredCalls(filteredCalls);
            }
        } else {
            MainContent = <Row>ERROR!!</Row>;
        }
        return (<MainContentView>
            <Col>
                {headingText && <Header as='h1' dividing>{headingText}</Header>}
                <BodyContentWrapper>
                    <SideBarContainer {...this.props}/>
                    <MainContentWrapper>
                        {MainContent}
                    </MainContentWrapper>
                </BodyContentWrapper>
            </Col>
        </MainContentView>);
    }
}

const mapStateToProps = state => state.appData;

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

