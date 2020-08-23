import { CHANGE_ITEM_FOR_COST_REDUCTION_TABLE } from '../actions/change_item_for_cost_reduction_table';

const initialState = {
    isItemSelected: false
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case CHANGE_ITEM_FOR_COST_REDUCTION_TABLE:
            return Object.assign({}, state, {isItemSelected: true})
        default:
            return state
    }
}