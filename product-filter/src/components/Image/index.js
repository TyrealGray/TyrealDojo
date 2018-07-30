import React, { Component } from 'react';
import './Image.css';

export default class Image extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='Image'>
                <img width={this.props.width} height={this.props.height} src={this.props.src}/>
            </div>
        );
    }
}