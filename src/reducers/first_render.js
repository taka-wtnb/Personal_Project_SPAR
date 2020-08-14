import { RENDER_APP } from '../actions/first_render';

const initialState = {
    isFirstRender: false
}

export default function catchFirstRender(state=initialState, action={}) {
    switch (action.type) {
        case RENDER_APP:
            return Object.assign({}, state, {isFirstRender: true})
        default:
            return state
    }
}