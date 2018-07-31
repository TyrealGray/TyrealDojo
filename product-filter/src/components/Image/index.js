import React, { Component } from 'react';
import './Image.css';

export default class Image extends Component {

    render(){
        return (
            <div className='Image'>
                <img width={this.props.width} height={this.props.height} src={this.props.src} alt={`${this.props.src}`}/>
            </div>
        );
    }
}