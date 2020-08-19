import { OTD_Line_CHART_MONTHS } from '../actions/otd_line_chart_months';

const initialState = {
    months: 'Past 12 Months'
}

export default function setMonths(state=initialState, action={}) {
    switch (action.type) {
        case OTD_Line_CHART_MONTHS:
            return Object.assign({}, state, {months: action.payload})
        default:
            return state
    }
}