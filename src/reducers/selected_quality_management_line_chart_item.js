import { DISPLAY_QUALITY_MANAGEMENT_LINE_CHART_ITEM } from '../actions/selected_quality_management_line_chart_item';

const initialState = {
    selectedItem: 0
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case DISPLAY_QUALITY_MANAGEMENT_LINE_CHART_ITEM:
            return Object.assign({}, state, {selectedItem: action.payload})
        default:
            return state
    }
}