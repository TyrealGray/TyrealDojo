import React, { Component } from 'react';
import './ListView.css';

export default class ListView extends Component {
    constructor(props){
        super(props);
    }

    onRenderItem(data){
        let items = [];
        for(const [index, itemData] of data.entries()){
            items.push(this.props.onRenderItem(itemData,index));
        }

        return items;
    }

    render(){
        return (
            <div className='ListView'>{this.onRenderItem(this.props.data)}</div>
        );
    }
}