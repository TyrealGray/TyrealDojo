import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as productActions from '../../actions/productActions';

import Label from "../../components/Label/index";
import Image from "../../components/Image";
import Button from "../../components/Button";

import './ProductDetailView.css';

class ProductDetailView extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const productData = this.props.filterStatus.clickedProduct;

        return (
            <div className='ProductDetailView'>
                <Label className='ProductDetailView-title'>{productData.name}</Label>
                <div className='ProductDetailView-detail'>
                    <Image width={400} height={400} src={productData.imgSrc}/>
                    <div className='ProductDetailView-description'>
                        <Label>{productData.size}</Label>
                        <Label>{`$${productData.price}`}</Label>
                        <Label style={{padding: '5px'}}>
                            {`${productData.name} is freshly brewed from a special home recipe.
                            All natural, with no added preservatives and reduced in sugar,
                            ${productData.name} is the great-tasting, 'healthier-choice'.`}
                        </Label>
                        <Button style={{backgroundColor: '#de6768'}} onClick={() => {
                            this.props.clickAddToCartButton(productData);
                        }}>
                            Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        filterStatus: state.filterStatus,
    }),
    dispatch => ({
        clickAddToCartButton: e => dispatch(productActions.clickAddToCartButton(e)),
    })
)(ProductDetailView);