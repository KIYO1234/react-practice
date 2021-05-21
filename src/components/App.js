import React from 'react';
import {connect} from 'react-redux'
import {add} from '../actions'
import {remove} from '../actions'
import {changeIsDone} from '../actions'

class App extends React.Component {
  render(){
    const props = this.props 
    return (
      <React.Fragment>
        <input></input>
        <button onClick={props.add}>タスクを追加</button>
        <ul>
            {props.todos.map((todo, index) => 
              <React.Fragment>
                {!todo.isDone &&
                <li key={todo.id}>{todo.id}: {todo.title}
                  <button onClick= {() => {props.remove(index)}}>削除</button>
                  <button onClick={() => {props.changeIsDone(index)}}>{todo.isDone ? '完了':'進行中'}</button>
                </li>
                }

                {todo.isDone &&
                <li key={todo.id}>{todo.id}:
                  <del>{todo.title}</del>
                  <button onClick= {() => {props.remove(index)}}>削除</button>
                  <button onClick={() => {props.changeIsDone(index)}}>{todo.isDone ? '完了':'進行中'}</button>
                </li>
                }
              </React.Fragment>
            )}
        </ul>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => ({
  todos: state.add.todos,
  id: state.add.id,
  key: state.add.id,
})

const mapDispatchToProps = dispatch => ({
  add: e =>dispatch(add(e)),
  remove: index => dispatch(remove(index)),
  changeIsDone: index => dispatch(changeIsDone(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);