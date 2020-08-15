import { DEFAULT_SUPPLIER } from '../actions/default_supplier';

const initialState = {
    defaultSupplier: ''
}

export default function showDefaultSupplier(state=initialState, action={}) {
    switch (action.type) {
        case DEFAULT_SUPPLIER:
            return Object.assign({}, state, {defaultSupplier: action.payload})
        default:
            return state
    }
}