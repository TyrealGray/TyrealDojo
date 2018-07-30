import * as types from '../actions/actionTypes';

import * as products from '../store/products';

const initialState = {
    productData: products.productData,
    clickedProduct: null,
    cartData: [],
};

function clickAddToCartButton(state, action){
    const newCartData = [...state.cartData];
    newCartData.push({...action.productInfo});

    return {
        ...state,
        cartData: newCartData,
    }
}

export default function filterStatus(state = initialState, action){
    switch (action.type){
        case types.CLICK_ADD_TO_CART_BUTTON:
            return clickAddToCartButton(state,action);
        case types.CLICK_PRODUCT:
            return {
                ...state,
                clickedProduct: action.productInfo
            };
        default:
            return state;
    }
}