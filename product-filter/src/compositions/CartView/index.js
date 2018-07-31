import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProductList from '../ProductList';

import './CartView.css';

class CartView extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='CartView'>
                <ProductList data={this.props.filterStatus.cartData}/>
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
)(CartView);