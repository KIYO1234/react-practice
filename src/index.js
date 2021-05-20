// import React from 'react';
// ▲練習のため1行目を消去
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import PropTypes from 'prop-types'
import {useState} from 'react'
import {useEffect} from 'react'
import Change from './components/change'
// import axios from 'axios'

// Storeを作る作業
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// reducerのindex.jsで結合しているので一回でいい
import reducer from './reducers'

// import App from './components/App'
import {connect} from 'react-redux'
import {countPlus, countMinus} from './actions'

import Game from '../src/practice/tutorial'

class Welcome extends React.Component {
  render() {
    return (<h1>子コンポーネントを表示しています</h1>)
  }
}

// const Greeting = props => {
//   console.log(props)
//   // {name: 'kyosuke'}

//   return (<h2>Hello, {props.name}</h2>)
// }


// React.Fragment
const Greeting = props => {
  console.log(props)
  // {name: 'kyosuke'}

  return (<h2>Hello, {props.name}</h2>)
}




class Clock extends React.Component {
  // ②
  constructor(props) {
    // 親クラスのコンストラクタを呼び出す（絶対）
    super(props);
    this.state = {
      date: new Date(),
      comment: 'こんにちは'
    };
    // this.tick = this.tick.bind(this)
    this.start = this.start.bind(this)
    this.clear = this.clear.bind(this)

  }
  // ④ created的な（mountingした後にタイマーをセット）
  // componentDidMount() {
  //   this.timerID = setInterval( () => this.tick(), 1000)
  //   console.log('called')
  //   // setInterval(() => this.setState({date: new Date(), comment: 'Changed!'}), 3000)
  // }
  // unmountした後にタイマーをクリア
  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }
  start (){
    this.timerID = setInterval( () => this.tick(), 1000)
    console.log('called')
  }
  clear () {
    clearInterval(this.timerID)
    console.log('stopped')
  }
  // ⑤ stateを変更（this.setState()メソッド） → render()が再度呼び出される
  tick() {
    // setState でstate が更新されると、コンポーネントはそれに再レンダーで応じます。（※非同期）
    this.setState({
      date: new Date(),
      comment: '変更しました'
    })
  }
  // clearInterval() {
  //   this.clearInterval(this.timerID)
  // }
  // ③ここでReactが表示するべきものを知る => DOM を Clock のレンダー出力と一致するように更新
  render() {
    return (
      <div>
        <h1>----タイマー----</h1>
        <h1>Hello, world!</h1>
        <h1>Comment: {this.state.comment}</h1>
        <h2>It is { this.state.date.toLocaleTimeString() }</h2>
        {/* <button onClick={this.clear()}>ストップ</button> */}
        {/* <button onClick={clearInterval(this.timerID)}>ストップ</button> */}
        <button onClick={this.start}>スタート</button>
        <button onClick={this.clear}>ストップ</button>
        <Welcome />
        <Greeting name='kyosuke' />
        <Greeting name='saya' />
        <Greeting name='ken' />
        <Comment />
        {/* <CountUp /> */}
      </div>
    )
  }
}

// SNS
let Avatar =  props => {
  console.log(props)
  return (
    <div>
      <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
      />
    </div>
  )
}

let UserInfoName = props => {
  return(
    <h2>{props.user.name}</h2>
  )
}

// let UserInfo = props => {
let UserInfo = props => {
  return (
    <div className="UserInfo">
      <Avatar user={{avatarUrl: props.user.avatarUrl, name: props.user.name}}/>
      <UserInfoName user={{name: props.user.name}} />
    </div>
  )
}

let CommentText = props => {
  return (
    <p>{props.text}</p>
  )
}

let CommentDate = props => {
  return (
    <h3>{props.date}</h3>
  )
}

let Comment = () => {
  return (
    <div className="Comment">
      <h1>----SNSコメント----</h1>
      <UserInfo user={{name: 'KYOSUKE', avatarUrl: 'logo192.png'}}/>
      <CommentText text="テキストです。" />
      <CommentDate date= {new Date().toLocaleDateString()} />
    </div>
  );
}

// // CountUp
// class CountUp extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {number: 0}
//     this.up = this.up.bind(this)
//   }
//   render() {
//     return (
//       <div>
//         <h1>カウントアップ</h1>
//         <button onClick={this.up}>CountUp!</button>
//         <p>結果：{this.state.number}</p>
//       </div>
//     )
//   }
//   up() {
//     console.log(this.state.number)
//     this.setState({
//       number: this.state.number += 1
//     })
//   }
// }



// // リンク
// let ActionLink = () => {
//   let handleClick = e => {
//     e.preventDefault();
//     console.log('The link was clicked');
//     console.log(e.target.innerText)
//   }
//   return (
//     <a href="#" onClick={handleClick}>Click me!</a>
//   )
// }

// ON / OFF ボタン
class Toggle extends React.Component {
  constructor(props){
    super(props)
    this.state =  {isToggleOn: true}
    // このインスタンスのhandleClickにhandleClick()メソッドをバインドしたものを代入？
    this.handleClick = this.handleClick.bind(this);
    // this.handleClick = this.handleClick;
  }

  handleClick() {
    this.setState(state => (
      console.log(state),
      {isToggleOn: !state.isToggleOn}
    ))
  }
  render() {
    return (
      <div>
        <Clock />
        <h1>------ON/OFFボタン ------</h1>
        {/*  this.handleClick() にするとレンダリングされた瞬間に関数が実行される：()をつけないで参照する場合はバインディングが必要*/}
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>

      </div>
    )
  }
}

const UserGreeting = props => {
  // console.log(props)
  const isLoggedIn = props.isLoggedIn
  if(isLoggedIn){
    return (<p>AIKOさんはログインしています！</p>)
  } else {
    return (
      <div>
        <p>ログインしてください</p>
      </div>
    )
  }
}

// class UserGreeting extends React.Component {
//   constructor(props) {
//     super(props)
//     this.name = 'Aiko'
//     this.isLoggedIn = true
//   }
//   render(){
//       if(props.isLoggedIn){
//         return (<p>{this.name}さんはログインしています！</p>)
//       } else {
//         return (
//           <div>
//             <p>ログインしてください</p>
//           </div>
//         )
//       }
//   }
// }

let LoginButton = props => {
  return (
    <button onClick={props.onClick}>Login</button>
  )
}
let LogoutButton = props => {
  return (
    <button onClick={props.onClick}>Logout</button>
  )
}

class LoginControl extends React.Component {
  constructor(props){
    super(props)
    this.login = this.login.bind(this)
    // login()の引数にthisを与えた新しい関数を作成
    // thisにはLoginControlオブジェクトが入る
    // this.newlogin = this.login.bind(this)
    // this.login = this.login.bind('ABCD')

    this.logout = this.logout.bind(this)
    this.state = {isLoggedIn: true}
    // console.log(this) // LoginControl オブジェクト
  }
  // login(){
  //   this.setState({isLoggedIn: true})
  //   // bindしてるのでthisにはLoginControlオブジェクトが入る
  //   console.log(this) // LoginControl オブジェクト
  // }
  login(){
    this.setState({isLoggedIn: true})
    // bindしてるのでthisにはLoginControlオブジェクトが入る
    console.log(this) // LoginControl オブジェクト
    // クラス内メソッドでbindしていない場合、thisはundefinedになる
    // コンストラクタ側で(this)をバインドすることで、login()の引数にthis(今回はLoginControlオブジェクト)を渡すことができる
  }
  logout(){
    this.setState({isLoggedIn: false})
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn
    let button
    if(isLoggedIn){
      button = <LogoutButton onClick={this.logout}/>
    } else {
      button = <LoginButton onClick={this.login}/>
      // button = <LoginButton onClick={this.newlogin}/>
    }
    return (
      <div>
        <UserGreeting isLoggedIn={isLoggedIn}/>
        {button}
      </div>
    )
  }
}

// インラインif
const Mailbox = props => {
  const unread = props.unread
  return(
    <div>
      <h1>Hello</h1>
      {unread.length > 0 ?
        <h2>
          You have {unread.length} unread messages
        </h2>
      :
        <h2>all read</h2>}
    </div>
  )
}
const messages = ['React', 'Re: React', 'Re:Re:React', 'Vue']
// const messages = []

// // 複数のコンポーネントをレンダーする
// const numbers = [1,2,3,4,5]
// const listItems = numbers.map(number =>
//   <li>{number}</li>
// )

// const  ListItem = props => {
//   return (
//     <li>{props.value}</li>
//   )
// }


// const NumberList = props => {
//   const numbers = props.numbers
//   const listItems = numbers.map(number =>
//     <li key={number.toString()}>{number}</li>
//     // <ListItem key={number.toString()} value={number}/>
//   )
//   return (
//     <ul>{listItems}</ul>
//   )
// }
// const numbers  =[1,2,3,4,5,6]


// const Blog = props => {
//   const sidebar = (
//     <ul>
//       {props.posts.map(post =>
//         <li key={post.id}>{post.title}</li>
//       )}
//     </ul>
//   )
//   const content = props.posts.map(post =>
//     <div key={post.id}>
//       <h3>{post.title}</h3>
//       <p>{post.content}</p>
//     </div>
//   )
//   return (
//     <div>
//       {sidebar}
//       <hr />
//       {content}
//     </div>
//   )
// }
// const posts = [
//   {id: 1, title: 'Hello World', content: 'Welcome!'},
//   {id: 2, title: 'Hello こんにちは', content: 'おはよう!'},
//   {id: 3, title: 'Hello konnbannha', content: 'こんばんは!'},
// ]


// // controlled コンポーネント
// class NameForm extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {value: ''}
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }
//   handleChange(event) {
//     // console.log(event)
//     this.setState({value: event.target.value})
//   }
//   handleSubmit(event){
//     alert('A name was submitted: ' + this.state.value)
//     event.preventDefault()
//   }
//   render(){
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input type="text" value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     )
//   }
// }

// class FlavorForm extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {value: 'coconut'}
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('Your favorite flavor is: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Pick your favorite flavor:
//           <select value={this.state.value} onChange={this.handleChange}>
//             <option value="grapefruit">Grapefruit</option>
//             <option value="lime">Lime</option>
//             <option value="coconut">Coconut</option>
//             <option value="mango">Mango</option>
//           </select>
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }


// class Reservation extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       isGoing: true,
//       numberOfGuests: 2
//     }
//     this.handleInputChange = this.handleInputChange.bind(this)
//   }
//   handleInputChange(e) {
//     const target = e.target
//     const value = target.type === 'checkbox' ? target.checked : target.value
//     const name = target.name

//     this.setState({
//       [name]: value
//       // {e.target.name: target.type}
//       // e.target.nameがkey, value がvalueのオブジェクトができる
//     })
//   }
//   render(){
//     return (
//       <form>
//         <label>
//           Is going:
//           <input
//             name="isGoing"
//             type="checkbox"
//             checked={this.state.isGoing}
//             onChange={this.handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Number of guests:
//           <input
//             name="numberOfGuests"
//             type="number"
//             value={this.state.numberOfGuests}
//             onChange={this.handleInputChange} />
//         </label>
//       </form>
//     )
//   }
// }

// // 自作カウントアップ
// class CountUp extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {number: 0}
//     this.up = this.up.bind(this)
//   }
//   up(){
//     // 直接this.state.numberを変えるのはNG=>this.setState()を使う
//     this.setState({
//       // setStateはオブジェクトごと書き換える
//       number: this.state.number += 10
//     })
//   }
//   render(){
//     return (
//       <div>
//         <h1>カウントアップだぜ</h1>
//         <button onClick={this.up}>ここを押してね</button>
//         <h2>結果：{this.state.number}</h2>
//       </div>
//     )
//   }
// }


// // 温度計算
// const BoilingVerdict = props => {
//   if (props.celsius >= 100) {
//     return <p>The water would boil.</p>
//   }
//   return <p>The water would not boil.</p>
// }
// class Calculator extends React.Component{
//   constructor(props){
//     super(props)
//     this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
//     this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
//     this.state = {temperature: '', scale: 'c'}
//   }
//   handleCelsiusChange(temperature){
//     this.setState({scale: 'c', temperature})
//   }
//   handleFahrenheitChange(temperature){
//     this.setState({scale: 'f', temperature})
//   }
//   render(){
//     const scale = this.state.scale
//     const temperature = this.state.temperature
//     const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
//     const fahrenheit = scale === 'f' ? tryConvert(temperature, toFahrenheit) : temperature
//     return (
//       <div>
//         <TemperatureInput scale='c' temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
//         <TemperatureInput scale='f' temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
//         <BoilingVerdict celsius={parseFloat(celsius)} />
//       </div>
//     )
//   }
// }

// const scaleNames = {
//   c: 'Celsius',
//   f: 'Fahrenheit'
// }

// class TemperatureInput extends React.Component {
//   constructor(props){
//     super(props)
//     this.handleChange = this.handleChange.bind(this)
//     this.state = {temperature: ''}
//   }
//   handleChange(e){
//     // this.setState({
//     //   temperature: e.target.value
//     // })

//     this.props.onTemperatureChange(e.target.value)
//     // onTemperatureChangeには親のCalculatorから渡されているメソッド(this.handleCelsiusChange)が渡されている
//     // 親のhandleCelsiusChange(temperature)のtemperatureにe.target.valueが渡される
//   }
//   render(){
//     const temperature = this.props.temperature
//     const scale = this.props.scale
//     return (
//       <fieldset>
//         <legend>Enter temperature in Celsius:</legend>
//         <input
//           value={temperature}
//           onChange={this.handleChange} />
//       </fieldset>
//     )
//   }
// }

// function toCelsius(fahrenheit) {
//   return (fahrenheit - 32) * 5 / 9;
// }

// function toFahrenheit(celsius) {
//   return (celsius * 9 / 5) + 32;
// }
// function tryConvert(temperature, convert) {
//   const input = parseFloat(temperature);
//   if (Number.isNaN(input)) {
//     return '';
//   }
//   const output = convert(input);
//   const rounded = Math.round(output * 1000) / 1000;
//   return rounded.toString();
// }

const FancyBorder = props => {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  )
}
const Dialog = props => {
  return (
    <FancyBorder color='blue'>
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  )
}

class SingUpDialog extends React.Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.state = {login: ''}
  }
  render(){
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} 
               placeholder="input"
               />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    )
  }
  handleChange(e){
    this.setState({login: e.target.value})
  }
  handleSignUp(){
    alert(`Welcome aboard, ${this.state.login}!`)
  }
}

const WelcomeDialog = () => {
  return (
    <Dialog title='Welcome' message='Thank you for visiting our spacecraft!' />
  )
}

// function SplitPane(props) {
//   return (
//     <div className="SplitPane">
//       <div className="SplitPane-left">
//         {props.left}
//       </div>
//       <div className="SplitPane-right">
//         {props.right}
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <SplitPane
//       left={
//         <Contacts />
//       }
//       right={
//         <Chat />
//       } />
//   );
// }



// テキスト用
const Text = () => {
  const numbers = [1,2,3,4,5]
  const newNumbers = numbers.map(newNumber => newNumber * 2)
  // mapだと空でも新しい配列に追加してしまう
  const maps = numbers.map(newNumber => {
    if(newNumber !== 3) {
      return newNumber
    }
  }
 )
  const odds = numbers.filter(odd => odd % 2 !== 0)
  const tasks = [
    {id: 1, title: '会議'},
    {id: 2, title: '朝礼'},
    {id: 3, title: '昼食'},
    {id: 4, title: '部長と面談'},
  ]
  const newTask = tasks.map((task, index) => 
    <div>IDは{task.id}、{index}番目のタスク内容は{task.title}です</div> 
  )

  // idが奇数番目のタスクのみ表示（filterとmapはつないで書くことができる）
  const oddTasks = tasks.filter(oddTask => oddTask.id % 2 !==0).map((task, index) => 
    <div>IDは{task.id}、{index}番目のタスク内容は{task.title}です</div> 
  )

  // 重複要素を取り除く
  const array10 = [1,1,2,3,3,4,5,5,6,6,5,54,3,]
  // filterは第3引数に元の配列をとる
  const result10 = array10.filter((num, index, self) => {
    // indexOf()は引数に入っている値が何番目に入っているか返す
    return self.indexOf(num) === index
  })
  console.log(result10)

  // const Odds = oddTasks.map((task, index) =>
  //   <div>IDは{task.id}、{index}番目のタスク内容は{task.title}です</div>
  // )
  // console.log(Odds)

  return (
    <React.Fragment>
      <h1>こんにちは</h1>
      <h2>numbers：{numbers.join(',')}</h2>
      <h2>newNumbers：{newNumbers.join(',')}</h2>
      <h2>odds:{odds.join(',')}</h2>
      <h2>maps:{maps.join(',')}</h2>
      <h2>{newTask}</h2>
      {/* <h2>{Odds}</h2> */}
      <h2>{oddTasks}</h2>
      {/* <Aisatsu /> */}
    </React.Fragment>
  )
}

// 条件分岐
class If extends React.Component {
  renderWithCondition(isMorning){
    if(isMorning){
      return <span>あああ</span>
    } else {
      return <span>いいい</span>
    }
  }
  sum(a, b){
    console.log(a + b)
  }
  say(){
    console.log('you')
  }
  render(){
    let isMorning = true
  //   return (
  //     // // 即時関数
  //     // <div>
  //     //   {(() => {
  //     //     if(isMorning) {
  //     //       return <span>Good morning</span>
  //     //     } else {
  //     //       return <span>Hello</span>
  //     //     }
  //     //   })()}
  //     // </div>

  //     // // &&
  //     // <div>
  //     //   {isMorning && <h2>おはよう</h2>}
  //     // </div>

  //     // 三項演算子
  //     isMorning ? <span>さあ</span> : <span>Hello</span>
  //   )
  // }

    return (
      <div>
        <h2>{this.renderWithCondition(isMorning)}</h2>

        {/* onClick={}のなかは() => {}の形にしないとダメ */}
        <button onClick={() => {console.log('hoi')}}>クリック</button>
        {/* <button onClick={console.log('hoi')}>クリック</button> */}
        <button onClick={() => this.sum(10, 20)}>sum</button>
        {/* <button onClick={this.sum(10, 20)}>sum</button> */}
        {/* <button onClick={this.say}>say</button> */}
        {/* <button onClick={this.say()}>say</button> */}
      </div>
    )
  }
}

const Practice1 = () => {
  const tasks = [
    {id: 1, title: '会議'},
    {id: 2, title: '朝礼'},
    {id: 3, title: '営業'},
    {id: 4, title: '部長と面談'},
    {id: 5, title: '開発'},
  ]

  const show = task => {
    console.log(task.id)
  }

  const oddTasks = tasks.filter(oddTask => oddTask.id % 2 !==0).map((task, index) =>
  <div>
    <span>ID:{task.id}, TITLE:{task.title}, INDEX: {index}</span>
    <button onClick={() => show(task)}>button</button>
  </div>
  )
  return (
    <div>{oddTasks}</div>
  )
}

// class Textarea extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {text: ''}
//     this.handleChange = this.handleChange.bind(this)
//     this.show = this.show.bind(this)
//   }
//   handleChange(e){
//     this.setState({
//       text: e.target.value
//     })
//   }
//   show(){
//     console.log(this.state.text)
//   }
//   render(){
//     return(
//       <div>
//         <input type="text" onChange={this.handleChange}></input>
//         <button onClick={this.show}>button</button>
//       </div>
//     )
//   }
// }


// const NewTextarea = () => {
//   let text = ''
//   const textInput = e =>{
//     text = e.target.value
//     // console.log(text)
//   }
//   const show = () => {
//     console.log(text)
//   }
//   return (
//     <div>
//       <input onChange={textInput}></input>
//       <button onClick={show}>button</button>
//     </div>
//   )
// }


// const ClickOnly = e => {
//   const show = e => {
//     console.log(e.target.previousElementSibling.value)
//   }
//   return (
//     <div>
//       <input></input>
//       <button onClick={show}>button</button>
//     </div>
//   )
// }

// const Members = [
//   {name: 'Taro', age: 12},
//   {name: 'Jiro'},
//   {name: 'Saburo', age: 8},
// ]

// const App = () => {
//   return (
//     <div>
//       {
//         Members.map(men => {
//           return <Member name={men.name} />
//         })
//       }
//     </div>
//   )
// }
// const Member = props => {
//   return <div>name: {props.name}, age: {props.age}</div>
// }
// Member.defaultProps = {age: 100}
// Member.PropTypes = {
//   name: PropTypes.string,
//   age: PropTypes.number.isRequired
// }


// // Hook
// const UseState = () => {
//   // count はstate変数
//   const [count, setCount] = useState(0)
//   // console.log(count) // 0
//   // console.log(setCount) // 関数
//   // console.log(useState) // 関数
//   // console.log(document.title) // React App
//   // useState = this.state
//   // useStateの唯一の引数はstateの初期値（オブジェクトじゃなくていい）
//   // count: 現在のstateの値, setCount: それを更新する関数

//   // 副作用関数（レンダーされるたびに実行）
//   useEffect(() => {
//     // 関数内のstate参照は直接countでOK
//     document.title = `You clicked ${count} times`
//     // ブラウザに出てくるタイトルを変更
//   })

//   const rakuten = () => {
//     axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?', {
//       params: {
//         applicationId: '1002332757402892625',
//         keyword: 'プログラミング'
//       }
//     }).then(res => {
//       console.log(res)
//     })
//   }

//   return (
//     <div>
//       <p>現在の数字は{count}です</p>
//       <button onClick={() => setCount(count + 1)}> Click me </button>
//       <button onClick={rakuten}>楽天検索</button>
//     </div>
//   )
// }

// // 複数のstate変数を使う
// function ExpampleWithManyStates() {
//   const [age, setAge] = useState(42);
//   const [fruit, setFruit] = useState('banana');
//   const [todos, setTodos] = useState([{text: 'Learn Hooks'}]);
// }

// function handleOrangeClick(){
//   setFruit('orange')
// }



// function FriendStatus(props) {
//   const [isOnline, setIsOnline] = useState(null)

//   function handleStatusChange(status){
//     setIsOnline(status.isOnline)
//   }

//   useEffect(() => {
//     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//     };
//   });

//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }


// const Todos = () => {
//   const tasks = [
//     // {id: 1, title: '会議'},
//     // {id: 2, title: '面接'},
//     // {id: 3, title: '外回り'},
//     // {id: 4, title: '開発'},
//     // 'チーム開発', '会議', '営業', '懇親会'
//   ]
//   // const newNums = nums.map(newNum => newNum *2)

//   let submit = e => {
//     // tasks.push(e.target.previousElementSibling.value)
//     console.log(tasks)
//     // e.target.previousElementSibling.value = ''
//     // console.log(e.target.previousElementSibling.value)
//   }
//   return (
//     <div>
//       <input></input>
//       <button onClick={submit}>追加</button>
//       <ul>
//         {tasks.map(task => <li>{task}</li>)}
//       </ul>
//     </div>
//   )
// }


const GrandChild = props => {
  return (
    <React.Fragment>
      <h2>孫コンポーネント</h2>
      <h3>propsは{props.name}です</h3>
    </React.Fragment>
  )
}

const PracticeTitle = () => {
  return (
    <React.Fragment>
      <h1>練習用タイトル</h1>
      <GrandChild name="KYOSUKE"/>
    </React.Fragment>
  )
}
class Todos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
      // '会議', '営業', '新入社員面接'
        // {id: '', title: ''}
      ]
    }
    this.add = this.add.bind(this)
  }
  add = e => {
    // console.log(this.state.todos)
    // const array = [4,5,6]
    // const array2 = [7,8,9]
    // const array3 = array.concat(array2)
    // console.log(array3)
    // console.log(this.state.todos)
    // console.log(e)
    // console.log(e.target.previousElementSibling.value)
    // this.state.todos.push(e.target.previousElementSibling.value)

    // stateを破壊しないよう新配列を作成
    const newTask = e.target.previousElementSibling.value

    // stateを破壊せずに新たな配列を結合
    const newArray = this.state.todos.concat(newTask)
    this.setState({
      todos: newArray
    })
    e.target.previousElementSibling.value = ''
    // console.log(this.state.todos)
    console.log(newArray)
  }
  delete = (index) => {
    // console.log(this.state.todos)
    console.log(index)
    // console.log(e)

    // spliceは消した要素自体を返す
    // 消したもの以外の配列は元の配列に入ってる
    // const deletedElement = this.state.todos.splice(index, 1)
    // console.log(deletedElement) // 消した要素そのもの
    this.state.todos.splice(index, 1)

    this.setState({
      todos: this.state.todos
    })
  }
  render(){
    return(
      <div>
      <PracticeTitle />
      <input></input>
      <button onClick={this.add}>Add</button>
        <ul>
          {this.state.todos.map((todo, index) =>

          <React.Fragment>
            <li key={todo}>{todo} <button onClick={() => this.delete(index)}>削除</button></li>
          </React.Fragment>
          )}
        </ul>
        {/* <ul>
          {this.state.todos}
        </ul> */}
      </div>
    )
  }
}

// IDをつける
class TodolistWithClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        // {id: 1, title: '会議'},
        // {id: 2, title: '外回り'},
        // {id: 3, title: '開発'},
      ],
      id: 1
    }
    this.add = this.add.bind(this)
    this.delete = this.delete.bind(this)
  }

  add = e => {
    if(e.target.previousElementSibling.value){
      const newTask = {
        id: this.state.id,
        title: e.target.previousElementSibling.value
      }
      const newArray = this.state.todos.concat(newTask)
      this.setState({
        todos: newArray,
        id: this.state.id += 1
      })
      e.target.previousElementSibling.value = ''
      console.log(newArray)
      document.title = `You added ${this.state.id - 1} times`
    }
  }

  delete = (index) => {
    console.log(index)
    this.state.todos.splice(index, 1)
    this.setState({
      todos: this.state.todos
    })
  }

  // // 関数の紐づき問題
  // kansu = () => {
  //   this.delete(index)
  // }

  render(){
    return(
      <React.Fragment>
        <h2>Todoリスト（クラス）</h2>
        <input></input>
        <button onClick={this.add}>Add</button>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>TITLE</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo, index) =>
              <tr>
                  <React.Fragment>
                    <td>{todo.id}</td>
                    <td>{todo.title}</td>
                    <td>
                      <button onClick={() => this.delete(index)}>削除</button>
                      {/* 関数の紐付き問題 */}
                      {/* <button onClick={kansu}>削除</button> */}
                    </td>
                  </React.Fragment>
              </tr>
            )}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

// Memberはひとりひとりの情報
const Member = props => {
  return (
    <div>name: {props.name}, age: {props.age}</div>
    )
  }
// defaultProps
Member.defaultProps = {age: 100}
// PropTypes
// propTypes の最初のpが大文字だとエラーが出た
// propTypesの名前は固定でimport先の'prop-types'をJS用のキャメルケースで書いている
Member.propTypes = {
  name:PropTypes.string, //ここで型チェックライブラリを使用
  age:PropTypes.number.isRequired //ここで型チェックライブラリを使用
  // PropTypesは'prop-types'をインポートするときにつけた名前（自由）
}
// console.log(Member)

const Members = [
  {id: 1, name: 'Taro', age: 14},
  {id: 2, name: 'Jiro'},
  {id: 3, name: 'Saburo', age: 8},
  {id: 4, name: 'Shiro'},
]

const A = () => {
  return (
    Members.map(member =>
      <Member name={member.name} age={member.age} key={member.id}/>
    )
  )
}

// // children
// childrenはslotみたいなもの
// const Child = props => {
//   return <h1>{props.children}</h1>
// }

// const Parent = () => {
//   return <Child>ここの内容が表示される</Child>
// }
// // ①<Child></Child>内の内容がprops.childernに渡される
// // ②Childは<span></span>内に渡されたものを展開して呼び出し元に返す


class CountUp extends React.Component {
  constructor(props){
    super(props)
    this.state = {count: 0}
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
    this.zero = this.zero.bind(this)
  }
  // ライフサイクルフック=======================
  componentDidMount(){
    console.log('didMount')
  }
  componentDidUpdate(){
    console.log('didUpdate')
  }
  // ========================================

  increment(){
    this.setState({
      count: this.state.count += 1
    })
  }
  decrement(){
    this.setState({
      count: this.state.count -= 1
    })
  }
  zero(){
    this.setState({
      count: 0
    })
  }
  render(){
    return(
      <div>
        <h2>Number : {this.state.count}
          <button onClick={this.increment}>+1</button>
          <button onClick={this.decrement}>-1</button>
          <button onClick={this.zero}>0</button>
        </h2>
      </div>
    )
  }
}

// ==============================================================
// Todoリスト
const TodoListTitle = () => {
  return (<h1>Todoリスト</h1>)
}

const TodolistWithFunction = () => {
  const [todos, setTodos] = useState([])
  const [id, setId] = useState(1)
  const [notyets, setNotyets] = useState([])
  const [dones, setDones] = useState([])
  const [isOngoing, setIsOngoing] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [isAll, setIsAll] = useState(true)

  // useEffect
  // 書き方によって挙動が変わる（JSXを読み込む前に実行）
  // 第一引数には関数
  // useEffect(() => {
  //   console.log('changed')
  // })
  // 初回のみ(マウント後のみ): 第二引数に空配列をとる
  // useEffect(() => {
  //   console.log('mounted')
  // }, [])
  // 任意の変数が変化した時のみ：第二引数に変化を検知したい変数（todosの場合は配列の形で入れる）を取る
  useEffect(() => {
    console.log('todosが変化しました')
  }, [todos])

  const add = e => {
    if(e.target.previousElementSibling.value){
      setId(prev => prev + 1)
      // setTodosより下に書くとtitleがうまく反映されない
      setNotyets([...notyets, {id: id, title: e.target.previousElementSibling.value, isDone: false}])
      console.log(notyets)

      setDones([...dones, {id: id, title: e.target.previousElementSibling.value, isDone: false}])
      console.log(dones)

      setTodos([...todos, {id: id, title: e.target.previousElementSibling.value, isDone: false}])
      console.log(todos)
      e.target.previousElementSibling.value = ''
      // console.log(todos) // 1回遅れで出てくる
    }
  }
  const remove = index => {
    todos.splice(index, 1)
    setTodos([...todos])
    notyets.splice(index, 1)
    setTodos([...notyets])
    dones.splice(index, 1)
    setTodos([...dones])
  }
  const stateChange = (todo) => {
    todo.isDone = !todo.isDone
    setTodos([...todos])
    setNotyets([...todos])
    setDones([...todos])
  } 
  

  const Ongoings = () => {
    return(
      <tbody>
        {notyets.filter(filteredNotyet => filteredNotyet.isDone === false).map(notyet =>
          <tr key={notyet.id}>
              <td>{notyet.id}</td>
              <td>{notyet.title}</td>
              <td>
              </td>
              <td>
                <button onClick={() => stateChange(notyet)}>
                  {notyet.isDone ? '完了' : '進行中'}
                </button>
              </td>
          </tr>
        )}
      </tbody>
    )
  }

  const Dones = () => {
    return (
      <tbody>
        {dones.filter(filteredDone => filteredDone.isDone === true).map(done =>
          <tr key={done.id}>
                <td>{done.id}</td>
                <td>{done.title}</td>
                <td>
                </td>
                <td>
                  <button onClick={() => stateChange(done)}>
                    {done.isDone ? '完了' : '進行中'}
                  </button>
                </td>
          </tr>
        )}
      </tbody>
    )
  }

  const showOngoings = () => {
    if(isOngoing === false) {
      setIsOngoing(!isOngoing) // true
      setIsAll(false) //false
      setIsDone(false)
    }
  }

  const showDones = () => {
    if(isDone === false){
      setIsDone(!isDone) //true
      setIsAll(false)
      setIsOngoing(false)
    }
  }

  const showAll = () => {
    if(isAll === false){
      setIsAll(!isAll)
      setIsOngoing(false)
      setIsDone(false)
    }
  }

  return (
    <React.Fragment>
      <TodoListTitle />
      <table>
        <thead>
          <tr>
            {/* コンポーネントごとの真偽値を変える */}
            <th><button onClick={() => showAll()}>全て</button></th>
            <th><button onClick={() => showOngoings()}>進行中</button></th>
            <th><button onClick={() => showDones()}>完了</button></th>
          </tr>
        </thead>
      </table>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>タスク</th>
            <th>削除</th>
            <th>状態</th>
          </tr>
        </thead>

        {/* isAllがtrueだったら表示 */}
        {isAll &&
          <tbody>
            {todos.map((todo, index) =>
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td><button onClick={() => remove(index)}>削除</button></td>
                <td><button onClick={() => stateChange(todo)}>
                  {todo.isDone ? '完了' : '進行中'}
                </button></td>
              </tr>
            )}
          </tbody>}

        {/* {isOngoing ? <Ongoings /> : ''}にするとtableの子要素に:とかの文字は使えませんというエラーが出る */}
        {/* whitespace text node = 空白のみのテキストノード（要素） */}

        {isOngoing && <Ongoings />}
        {isDone && <Dones />}
      </table>

      <div>
        <input id="inputText" placeholder="タスクを入力"></input>
        <button onClick={add}>追加</button>
      </div>

    </React.Fragment>
  )
}
// ここまで=========================================================


// const CountUpWithFunction = () => {
//   // setCountはcountを変更する専用の関数なのでプロパティの指定は不要
//   // クラスではthis.state.numberのように指定が必要だった
//   let [count, setCount] = useState(0)
//   const [fruit, setFruit] = useState('banana')
//   return (
//     <h3>
//       <div>
//         <span>Number: {count}</span>
//         <button onClick={() => setCount(prevState => prevState + 1)}>+1</button>
//         <button onClick={() => setCount(prevState => prevState - 1)}>-1</button>
//         <button onClick={() => setCount(0)}>0</button>
//       </div>

//       <div>
//         <span>Fruit: {fruit}</span>
//         <button onClick={() => setFruit('Strawberry')}>fruit</button>
//       </div>
//     </h3>
//   )
// }

// ボタンに応じたコンポーネント表示の切り替え
// 表示を切り替えるコンポーネント 
const NotYet = () => {
  return(
    <ul>
      <li>進行中</li>
      <li>会議</li>
      <li>開発</li>
    </ul>
  )
}
const Already = () => {
  return (
    <ul>
      <li>完了</li>
      <li>完了しました</li>
      <li>Done</li>
    </ul>
  )
}
const ToggleFunction = () => {
  const [showFlag, setShowFlag] = useState(true)
  const [isAlready, setIsAlready] = useState(false)
  let toggle = showFlag ? <NotYet /> : ''
  let already = isAlready ? <Already/> : ''
  return(
    <React.Fragment>
      <button onClick={() => setShowFlag(!showFlag)}>進行中？</button>
      {toggle}
      <button onClick={() => setIsAlready(!isAlready)}>完了？</button>
      {already}
    </React.Fragment>
  )
}

// 表示を切り替えるコンポーネント （子）
const Hello = () => {
  return <p>こんにちは</p>
}
// 常時表示するコンポーネント （親）
class Stable extends React.Component {
  constructor(props){
    super(props)
    this.state = {showFlag: true}
  }
  render(){
    const showFlag = this.state.showFlag
    // 表示フラグがtrueならHelloコンポーネントを表示
    let hello = showFlag ? <Hello /> : ''
    return (
      <React.Fragment>
        {hello}
        <button onClick={() => {this.setState({showFlag: !this.state.showFlag})}}>ボタン</button>
      </React.Fragment>
    )
  }
}

// const Increment = () => {
//   const [count, increment] = useState(0)
//   const [isShow, setIsShow] = useState(false)
//   const Sample = () => {
//     return (<h3>ヤッホー！</h3>)
//   }
 
//   const calc = e => {
//     increment(count + Number(e.target.previousElementSibling.value))
//     console.log(count)
//     e.target.previousElementSibling.value = ''
//   }
//   return (
//     <React.Fragment>
//       <div>現在の数字：{count}</div>
//       <input type="number"></input>
//       <button onClick={calc}>計算</button>
//       <div>
//         <button onClick={() => setIsShow(!isShow)}>{isShow ? '非表示' : '表示'}</button>
//         {isShow && <Sample/>}
//       </div>
//     </React.Fragment>
//   )
// }


class ThisProps extends React.Component {
    render(){
        return(
            <div>Hello, {this.props.name}</div>
        )
    }
}


// -------------------------------------------
// storeを作る（引数にreducerを設定）
// createStore()で作れる
// 先ほど作ったreducerを内包したstoreができる
const store = createStore(reducer)
// console.log(reducer) //
// console.log(store)
// reducerには結合されたreducersが全部入っている
// -------------------------------------------

ReactDOM.render(
  // ① => ⑥差分を表示
  // <Clock />,
  // <ActionLink />,
  // <Toggle />,
  // <CountUp />,
  // <Comment />,
  // <UserGreeting obj = {{name: 'KYO', isLoggedIn: true }}/>,
  // <UserGreeting />,
  // <LoginControl />,
  // <Mailbox unread={messages} />,
  // <ul>{listItems}</ul>,
  // <NumberList numbers={numbers}/>,
  // <NameForm/>,
  // <FlavorForm/>,
  // <Blog posts={posts}/>,
  // <Reservation />,
  // <Calculator />,
  // <SingUpDialog />,
  // <Text />,
  // <If />,
  // <Practice1 />,
  // <Hi />,
  // <Textarea/>,
  // <NewTextarea />,
  // <ClickOnly />,
  // <notyets />,
  // <TodolistWithClass />,
  // <TodolistWithFunction />,
  // <CountUpWithFunction/>,
  // <A />,
  // <Parent />,
  // <App />,
  // <UseState />,

  // -------------------store--------------------
  // Providerタグを親に設定してAppコンポーネントにpropsを渡している（子供はAppコンポーネント：子にstoreを渡している）
  // App以下ではstoreを利用できる
  // しかし、これだけだとstoreの操作はできない：connectが必要

  <Provider store = {store}>
    <App />
  </Provider>,

  // -------------------ここまで--------------------



  // <Stable/>,
  // <ToggleFunction />,
  // <Increment />,
  // <Game />,
  // <ThisProps name='Taro'/>,

  // <Provider store = {store}>
  //   <TodoListWithClass />
  // </Provider>,

  // <Provider store = {store}>
  //   <Change />
  // </Provider>,

  document.getElementById('root')
);


// reportWebVitals()

// -----------------------------------

// let App = () => {
//   return (
//     <div>
//       <Clock />
//       <Clock />
//       <Clock />
//     </div>
//   )
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
