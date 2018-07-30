import React, {Component} from 'react';
import {connect} from 'react-redux';

import FilterPanel from '../FilterPanel';
import ProductList from '../ProductList';

import './ProductView.css';

class ProductView extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='ProductView'>
                <FilterPanel/>
                <ProductList data={this.props.filterStatus.productData}/>
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
)(ProductView);