import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';


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
  
  return (
    <React.Fragment>
      <h1>こんにちは</h1>
      <h2>numbers：{numbers.join(',')}</h2>
      <h2>newNumbers：{newNumbers.join(',')}</h2>
      <h2>odds:{odds.join(',')}</h2>
      <h2>maps:{maps.join(',')}</h2>
    </React.Fragment>
  )
}

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
  <Text />,
  document.getElementById('root')
);

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
