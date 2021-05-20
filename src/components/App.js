import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import {connect} from 'react-redux'
import {countPlus, countMinus} from '../actions'
import {zero} from '../actions'
import {change} from '../actions'
import {add} from '../actions'
import {remove} from '../actions'
import {changeIsDone} from '../actions'

// 親のProviderからStoreの情報を受け取っている側
class App extends React.Component {
  render(){
    const props = this.props // Providerの引数のstoreを参照
    // console.log(props)
    // {val: 0, countPlus: f, countMinus: f, zero: f}
    // src/index.jsで<Provider store = {store}>で<App>（ここ）に渡している
    return (
      <React.Fragment>
        <p>現在の数字は{props.val}です</p>
        <button onClick={props.countPlus}>+1</button>
        <button onClick={props.countMinus}>-1</button>
        <button onClick={props.zero}>0</button>

        <h4>練習</h4>
        <div>
          <div>現在の値は{props.word}</div>
          <button onClick={props.change}>変更</button>
        </div>

        {/* <input></input>
        <button onClick={props.add}>追加</button>
        <ul>
          <li>{props.inputText.text}</li>
        </ul> */}

        <input></input>
        <button onClick={props.add}>タスクを追加</button>
        <ul>
            {props.todos.map((todo, index) => 
              <React.Fragment>
                {/* todo.isDoneがfalseならそのまま */}
                {!todo.isDone &&
                <li key={todo.id}>{todo.id}: {todo.title}
                  <button onClick= {() => {props.remove(index)}}>削除</button>
                  {/* <button onClick={() => {props.changeIsDone(todo)}}>{todo.isDone ? '完了':'進行中'}</button> */}
                  <button onClick={() => {props.changeIsDone(index)}}>{todo.isDone ? '完了':'進行中'}</button>
                </li>
                }

                {/* todo.isDoneがtrueならdelタグに */}
                {todo.isDone &&
                <li key={todo.id}>{todo.id}:
                  <del>{todo.title}</del>
                  <button onClick= {() => {props.remove(index)}}>削除</button>
                  {/* <button onClick={() => {props.changeIsDone(todo)}}>{todo.isDone ? '完了':'進行中'}</button></li> */}
                  <button onClick={() => {props.changeIsDone(index)}}>{todo.isDone ? '完了':'進行中'}</button>
                </li>
                }
              </React.Fragment>
            )}
        </ul>
        {/* <div>{props.id}</div> */}
      </React.Fragment>
    )
  }
}

// =======  Propsに渡す（を設定する）用の作業  ============
// =======  ここで定義したものがthis.propsに入る  ============

// mapStateToProps : storeのstateを定義して子に渡す
const mapStateToProps = state => ({
  val: state.counter.val,
  word: state.change.val, // changeで定義した初期値を設定
  // state.change.valの値をwordという名前でpropsに渡すという意味（これで子コンポーネント（APP）ではprops.wordで値が取得できる）
  // 今は<Provider></Provider>が親で<App></App>が子
  // inputText: state.add.text,
  // propsに {inputText: {type: 'add', text: '入力された文字'}のオブジェクトが加わる

  todos: state.add.todos,
  id: state.add.id,
  key: state.add.id,
  isDone: false,

})


// ==========  mapDispatchToPropsは関数係=========
// ==========  関数はmapDispatchToPropsに書いて渡す =========
const mapDispatchToProps = dispatch => ({

  // ここは結びつきとか関係ないっぽい（あるのは呼び出す方（上のApp class内））
  countPlus:()=>dispatch(countPlus()),
  countMinus:()=>dispatch(countMinus()),

  zero:()=>dispatch(zero()),

  change:()=>dispatch(change()), // これでchangeのpropsオブジェクトに入る

  // add: e =>dispatch(add(e)), // ここでイベントオブジェクト（引数）を渡す
  add: e =>dispatch(add(e)), // ここでイベントオブジェクト（引数）を渡す

  remove: index => dispatch(remove(index)),
  // changeIsDone: isDone => dispatch(changeIsDone(isDone)),
  changeIsDone: index => dispatch(changeIsDone(index)),

})


// stateとactionをAppに結びつける
export default connect(mapStateToProps, mapDispatchToProps)(App);


// -------------------元々---------------------------
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }