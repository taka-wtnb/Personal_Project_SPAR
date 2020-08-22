import { DISPLAY_OTD_ITEM } from '../actions/selected_otd_item';

const initialState = {
    selectedItem: 0
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case DISPLAY_OTD_ITEM:
            return Object.assign({}, state, {selectedItem: action.payload})
        default:
            return state
    }
}