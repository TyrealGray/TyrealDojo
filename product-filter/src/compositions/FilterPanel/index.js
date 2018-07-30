import React, { Component } from 'react';
import './FilterPanel.css';
import CheckBox from "../../components/CheckBox/index";
import Label from "../../components/Label/index";

export default class FilterPanel extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='FilterPanel'>
                <Label>Brands</Label>
                <CheckBox label={'NutriWell'}/>
                <CheckBox label={'Marigold'}/>
                <Label>Price</Label>
                <CheckBox label={'0-2.05'}/>
                <CheckBox label={'2.05-2.35'}/>
            </div>
        );
    }
}