import React, {Component} from 'react';

import ListView from "../../components/ListView/index";
import Product from "../Product/index";

import './ProductList.css';

export default class ProductList extends Component {
    constructor(props){
        super(props);
    }

    renderProduct(itemData, index){
        return (
            <Product key={index} data={itemData} />
        );
    }

    render(){
        return (
            <div className='ProductList'>
            <ListView data={this.props.data} onRenderItem={(itemData, index)=>{
                return this.renderProduct(itemData, index);
            }}/>
            </div>
        );
    }
}