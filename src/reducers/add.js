
// --------------   Reducers    --------------------

import {ADD, REMOVE, CHANGEISDONE} from '../actions'

// リストに出ている初期値（App.jsのprops.text）
// const initialState = {text: ''}
// export default (state = initialState, action) => {
//     // このaciton（reducerの第二引数）にe.target.previousElementSibling.valueが入る
//     switch(action.type){
//         case ADD:
//             // actionだけでいけた！
//             console.log(action) // {type: add, text: '入力された値'}
//             return {text: action}
//             // ボタンを押したらリストに出てくる文字列
//         default:
//             return state
//     }
// }


// reducersで関数の中身を作る
// const initialState = {
//     todos:[
//         // {id: 1, title: '会議'},
//         // {id: 2, title: 'チーム開発'},
//     ],
//     id: 0,
//     index: 1,
// }
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
            // ▲{type: "add", title: "aaa", id: 1}

            console.log(state) // ちゃんと出る(todos)
            // console.log(action.id)

            return {
                // タスクを追加するときには破壊しないで新たにセットする

                // 別で持たせておくid（タスク追加のたびにこいつを1ずつ増やしていく）
                id: state.id + 1,


                // -----------------------------------
                // [...state.todos, {}]：分割代入▼
                todos: [...state.todos,
                // -----------------------------------
                    // --------------------------------------
                    // ▼配列に追加する個々のオブジェクトに持たせるデータ（state.todoにこいつを足したものをセットする）
                    {id: state.id + 1,title: action.title, key: state.id + 1, isDone: false}
                    // --------------------------------------
                ],
            }
            // {todos: 新しい配列}
            // {todos: の部分は固定}
        case REMOVE:
            console.log(action) // {type: 'remove', index: 数字}
            // console.log(action.index)
            const removeTodos = [...state.todos]
            removeTodos.splice(action.index, 1)
            return {
                // 初期設定から必要なプロパティを抜き出しているイメージ
                id: state.id,
                todos: removeTodos,
                isDone: state.isDone,
            }
        // case CHANGEISDONE:
        //     // console.log(state)
        //     // console.log(action);
        //     console.log(state.todos)
        //     // console.log(action.isDone);
        //     // let newIsDone = !action.isDone
        //     // console.log(newIsDone)
        //     console.log(action);

        //     return {
        //         isDone: !action.isDone.isDone, // ここで変えている
        //         id: state.id,
        //         todos: [...state.todos],
        //     }

        case CHANGEISDONE:
            // console.log(state.todos)
            // console.log(state.todos[action.index])
            // console.log(action);
            // console.log(state.todos[index]);

            // console.log(action.index);
            // console.log(action.index.isDone);

            // action.index.isDone = !action.index.isDone
            // console.log(action.index.isDone);


            const changedTodos = [...state.todos]
            changedTodos[action.index].isDone = !changedTodos[action.index].isDone

            return {
                // isDone: !action.isDone.isDone, // ここで変えている
                id: state.id,
                todos: changedTodos,
                // isDone: selsectedIsDone
            }

        default:
            return state
    }
}
