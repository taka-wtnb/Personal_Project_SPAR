import { DASHBOARD_SPENDING_TABLE_MONTHS } from '../actions/dashboard_spending_table_months';

const initialState = {
    months: 'Past 12 Months'
}

export default function setMonths(state=initialState, action={}) {
    switch (action.type) {
        case DASHBOARD_SPENDING_TABLE_MONTHS:
            return Object.assign({}, state, {months: action.payload})
        default:
            return state
    }
}