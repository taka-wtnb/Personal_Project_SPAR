import { REQUEST_ITEMS_PENDING, REQUEST_ITEMS_SUCCESS, REQUEST_ITEMS_FAILURE } from '../actions/items';

const initialState = {
    items: [],
    isPending: true
}

export default function items(state=initialState, action={}) {
    switch (action.type) {
        case REQUEST_ITEMS_PENDING:
            return Object.assign({}, state, {isPending: true})
        case REQUEST_ITEMS_SUCCESS:
            return Object.assign({}, state, {items: action.payload, isPending: false})
        case REQUEST_ITEMS_FAILURE:
            return Object.assign({}, state, {error: action.payload})
        default:
            return state
    }
}