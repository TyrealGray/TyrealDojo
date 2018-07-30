import React, {Component} from 'react';
import {connect} from 'react-redux';

import MenuBar from './compositions/MenuBar';
import ProductView from './compositions/ProductView';
import CartView from "./compositions/CartView/index";
import ProductDeailView from "./compositions/ProductDetailView";

import './App.css';
import * as pageNames from './store/pageNames';

class App extends Component {

    renderView() {
        let page = null;

        const {name} = this.props.pageStatus;
        switch (name) {
            case pageNames.BROWSE_PAGE:
                page = this.renderBrowsePage();
                break;
            case pageNames.CART_PAGE:
                page = this.renderCartPage();
                break;

            case pageNames.PDP_PAGE:
                page = this.renderProductDeailView();
                break;
            default:
                break;
        }

        return page;
    }

    renderBrowsePage() {
        return <ProductView/>;
    }

    renderCartPage() {
        return <CartView/>
    }

    renderProductDeailView(){
        return <ProductDeailView/>
    }

    render() {
        return (
            <div className="App">
                <MenuBar/>
                {this.renderView()}
            </div>
        );
    }
}

export default connect(
    state => ({
        pageStatus: state.pageStatus,
    }),
    dispatch => ({})
)(App);
