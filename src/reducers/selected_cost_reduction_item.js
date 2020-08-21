import { DISPLAY_COST_REDUCTION_ITEM } from '../actions/selected_cost_reduction_item';

const initialState = {
    selectedItem: 0
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case DISPLAY_COST_REDUCTION_ITEM:
            return Object.assign({}, state, {selectedItem: action.payload})
        default:
            return state
    }
}