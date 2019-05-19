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
} from "../constants";
import _ from "lodash";

/**
 * listOfAgents,
 filteredCalls,
 durationRange,
 labelList,
 callList
 * @type {{vouteValue: null, callListLabelForUpdate: Array, totalItems: number, vouteValueDuration: Array, activePage: number, isFetching: boolean, pageSize: number, error: boolean, genreIds: Array, movies: Array, dataFetched: boolean, genres: Array, opForUpdateLabelUpdate: string}}
 */
const initialState = {
    dataFetched: false,
    isFetching: false,
    error: false,
    listOfAgents: [],
    filteredCalls: [],
    durationRange: {maximum: 70, minimum: 0},
    duration: 70,
    callList: [],
    callListLabelForUpdate: [],
    opForUpdateLabelUpdate: "add",
    activePage: 1,
    totalItems: 0,
    pageSize: 10,
    clickedColumn: "call_id",
    isAscending: true
};

const paginate = (arr, activePage, pageSize) => {
    return arr.slice((activePage - 1) * pageSize, activePage * pageSize);
};

const mapCallsWithLabels = (filteredCalls = [], callList = [], activePage, pageSize) => {
    const callIdLabelIdMap = _.keyBy(callList, "call_id");
    const totalItems = filteredCalls.sort(({call_id: call_id_1}, {call_id: call_id_2}) => {
        return call_id_1 - call_id_2;
    });
    const _arr_mapCallsWithLabels = paginate(
        totalItems, activePage, pageSize).map(({agent_id, call_id, call_time}) => {
        return ({
            agent_id,
            call_id,
            call_time,
            label_ids: _.get(callIdLabelIdMap, `[${call_id}].label_id`)
        });
    });

    return [_arr_mapCallsWithLabels, totalItems];
};

const filterCallsByAgents = (state = {}, action = {}) => {
    switch (action.type) {
        case FILTER_CALLS_BY_AGENTS:
            return {
                ...state,
                // add genreId into array it doesnt exist or remove id if exist
                selectedListOfAgents: action.selectedListOfAgents
            };

        default:
            return state;
    }
};

const filterCallsByDuration = (state = {}, action = {}) => {
    switch (action.type) {
        case FILTER_CALLS_BY_DURATION:
            return {
                ...state,
                duration: action.duration
            };

        default:
            return state;
    }
};

const dataReducer = (state = initialState, action = {}) => {
    const {clickedColumn, activePage, pageSize} = action;
    switch (action.type) {
        case FETCHING_DATA:
            return {
                ...state,
                isFetching: true
            };

        case FETCHING_DATA_SUCCESS:

            const {
                listOfAgents,
                durationRange,
                labelList,
                callList,
                filteredCalls
            } = action;
            const [_filteredCalls, totalItems] = mapCallsWithLabels(filteredCalls, callList, state.activePage, state.pageSize);
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                filteredCalls: _filteredCalls,
                listOfAgents,
                durationRange,
                labelList,
                callList,
                totalItems
            };

        case FETCHING_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };

        case FILTER_CALLS_BY_AGENTS:
            return filterCallsByAgents(state, action);

        case FILTER_CALLS_BY_DURATION:
            return filterCallsByDuration(state, action);
        case UPDATE_NEXT_CALL_LABEL_SELECTION:
            if (action.call_id === "ALL") {
                return {
                    ...state,
                    callListLabelForUpdate: action.isSelected ? state.filteredCalls.map(({call_id}) => call_id) : [],
                    allSelected: action.isSelected
                }
            }
            if (action.isSelected) {
                return {
                    ...state,
                    callListLabelForUpdate: [...state.callListLabelForUpdate, action.call_id]
                };
            } else {
                return {
                    ...state,
                    callListLabelForUpdate: [...state.callListLabelForUpdate.filter(call_id => call_id !== action.call_id)]
                };
            }
        case SELECT_OP:
            return {
                ...state,
                opForUpdateLabelUpdate: action.op
            };

        case HANDLE_PAGINATION:
            return {
                ...state,
                activePage: activePage
            };
        case UPDATE_PAGE_SIZE:
            return {
                ...state,
                pageSize: pageSize
            };

        case HANDLE_SORT:
            let _isAscending, _sorted = _.sortBy(state.filteredCalls, [clickedColumn]);
            if (state.clickedColumn === clickedColumn) {
                _isAscending = !state.isAscending;
            } else {
                _isAscending = !state.isAscending;
            }
            return {
                ...state,
                clickedColumn,
                isAscending: _isAscending,
                filteredCalls: _isAscending ?
                    _sorted :
                    _sorted.reverse()
            };
        default:
            return state;
    }
};

export default dataReducer;
