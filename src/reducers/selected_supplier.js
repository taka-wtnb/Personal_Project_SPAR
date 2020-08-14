import { DISPLAY_SUPPLIER } from '../actions/selected_supplier';

const initialState = {
    selectedSupplier: ''
}

export default function changeSupplier(state=initialState, action={}) {
    switch (action.type) {
        case DISPLAY_SUPPLIER:
            return Object.assign({}, state, {selectedSupplier: action.payload})
        default:
            return state
    }
}