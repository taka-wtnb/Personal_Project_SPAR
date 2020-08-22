import { COST_REDUCTION_PIE_CHART_MONTHS } from '../actions/cost_reduction_pie_chart_months';

const initialState = {
    months: 'Past 12 Months'
}

export default function setMonths(state=initialState, action={}) {
    switch (action.type) {
        case COST_REDUCTION_PIE_CHART_MONTHS:
            return Object.assign({}, state, {months: action.payload})
        default:
            return state
    }
}