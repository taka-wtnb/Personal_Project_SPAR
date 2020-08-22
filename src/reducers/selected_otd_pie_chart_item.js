import { DISPLAY_OTD_PIE_CHART_ITEM } from '../actions/selected_otd_pie_chart_item';

const initialState = {
    selectedItem: 0
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case DISPLAY_OTD_PIE_CHART_ITEM:
            return Object.assign({}, state, {selectedItem: action.payload})
        default:
            return state
    }
}