import { findAllByAltText, render } from '@testing-library/react'
import React from 'react'

class Square extends React.Component {
    render(){
        return (
            <button className="square">
                {this.props.value}
            </button>
        )
    }
}

class Board extends React.Component {
    renderSquare(i){
        return <Square value={i} />
    }
    render() {
        const status = 'Next player : X'
        return(
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                </div>
            </div>
        )
    }
}
class Game extends React.Component {
    render(){
        return (
            <h1>こんばんは</h1>
        )
    }
}

export default Game

