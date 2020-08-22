import { CHANGE_ITEM_FOR_COST_REDUCTION_PIE_CHART } from '../actions/change_item_for_cost_reduction_pie_chart';

const initialState = {
    isItemSelected: false
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case CHANGE_ITEM_FOR_COST_REDUCTION_PIE_CHART:
            return Object.assign({}, state, {isItemSelected: true})
        default:
            return state
    }
}