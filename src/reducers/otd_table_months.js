import { OTD_TABLE_MONTHS } from '../actions/otd_table_months';

const initialState = {
    months: 'Past 12 Months'
}

export default function setMonths(state=initialState, action={}) {
    switch (action.type) {
        case OTD_TABLE_MONTHS:
            return Object.assign({}, state, {months: action.payload})
        default:
            return state
    }
}