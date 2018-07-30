import React, { Component } from 'react';
import Label from "../Label/index";
import './Button.css';

export default class Button extends Component {
    constructor(props){
        super(props);
    }

    onClick(e) {
        e.preventDefault();
        this.props.onClick(e);
    }

    render(){
        return (
            <div className='Button' style={this.props.style} onClick={this.onClick.bind(this)}>
                <Label>{this.props.children}</Label>
            </div>
        );
    }
}