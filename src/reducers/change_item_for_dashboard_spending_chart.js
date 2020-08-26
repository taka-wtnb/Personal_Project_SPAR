import { CHANGE_ITEM_FOR_DASHBOARD_SPENDING_CHART } from '../actions/change_item_for_dashboard_spending_chart';

const initialState = {
    isItemSelected: false
}

export default function changeItem(state=initialState, action={}) {
    switch (action.type) {
        case CHANGE_ITEM_FOR_DASHBOARD_SPENDING_CHART:
            return Object.assign({}, state, {isItemSelected: true})
        default:
            return state
    }
}