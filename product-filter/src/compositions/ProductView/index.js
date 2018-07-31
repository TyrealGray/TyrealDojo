import React, {Component} from 'react';
import {connect} from 'react-redux';

import FilterPanel from '../FilterPanel';
import ProductList from '../ProductList';

import './ProductView.css';

class ProductView extends Component {

    render(){
        return (
            <div className='ProductView'>
                <FilterPanel/>
                <ProductList data={this.props.filterStatus.filterData}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        filterStatus: state.filterStatus,
    }),
    dispatch => ({
    })
)(ProductView);