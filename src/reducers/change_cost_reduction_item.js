import { CHANGE_COST_REDUCTION_ITEM } from '../actions/change_cost_reduction_item';

const initialState = {
    isItemSelected: false
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case CHANGE_COST_REDUCTION_ITEM:
            return Object.assign({}, state, {isItemSelected: true})
        default:
            return state
    }
}