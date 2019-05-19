import {Col, ContentWrapper, H5, SideBarView} from "../styled-components";
import {InputLabelField} from "./InputLabelField";
import React from "react";
import FilterSideBar from "./FilterSideBar";
import {Separator} from "@kiwicom/orbit-components";
import Select from 'react-select';

export const SideBarContainer = (props) => {
    const {
        opForUpdateLabelUpdate,
        selectOp
    } = props;
    const options = [
        {value: "add", label: "Add/Update"},
        {value: "remove", label: "Remove"}
    ];
    return <SideBarView>
        <Col>
            <ContentWrapper>
                <H5>Labels Operation</H5>
                <Select
                    value={{
                        value: opForUpdateLabelUpdate,
                        label: opForUpdateLabelUpdate && options.find(i => i.value === opForUpdateLabelUpdate).label
                    }}
                    options={options}
                    onChange={(item) => {
                        selectOp(item.value)
                    }}
                />
            </ContentWrapper>
            <Separator/>
            <InputLabelField {...props}/>
            <Separator/>
            <FilterSideBar/>
        </Col>
    </SideBarView>;
};
