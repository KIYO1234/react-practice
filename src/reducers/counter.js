
// -------------- Reducer-------------------
// ReducerはStoreに内包されている＝stateを管理できる場所


// Reducerは
// reducer はactionを受け取る方
// reducerの中の処理



// actionsからimport（COUNTPLUS = 'countPlus'、COUNTMINUS = 'countMinus'）：actionsファイルに書いてある

// ただactionsで作った関数（中身はオブジェクト）をimportしているだけ
import {COUNTPLUS, COUNTMINUS} from '../actions'
// import {ZERO} from '../actions'
import {ZERO} from '../actions'

// 初期値を代入するための変数（reducerは引数を2つとる）
// storeの値にも初期値が必要
// stateの初期値になる▼これをいじっていく
const initialState = {val: 0}

// 無名関数
// Reducerの本格的な処理
// reducerの第一引数：初期値の設定、第二引数：actionオブジェクトを受け取る(オブジェクト)
// typeが入ってるやつ
// 呼び出し元が一つ（switchを使う（ifでもいいけどswitchの方が見やすい））
// 関数の処理を別のコンポーネントで呼び出せるようにしている

export default(state = initialState, action) => {
    // initialStateはほぼ必須
    // console.log(action); // 謎のオブジェクト(keyはtype)
    // console.log(state) // {val:0}

    // actionのtypeに応じて処理を分岐
    switch(action.type){
        // action.typeには(COUNTPLUSとCOUNTMINUSが入っている)
        case COUNTPLUS:
            return {val: state.val + 1}
        case COUNTMINUS:
            return {val: state.val - 1}
        // どこのcaseにも引っかからない場合はただのstateを返却するようにしてる
        case ZERO:
            return {val: 0}
        default:
            return state
    }
}