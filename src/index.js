import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/* replaced with function component as below 
class Square extends React.Component {
  render() {
    return (            
      <button 
        className="square" 
        onClick={() => this.props.onClick()}
      >
        {this.props.value} 
      </button>
    ) 
  }
}
*/

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}


class Board extends React.Component {
  constructor(props) {
  super(props)
  this.state = {
    squares: Array(9).fill(null),  /* set the initial state as null and be changed later when input is entered */
    xIsNext: true
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice() /* make a copy of the array to modify the data instead of modifying it directly to the original array */
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext /* tracking the changing state of xIsNext */
    })
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />) /* passing value and onClick props to Square component */
  }
  
  render() {
    const status = 'Next player: X'

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)