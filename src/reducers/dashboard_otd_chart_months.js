import { DASHBOARD_OTD_CHART_MONTHS } from '../actions/dashboard_otd_chart_months';

const initialState = {
    months: 'Past 12 Months'
}

export default function setMonths(state=initialState, action={}) {
    switch (action.type) {
        case DASHBOARD_OTD_CHART_MONTHS:
            return Object.assign({}, state, {months: action.payload})
        default:
            return state
    }
}