import * as types from '../actions/actionTypes';

import * as pageNames from '../store/pageNames';

/**
 * reducer for managing show different page
 */
const initialState = {
  name: pageNames.BROWSE_PAGE
};

export default function pageStatus(state = initialState,action){
  switch (action.type){
      case types.CLICK_CART_BUTTON:
        return {
            ...state,
            name: pageNames.CART_PAGE,
        };
      case types.CLICK_BROWSE_BUTTON:
          return {
              ...state,
              name: pageNames.BROWSE_PAGE,
          };
      case types.CLICK_PRODUCT:
          return {
              ...state,
              name: pageNames.PDP_PAGE,
          };
      default:
        return state;
  }
}