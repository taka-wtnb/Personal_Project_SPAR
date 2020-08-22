import { CHANGE_ITEM_FOR_OTD_LINE_CHART } from '../actions/change_item_for_otd_line_chart';

const initialState = {
    isItemSelected: false
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case CHANGE_ITEM_FOR_OTD_LINE_CHART:
            return Object.assign({}, state, {isItemSelected: true})
        default:
            return state
    }
}