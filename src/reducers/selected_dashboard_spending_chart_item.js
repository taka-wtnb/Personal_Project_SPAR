import { DISPLAY_DASHBOARD_SPENDING_CHART_ITEM } from '../actions/selected_dashboard_spending_chart_item';

const initialState = {
    selectedItem: 0
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case DISPLAY_DASHBOARD_SPENDING_CHART_ITEM:
            return Object.assign({}, state, {selectedItem: action.payload})
        default:
            return state
    }
}