

import {ADD, REMOVE, CHANGEISDONE} from '../actions'

const initialState = {
    todos:[],
    id: 0,
    index: 1,
    isDone: false,
}
export default (state = initialState,  action) => {
    switch(action.type){
        case ADD:
            console.log(action)
            console.log(state)
            return {
                id: state.id + 1,
                todos: [...state.todos,
                    {
                        id: state.id + 1,
                        title: action.title,
                        key: state.id + 1,
                        isDone: false
                    }
                ],
            }

        case REMOVE:
            const removeTodos = [...state.todos]
            removeTodos.splice(action.index, 1)
            return {
                id: state.id,
                todos: removeTodos,
                isDone: state.isDone,
            }

        case CHANGEISDONE:
            const changedTodos = [...state.todos]
            changedTodos[action.index].isDone = !changedTodos[action.index].isDone

            return {
                id: state.id,
                todos: changedTodos,
            }

        default:
            return state
    }
}
