import * as types from './actionTypes';

export function clickCartButton(){
    return {
        type: types.CLICK_CART_BUTTON,
    }
}

export function clickBrowseButton(){
    return {
        type: types.CLICK_BROWSE_BUTTON,
    };
}

export function triggerNutriWellCheckBox(isChecked){
    return {
        type: types.TRIGGER_NUTRIWELL_CHECK_BOX,
        isChecked,
    };
}

export function triggerMarigoldCheckBox(isChecked){
    return {
        type: types.TRIGGER_MARIGOLD_CHECK_BOX,
        isChecked,
    };
}

export function triggerPrice205CheckBox(isChecked){
    return {
        type: types.TRIGGER_0_TO_2DOT05_CHECK_BOX,
        isChecked,
    };
}

export function triggerPrice235CheckBox(isChecked){
    return {
        type: types.TRIGGER_2DOT05_TO_2DOT35_CHECK_BOX,
        isChecked,
    }
}