
// ①アクションを作ってreducerに渡す


// action を呼び出すにはimportが必要：exportしておくことでコンポーネントから呼び出すことができる（Reactはnamed exportができる）

// COUNTPLUS, COUNTMINUS という名前で受け取れるようにしている（統一された名前を作ることで呼び出すときの名前を固定している）
export const COUNTPLUS = 'countPlus'
export const COUNTMINUS = 'countMinus'


// Action Creator と Action Object が一緒になってる
// Action Creator 関数（Action Objectを作るためだけの関数）
export const countPlus = () => ({
    // return したいAction Object(typeが必須)
    // 渡したいのはアクションオブジェクト（reducerへ）
    type: COUNTPLUS
})

export const countMinus = () => ({
    type: COUNTMINUS
})

// ----------------練習-----------------------
export const ZERO = 'zero'
export const zero = () => ({
    type: ZERO
})

// ---------言葉変えるだけ--------------
export const CHANGE = 'change'
export const change = () => ({
    type: CHANGE
})


// ------------------------------------
// TodoList

// export const ADD = 'add'
// export const add = e => ({
    //     type: ADD,
    //     text: e.target.previousElementSibling.value
    // })



// add関数の名前を const ADDにしておく
export const ADD = 'add'
// actionsでcreator関数を定義（returnするactionオブジェクトにtypeは必須）
export const add = e => (
    {
    type: ADD,
    title: e.target.previousElementSibling.value,
    // ▲ここで設定したactionオブジェクトがreducerの第二引数に入る

    // id: 1,
    // isDone: false,

    // ボタンを押したら
    // {type: "add", title: "インプット値", id: 1}がコンソールに出る
    }
)

export const REMOVE = 'remove'
export const remove = index => ({
    type: REMOVE,
    index: index,
    // isDone: false
})


// actions ではactionオブジェクトに値を持たせることしかできない（変更するのはreducer）
export const CHANGEISDONE = 'changeIsDone'
// export const changeIsDone = todo => ({
//     type: CHANGEISDONE,
//     isDone: !todo.isDone // 変えているのはここじゃない
// })
export const changeIsDone = (index) => ({
    type: CHANGEISDONE,
    // todo: todo,
    index: index,
})
