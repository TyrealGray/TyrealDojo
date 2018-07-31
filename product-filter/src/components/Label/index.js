import React, { Component } from 'react';
import './Label.css';

export default class Label extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <label className={this.props.className? this.props.className :'Label'}>
                {this.props.children}
            </label>
        );
    }
}