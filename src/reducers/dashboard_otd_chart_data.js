import { REQUEST_DB_OTD_CHART_DATA_PENDING, REQUEST_DB_OTD_CHART_DATA_SUCCESS, REQUEST_DB_OTD_CHART_DATA_FAILURE } from '../actions/dashboard_otd_chart_data';

const initialState = {
    chartData: [],
    isPending: true
}

export default function suppliers(state=initialState, action={}) {
    switch (action.type) {
        case REQUEST_DB_OTD_CHART_DATA_PENDING:
            return Object.assign({}, state, {isPending: true})
        case REQUEST_DB_OTD_CHART_DATA_SUCCESS:
            return Object.assign({}, state, {chartData: action.payload, isPending: false})
        case REQUEST_DB_OTD_CHART_DATA_FAILURE:
            return Object.assign({}, state, {error: action.payload})
        default:
            return state
    }
}