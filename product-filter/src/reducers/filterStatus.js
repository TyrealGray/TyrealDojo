import * as types from '../actions/actionTypes';

import * as products from '../store/products';

const initialState = {
    productData: products.productData,
    filterData: products.productData,
    isNutri: false,
    isMarigold: false,
    is205: false,
    is235: false,
    clickedProduct: null,
    cartData: [],
};

function clickAddToCartButton(state, action) {
    const newCartData = [...state.cartData];
    newCartData.push({...action.productInfo});

    return {
        ...state,
        cartData: newCartData,
    }
}

function triggerNutriWellCheckBox(state, action) {

    return filterData({
        ...state,
        isNutri: action.isChecked,
    })
}

function triggerMarigoldCheckBox(state, action) {
    return filterData({
        ...state,
        isMarigold: action.isChecked,
    })
}

function triggerPrice205CheckBox(state, action) {
    return filterData({
        ...state,
        is205: action.isChecked,
    })
}

function triggerPrice235CheckBox(state, action) {
    return filterData({
        ...state,
        is235: action.isChecked,
    })
}

function filterData(state) {
    const isAllBrandsUnChecked = !state.isNutri && !state.isMarigold,
        isAllPricesChecked = state.is205 && state.is235,
        isAllChecked = state.isNutri && state.isMarigold && isAllPricesChecked,
        isAllUnChecked = isAllBrandsUnChecked && !state.is205 && !state.is235;

    /**
     * condition that should return all product from filters
     */
    if (isAllChecked || isAllUnChecked || (isAllPricesChecked && isAllBrandsUnChecked)) {
        return {
            ...state,
            filterData: [...state.productData],
        };
    }

    let brandFilterData = [];

    if (state.isNutri) {
        for (const product of state.productData) {
            if (~product.name.indexOf('NutriWell')) {
                brandFilterData.push(product);
            }
        }
    }

    if (state.isMarigold) {
        for (const product of state.productData) {
            if (~product.name.indexOf('Marigold')) {
                brandFilterData.push(product);
            }
        }
    }

    let priceFilterData = [];

    if (state.is205 && (state.isNutri || state.isMarigold)) {
        for (const product of brandFilterData) {
            if (product.price <= 2.05) {
                priceFilterData.push(product);
            }
        }
    } else if (state.is205) {
        for (const product of state.productData) {
            if (product.price <= 2.05) {
                priceFilterData.push(product);
            }
        }
    }

    if (state.is235 && state.isNutri) {
        for (const product of state.productData) {
            if (product.price > 2.05 && ~product.name.indexOf('NutriWell')) {
                priceFilterData.push(product);
            }
        }
    } else if(state.is235 && state.isMarigold){
        for (const product of state.productData) {
            if (product.price > 2.05 && ~product.name.indexOf('Marigold')) {
                priceFilterData.push(product);
            }
        }
    }else if (state.is235) {
        for (const product of state.productData) {
            if (product.price > 2.05) {
                priceFilterData.push(product);
            }
        }
    }

    const newFilterData = priceFilterData.length ? priceFilterData : brandFilterData;

    return {
        ...state,
        filterData: newFilterData,
    }
}

export default function filterStatus(state = initialState, action) {
    switch (action.type) {
        case types.CLICK_ADD_TO_CART_BUTTON:
            return clickAddToCartButton(state, action);
        case types.CLICK_PRODUCT:
            return {
                ...state,
                clickedProduct: action.productInfo
            };
        case types.CLICK_BROWSE_BUTTON:
            /**
             * reset filters status when click browse button
             */
            return {
                ...state,
                filterData: state.productData,
                isNutri: false,
                isMarigold: false,
                is205: false,
                is235: false,
            };
        case types.TRIGGER_NUTRIWELL_CHECK_BOX:
            return triggerNutriWellCheckBox(state, action);
        case types.TRIGGER_MARIGOLD_CHECK_BOX:
            return triggerMarigoldCheckBox(state, action);
        case types.TRIGGER_0_TO_2DOT05_CHECK_BOX:
            return triggerPrice205CheckBox(state, action);
        case types.TRIGGER_2DOT05_TO_2DOT35_CHECK_BOX:
            return triggerPrice235CheckBox(state, action);
        default:
            return state;
    }
}