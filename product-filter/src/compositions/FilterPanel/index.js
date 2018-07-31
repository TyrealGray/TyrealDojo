import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as menuBarActions from "../../actions/menuBarActions";

import CheckBox from "../../components/CheckBox/index";
import Label from "../../components/Label/index";

import './FilterPanel.css';

class FilterPanel extends Component{

    onTrigger(name, isChecked){
        switch (name) {
            case 'NutriWell':
                this.props.triggerNutriWellCheckBox(isChecked);
                break;
            case 'Marigold':
                this.props.triggerMarigoldCheckBox(isChecked);
                break;
            case '0-2.05':
                this.props.triggerPrice205CheckBox(isChecked);
                break;
            case '2.05-2.35':
                this.props.triggerPrice235CheckBox(isChecked);
                break;
            default:
                break;
        }
    }

    render(){
        return (
            <div className='FilterPanel'>
                <Label>Brands</Label>
                <CheckBox label={'NutriWell'} onTrigger={(isChecked)=>{this.onTrigger('NutriWell',isChecked)}}/>
                <CheckBox label={'Marigold'} onTrigger={(isChecked)=>{this.onTrigger('Marigold',isChecked)}}/>
                <Label>Price</Label>
                <CheckBox label={'0-2.05'} onTrigger={(isChecked)=>{this.onTrigger('0-2.05',isChecked)}}/>
                <CheckBox label={'2.05-2.35'} onTrigger={(isChecked)=>{this.onTrigger('2.05-2.35',isChecked)}}/>
            </div>
        );
    }
}

export default connect(
    () => ({}),
    dispatch => ({
        triggerNutriWellCheckBox: isChecked => dispatch(menuBarActions.triggerNutriWellCheckBox(isChecked)),
        triggerMarigoldCheckBox: isChecked => dispatch(menuBarActions.triggerMarigoldCheckBox(isChecked)),
        triggerPrice205CheckBox: isChecked => dispatch(menuBarActions.triggerPrice205CheckBox(isChecked)),
        triggerPrice235CheckBox: isChecked => dispatch(menuBarActions.triggerPrice235CheckBox(isChecked)),
    })
)(FilterPanel);