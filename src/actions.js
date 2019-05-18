import {
    FETCHING_DATA,
    FETCHING_DATA_FAILURE,
    FETCHING_DATA_SUCCESS,
    FILTER_CALLS_BY_AGENTS,
    FILTER_CALLS_BY_DURATION,
    HANDLE_PAGINATION,
    HANDLE_SORT,
    SELECT_OP,
    UPDATE_NEXT_CALL_LABEL_SELECTION,
    UPDATE_PAGE_SIZE
} from "./constants";
import _ from "lodash";
import {BASE_URL} from "./config";

export const getData = () => ({
    type: FETCHING_DATA
});

export const getDataSuccess = (response) => {
    const [
        listOfAgents,
        filteredCalls,
        durationRange,
        labelList,
        callList
    ] = _.at(response, [
        "listOfAgents.data.listofagents",
        "filteredCalls.data",
        "durationRange.durationRange.data",
        "labelList.data.unique_label_list",
        "callList.data.call_data"
    ]);

    return ({
        type: FETCHING_DATA_SUCCESS,
        listOfAgents, filteredCalls,
        durationRange,
        labelList,
        callList
    });
};

export const getDataFailure = () => ({
    type: FETCHING_DATA_FAILURE
});

export const filterCallsByAgents = selectedListOfAgents => ({
    type: FILTER_CALLS_BY_AGENTS,
    selectedListOfAgents
});

export const filterCallsByDuration = duration => ({
    type: FILTER_CALLS_BY_DURATION,
    duration
});

// AJAX API > SHOUL BE STORED IN DEFF FOLDER BUT FOR NO IT"S OK HAVE IT HERE
const fetchFilteredCalls = async (filter_agent_list, filter_time_range) => {
    const _filter_agent_list =
        filter_agent_list && filter_agent_list.length > 0
            ? filter_agent_list
            : ["Janet Nelson", "Wayne Brown"];
    const data = {
        info: {
            filter_agent_list: _filter_agent_list,
            filter_time_range
        }
    };
    const response = await fetch(
        `${BASE_URL}getfilteredcalls`,
        {
            method: "POST",
            body: JSON.stringify(data)
        }
    );
    return await response.json();
};

const postApplyLabel = async (callList, label_ops) => {
    const data = {
        operation: {
            callList,
            label_ops
        }
    };
    const response = await fetch(
        `${BASE_URL}applyLabels`,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                user_id: "24b456"
            }
        }
    );
    return await response.json();
};

const fetchListOfAgents = async () => {
    const response = await fetch(
        `${BASE_URL}getlistofagents`
    );

    return await response.json();
};

const fetchLabelList = async () => {
    const response = await fetch(
        `${BASE_URL}getlistoflabels`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                user_id: "24b456"
            }
        }
    );
    return await response.json();
};

const fetchCallList = async () => {
    const response = await fetch(
        `${BASE_URL}getcalllist`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                user_id: "24b456"
            }
        }
    );
    return await response.json();
};

const fetchDurationRange = async () => {
    const response = await fetch(
        `${BASE_URL}getdurationrange`
    );
    return await response.json();
};

export const fetchData = () => {
    return async (dispatch, getState) => {
        const {
            appData: {duration, selectedListOfAgents}
        } = getState();
        dispatch(getData());
        try {
            const [
                listOfAgents,
                durationRange,
                labelList,
                callList,
                filteredCalls
            ] = await Promise.all([
                fetchListOfAgents(),
                fetchDurationRange(),
                fetchLabelList(),
                fetchCallList(),
                fetchFilteredCalls(selectedListOfAgents || listOfAgents, [0, duration])
            ]);
            await dispatch(
                getDataSuccess({
                    listOfAgents,
                    durationRange,
                    labelList,
                    callList,
                    filteredCalls
                })
            );
        } catch (error) {
            console.log(error);
            dispatch(getDataFailure());
        }
    };
};

export const applyLabels = labels => {
    return async (dispatch, getState) => {
        const {
            appData: {callListLabelForUpdate, opForUpdateLabelUpdate}
        } = getState();
        console.log("applyLabels", callListLabelForUpdate, labels);
        try {
            const {status_code} = await postApplyLabel(callListLabelForUpdate, labels.map(name => ({
                name,
                "op": opForUpdateLabelUpdate
            })));//callList, label_ops
            if (status_code === 200) {
                console.log("applyLabels", status_code);
                dispatch(fetchData());
            }
        } catch (error) {
            //dispatch(getDataFailure());
        }
    };
};

export const updateNextCallLabelSelection = (call_id, isSelected) => ({
    type: UPDATE_NEXT_CALL_LABEL_SELECTION,
    call_id,
    isSelected
});
export const selectOp = (op) => ({
    type: SELECT_OP,
    op
});
export const handleSort = (clickedColumn) => ({
    type: HANDLE_SORT,
    clickedColumn
});
export const handlePagination = (activePage) => ({
    type: HANDLE_PAGINATION,
    activePage
});
export const updatePageSize = (pageSize) => ({
    type: UPDATE_PAGE_SIZE,
    pageSize
});
