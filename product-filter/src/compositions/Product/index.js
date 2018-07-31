import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as productActions from '../../actions/productActions';

import Label from "../../components/Label/index";
import Button from "../../components/Button/index";
import Image from "../../components/Image/index";

import './Product.css';

class Product extends Component {

    onClickAddToCartButton(e) {
        e.stopPropagation();
        const product = this.props.data;
        this.props.clickAddToCartButton(product);
    }

    onClickProduct(e) {
        this.props.clickProduct(this.props.data);
    }

    render() {
        const product = this.props.data;
        return (
            <div className='Product' onClick={this.onClickProduct.bind(this)}>
                <Image src={product.imgSrc} width={150} height={150}/>
                <Label>{product.name}</Label>
                <Label>{product.size}</Label>
                <Label>{`$${product.price}`}</Label>

                <Button style={{flex: 0.8, backgroundColor: '#de6768'}}
                        onClick={this.onClickAddToCartButton.bind(this)}>Add To Cart</Button>
            </div>
        );
    }
}

export default connect(
    state => ({
        pageStatus: state.pageStatus,
    }),
    dispatch => ({
        clickAddToCartButton: e => dispatch(productActions.clickAddToCartButton(e)),
        clickProduct: e => dispatch(productActions.clickProduct(e)),
    })
)(Product);
