import React from "react";
import {ContentWrapper} from "../styled-components";
import {Button} from "semantic-ui-react";
import {Icons, InputField, Tag} from "@kiwicom/orbit-components";

export class InputLabelField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
            inputLabels: []
        };
    }

    onSubmit = () => {

        const labelsForUpdate = this.state.inputLabels;
        this.props.applyLabels(labelsForUpdate);
    };

    render() {
        const {inputLabels, inputValue} = this.state;
        return (<React.Fragment>
            <ContentWrapper>
                <InputField
                    style={{zIndex: 0}}
                    tags={
                        inputLabels.map((_label, key) => (<Tag
                            key={key}
                            icon={<Icons.Remove/>}
                            size="normal"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                            onRemove={() => {
                                this.setState({
                                    inputLabels: [...inputLabels.filter(l => l !== _label)]
                                });
                            }}
                            dataTest="test"
                        >
                            {_label}
                        </Tag>))
                    }
                    value={inputValue}
                    placeholder="Add Labels Here.."
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
                                inputLabels: [...inputLabels, value]
                            });
                        }
                        this.setState({
                            inputValue: ""
                        })
                    }}
                >
                </InputField>
            </ContentWrapper>
            <ContentWrapper>
                <Button onClick={() => this.onSubmit()}>Apply Labels</Button>

            </ContentWrapper></React.Fragment>);

    }
}
