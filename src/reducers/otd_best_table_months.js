import { OTD_BEST_TABLE_MONTHS } from '../actions/otd_best_table_months';

const initialState = {
    months: 'Past 12 Months'
}

export default function setMonths(state=initialState, action={}) {
    switch (action.type) {
        case OTD_BEST_TABLE_MONTHS:
            return Object.assign({}, state, {months: action.payload})
        default:
            return state
    }
}