
import {CHANGE} from '../actions'

const initialState = {val: '変更前です'}

export default(state=initialState, action) => {
    switch(action.type){
        case CHANGE:
            return {val: '変更後です'}
        default:
            return state
    }
}
