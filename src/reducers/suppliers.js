import { REQUEST_SUPPLIERS_PENDING, REQUEST_SUPPLIERS_SUCCESS, REQUEST_SUPPLIERS_FAILURE } from '../actions/suppliers';

const initialState = {
    suppliers: [],
    isPending: true
}

export default function suppliers(state=initialState, action={}) {
    switch (action.type) {
        case REQUEST_SUPPLIERS_PENDING:
            return Object.assign({}, state, {isPending: true})
        case REQUEST_SUPPLIERS_SUCCESS:
            return Object.assign({}, state, {suppliers: action.payload, isPending: false})
        case REQUEST_SUPPLIERS_FAILURE:
            return Object.assign({}, state, {error: action.payload})
        default:
            return state
    }
}