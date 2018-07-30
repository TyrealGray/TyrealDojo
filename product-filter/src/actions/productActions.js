import * as types from './actionTypes';

export function clickAddToCartButton(productInfo){
    return {
        type: types.CLICK_ADD_TO_CART_BUTTON,
        productInfo
    }
}

export function clickProduct(productInfo) {
    return {
        type: types.CLICK_PRODUCT,
        productInfo
    }
}