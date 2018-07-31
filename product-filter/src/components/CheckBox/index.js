import React, { Component } from 'react';
import Label from "../Label/index";

import './CheckBox.css';

export default class CheckBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isChecked: false,
        };
    }

    toggleCheckboxChange() {
        this.setState({
           isChecked: !this.state.isChecked
        },()=>{
            if(this.props.onTrigger){
                this.props.onTrigger(this.state.isChecked);
            }
        });

    }

    render(){
        const { label } = this.props;
        const { isChecked } = this.state;

        return (
            <div className="CheckBox">
                <Label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange.bind(this)}
                    />
                    {label}
                </Label>
            </div>
        );
    }
}