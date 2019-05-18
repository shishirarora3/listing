import React from "react";
import _ from "lodash";
import {fetchData, filterCallsByAgents, filterCallsByDuration} from "../actions";
import {connect} from "react-redux";
import {H5, RangeInput, SmallFont} from "../styled-components";
import Separator from "@kiwicom/orbit-components/lib/Separator";
import Select from 'react-select';


const RenderFilterComponent = props => {
    const {
        listOfAgents,
        filterCallsByAgents,
        filterCallsByDuration,
        duration,
        durationRange
    } = props;
    const [minimum, maximum] = _.at(durationRange, ["minimum", "maximum"]);
    const _agents = _.map(listOfAgents, value => ({
        value,
        label: value
    }));
    return (
        <React.Fragment>
            <H5>Filter By Call Duration</H5>
            <RangeInput
                onChange={e => filterCallsByDuration(Number(e.target.value))}
                type="range"
                min={minimum}
                max={maximum}
                defaultValue={duration}
            />

            <SmallFont>Call Duration Range: [0-{duration}]</SmallFont>

            <H5>Filter By Agents</H5>
            <Separator/>
            <Select
                defaultValue={[]}
                name="callers"
                options={_agents}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select multiple callers"
                isMulti
                onChange={(...args) => {
                    const _agents = args[0];
                    const agents = _agents.map(({value}) => value);
                    filterCallsByAgents(agents);
                }}
            />
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    const {
        listOfAgents,
        duration,
        durationRange,
        labelList,
        callList
    } = state.appData;
    return {
        duration,
        listOfAgents,
        durationRange,
        labelList,
        callList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        filterCallsByAgents: async values => {
            await dispatch(filterCallsByAgents(values));
            dispatch(fetchData());
        },
        filterCallsByDuration: async value => {
            await dispatch(filterCallsByDuration(value));
            dispatch(fetchData());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RenderFilterComponent);
