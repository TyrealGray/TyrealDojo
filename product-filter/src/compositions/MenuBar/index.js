import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/Button';

import * as menuBarActions from '../../actions/menuBarActions';

import './MenuBar.css';

import * as pageNames from '../../store/pageNames';

class MenuBar extends Component {
    constructor(props) {
        super(props);
    }

    onClickCartButton(e) {
        this.props.clickCartButton(e);
    }

    onClickBrowseButton(e) {
        this.props.clickBrowseButton(e);
    }

    renderButtons() {
        let buttons = [],
            cartNumberString = '';
        const {name} = this.props.pageStatus;
        const cartNumber = this.props.filterStatus.cartData.length;

        if(cartNumber){
            cartNumberString = `(${cartNumber})`;
        }
        const cartButton = (<Button key={'Cart'} style={{flex: 0.2, backgroundColor: '#de6768'}}
                                    onClick={this.onClickCartButton.bind(this)}>{`Cart${cartNumberString}`}</Button>);

        const browseButton = (<Button key={'Browse'} style={{flex: 0.2, backgroundColor: '#d1e4f4'}}
                                      onClick={this.onClickBrowseButton.bind(this)}>Browse</Button>);
        if (name === pageNames.BROWSE_PAGE) {
            buttons.push(cartButton);
        } else if (name === pageNames.CART_PAGE) {
            buttons.push(browseButton);
        } else {
            buttons.push(browseButton);
            buttons.push(cartButton);
        }

        return buttons;
    }

    render() {
        return (
            <div className='MenuBar'>
                {this.renderButtons()}
            </div>
        );
    }
}

export default connect(
    state => ({
        pageStatus: state.pageStatus,
        filterStatus: state.filterStatus,
    }),
    dispatch => ({
        clickCartButton: e => dispatch(menuBarActions.clickCartButton(e)),
        clickBrowseButton: e => dispatch(menuBarActions.clickBrowseButton(e)),
    })
)(MenuBar);