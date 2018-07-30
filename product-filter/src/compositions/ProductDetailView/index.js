import React, {Component} from 'react';
import {connect} from 'react-redux';

import Label from "../../components/Label/index";

import './ProductDeailView.css';

class ProductDeailView extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='ProductDeailView'>
                <Label>{this.props.filterStatus.clickedProduct.name}</Label>
            </div>
        );
    }
}

export default connect(
    state => ({
        filterStatus: state.filterStatus,
    }),
    dispatch => ({
        // clickCartButton: e => dispatch(menuBarActions.clickCartButton(e)),
        // clickBrowseButton: e => dispatch(menuBarActions.clickBrowseButton(e)),
    })
)(ProductDeailView);