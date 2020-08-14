import { CHANGE_SUPPLIER } from '../actions/change_supplier';

const initialState = {
    isSupplierSelected: false
}

export default function changeSupplier(state=initialState, action={}) {
    switch (action.type) {
        case CHANGE_SUPPLIER:
            return Object.assign({}, state, {isSupplierSelected: true})
        default:
            return state
    }
}