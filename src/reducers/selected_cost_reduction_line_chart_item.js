import { DISPLAY_COST_REDUCTION_LINE_CHART_ITEM } from '../actions/selected_cost_reduction_line_chart_item';

const initialState = {
    selectedItem: 0
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case DISPLAY_COST_REDUCTION_LINE_CHART_ITEM:
            return Object.assign({}, state, {selectedItem: action.payload})
        default:
            return state
    }
}